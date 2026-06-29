const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { query } = require('../config/db');
const { getJwtSecret } = require('../config/env');
const { asyncHandler } = require('../middleware/errorMiddleware');
const { assertRequired, assertEmail, assertPhone, assertIn, ROLES, createHttpError } = require('../utils/validators');
const { normalizeRole, normalizeUserRole } = require('../utils/roles');

const RESET_TOKEN_TTL_MINUTES = 30;

function signToken(user) {
  const normalizedUser = normalizeUserRole(user);
  return jwt.sign(
    {
      id: normalizedUser.id,
      role: normalizedUser.role
    },
    getJwtSecret(),
    { expiresIn: '8h' }
  );
}

function safeUser(user) {
  const normalizedUser = normalizeUserRole(user);
  return {
    id: normalizedUser.id,
    name: normalizedUser.name,
    email: normalizedUser.email,
    role: normalizedUser.role,
    phone: normalizedUser.phone,
    status_message: normalizedUser.status_message || '',
    created_at: normalizedUser.created_at || null,
    last_login_at: normalizedUser.last_login_at || null,
    password_updated_at: normalizedUser.password_updated_at || null
  };
}

const DEMO_USERS = {
  'admin@orbem.local': {
    id: 1,
    name: 'Ananya Rao',
    email: 'admin@orbem.local',
    role: 'Admin',
    phone: '+91 98765 10001',
    is_active: 1
  },
  'ops@orbem.local': {
    id: 2,
    name: 'Rahul Menon',
    email: 'ops@orbem.local',
    role: 'Operations Staff',
    phone: '+91 98765 10002',
    is_active: 1
  },
  'accounts@orbem.local': {
    id: 5,
    name: 'Priya Nair',
    email: 'accounts@orbem.local',
    role: 'Accounts Staff',
    phone: '+91 98765 10005',
    is_active: 1
  },
  'logistics@orbem.local': {
    id: 4,
    name: 'Deepak Kumar',
    email: 'logistics@orbem.local',
    role: 'Warehouse Staff',
    phone: '+91 98765 10004',
    is_active: 1
  }
};

function getDevelopmentDemoUser(email, password) {
  if (process.env.NODE_ENV === 'production') return null;
  if (password !== 'password') return null;
  return DEMO_USERS[String(email || '').trim().toLowerCase()] || null;
}

function hashResetToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function getFrontendBaseUrl() {
  if (process.env.FRONTEND_URL) return process.env.FRONTEND_URL.replace(/\/$/, '');
  if (process.env.CORS_ORIGIN) {
    const firstOrigin = process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim()).find(Boolean);
    if (firstOrigin) return firstOrigin.replace(/\/$/, '');
  }
  return 'http://localhost:5173';
}

function buildResetUrl(token, email) {
  const params = new URLSearchParams({ token, email });
  return `${getFrontendBaseUrl()}/login?${params.toString()}`;
}

function isSmtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_FROM);
}

async function sendPasswordResetEmail(user, resetUrl, token) {
  if (!isSmtpConfigured()) return { sent: false };

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: user.email,
    subject: 'Reset your ORBEM password',
    text: [
      `Hi ${user.name || 'there'},`,
      '',
      'Use this link to reset your ORBEM Operations Dashboard password:',
      resetUrl,
      '',
      `Reset code: ${token}`,
      `This code expires in ${RESET_TOKEN_TTL_MINUTES} minutes.`,
      '',
      'If you did not request this, you can ignore this email.'
    ].join('\n')
  });

  return { sent: true };
}

const register = asyncHandler(async (req, res) => {
  const { name, email, password, role = 'Operations Staff', phone } = req.body;
  assertRequired(req.body, ['name', 'email', 'password']);
  assertEmail(email);
  if (phone) assertPhone(phone);
  const normalizedRole = normalizeRole(role);
  assertIn(normalizedRole, ROLES, 'Role');

  if (String(password).length < 8) {
    throw createHttpError('Password must be at least 8 characters.');
  }

  const existing = await query('SELECT id FROM users WHERE email = ? LIMIT 1', [email]);
  if (existing.length) {
    throw createHttpError('A user with this email already exists.', 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const result = await query(
    'INSERT INTO users (name, email, password_hash, role, phone) VALUES (?, ?, ?, ?, ?)',
    [name.trim(), email.trim().toLowerCase(), passwordHash, normalizedRole, phone || null]
  );

  const users = await query('SELECT * FROM users WHERE id = ?', [result.insertId]);
  res.status(201).json({
    user: safeUser(users[0]),
    token: signToken(users[0])
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  assertRequired(req.body, ['email', 'password']);
  assertEmail(email);
  const cleanEmail = email.trim().toLowerCase();

  let users;
  try {
    users = await query('SELECT * FROM users WHERE email = ? AND is_active = 1 LIMIT 1', [cleanEmail]);
  } catch (error) {
    const demoUser = getDevelopmentDemoUser(cleanEmail, password);
    if (demoUser) {
      res.json({
        user: safeUser(demoUser),
        token: signToken(demoUser)
      });
      return;
    }
    throw error;
  }

  if (!users.length) {
    const demoUser = getDevelopmentDemoUser(cleanEmail, password);
    if (demoUser) {
      res.json({
        user: safeUser(demoUser),
        token: signToken(demoUser)
      });
      return;
    }
    throw createHttpError('Invalid email or password.', 401);
  }

  const user = users[0];
  const validPassword = await bcrypt.compare(password, user.password_hash);
  if (!validPassword) {
    throw createHttpError('Invalid email or password.', 401);
  }

  try {
    await query('UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?', [user.id]);
    user.last_login_at = new Date().toISOString();
  } catch (error) {
    if (error.code !== 'ER_BAD_FIELD_ERROR') throw error;
  }

  res.json({
    user: safeUser(user),
    token: signToken(user)
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  assertRequired(req.body, ['email']);
  assertEmail(email);
  const cleanEmail = email.trim().toLowerCase();
  const genericMessage = 'If that email exists, password reset instructions are ready.';

  const users = await query('SELECT id, name, email FROM users WHERE email = ? AND is_active = 1 LIMIT 1', [cleanEmail]);
  if (!users.length) {
    res.json({ message: genericMessage });
    return;
  }

  const user = users[0];
  const token = crypto.randomBytes(20).toString('hex');
  const tokenHash = hashResetToken(token);
  const resetUrl = buildResetUrl(token, user.email);

  await query('UPDATE password_reset_tokens SET used_at = CURRENT_TIMESTAMP WHERE user_id = ? AND used_at IS NULL', [user.id]);
  await query(
    `INSERT INTO password_reset_tokens (user_id, token_hash, expires_at)
     VALUES (?, ?, DATE_ADD(NOW(), INTERVAL ${RESET_TOKEN_TTL_MINUTES} MINUTE))`,
    [user.id, tokenHash]
  );

  let delivery = 'onscreen';
  try {
    const emailResult = await sendPasswordResetEmail(user, resetUrl, token);
    delivery = emailResult.sent ? 'email' : 'onscreen';
  } catch (error) {
    console.warn('Password reset email failed:', error.message);
  }

  res.json({
    message: delivery === 'email'
      ? 'Password reset instructions were sent to your email.'
      : 'Password reset code generated. Use the code below to set a new password.',
    delivery,
    expiresInMinutes: RESET_TOKEN_TTL_MINUTES,
    resetToken: delivery === 'onscreen' ? token : undefined,
    resetUrl: delivery === 'onscreen' ? resetUrl : undefined
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email, token, password } = req.body;
  assertRequired(req.body, ['email', 'token', 'password']);
  assertEmail(email);

  const cleanEmail = email.trim().toLowerCase();
  const cleanToken = String(token).trim();
  if (String(password).length < 8) {
    throw createHttpError('Password must be at least 8 characters.');
  }

  const tokenHash = hashResetToken(cleanToken);
  const rows = await query(
    `SELECT prt.id AS reset_id, u.id AS user_id
     FROM password_reset_tokens prt
     JOIN users u ON u.id = prt.user_id
     WHERE u.email = ?
       AND u.is_active = 1
       AND prt.token_hash = ?
       AND prt.used_at IS NULL
       AND prt.expires_at > NOW()
     ORDER BY prt.created_at DESC
     LIMIT 1`,
    [cleanEmail, tokenHash]
  );

  if (!rows.length) {
    throw createHttpError('Reset code is invalid or expired.', 400);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  try {
    await query('UPDATE users SET password_hash = ?, password_updated_at = CURRENT_TIMESTAMP WHERE id = ?', [passwordHash, rows[0].user_id]);
  } catch (error) {
    if (error.code !== 'ER_BAD_FIELD_ERROR') throw error;
    await query('UPDATE users SET password_hash = ? WHERE id = ?', [passwordHash, rows[0].user_id]);
  }
  await query('UPDATE password_reset_tokens SET used_at = CURRENT_TIMESTAMP WHERE id = ?', [rows[0].reset_id]);

  res.json({ message: 'Password reset successfully. Sign in with your new password.' });
});

const me = asyncHandler(async (req, res) => {
  res.json({ user: safeUser(req.user) });
});

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  me
};
