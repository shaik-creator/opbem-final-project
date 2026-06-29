import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, KeyRound, LogIn, Mail, PlaneTakeoff, ShieldCheck, X } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import ErrorState from '../components/common/ErrorState';
import api, { getErrorMessage } from '../services/api';
import { useAuth } from '../services/authService';

const demoUsers = [
  { email: 'admin@orbem.local', role: 'Admin / Owner', initials: 'AR', color: '#1d9e75' },
  { email: 'ops@orbem.local', role: 'Operations Staff', initials: 'RM', color: '#378add' },
  { email: 'accounts@orbem.local', role: 'Accounts Staff', initials: 'PN', color: '#ef9f27' },
  { email: 'logistics@orbem.local', role: 'Warehouse Staff', initials: 'DK', color: '#6366f1' }
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: 'admin@orbem.local', password: 'password' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [resetOpen, setResetOpen] = useState(false);
  const [resetStep, setResetStep] = useState('request');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [resetForm, setResetForm] = useState({
    email: form.email,
    token: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const email = params.get('email');
    const token = params.get('token');
    if (email || token) {
      setResetOpen(true);
      setResetStep('reset');
      setResetForm((current) => ({
        ...current,
        email: email || current.email,
        token: token || current.token
      }));
      setResetMessage('Enter a new password to finish the reset.');
    }
  }, [location.search]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setNotice('');
    try {
      await login(form);
      navigate(location.state?.from?.pathname || '/', { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  function openResetPanel() {
    setResetOpen(true);
    setResetStep('request');
    setResetError('');
    setResetMessage('');
    setResetForm({
      email: form.email,
      token: '',
      password: '',
      confirmPassword: ''
    });
  }

  async function handleForgotPassword(event) {
    event.preventDefault();
    setResetLoading(true);
    setResetError('');
    setResetMessage('');
    try {
      const response = await api.post('/api/auth/forgot-password', { email: resetForm.email });
      setResetStep('reset');
      setResetMessage(response.data.message || 'Reset instructions are ready.');
      setResetForm((current) => ({
        ...current,
        token: response.data.resetToken || current.token
      }));
    } catch (err) {
      setResetError(getErrorMessage(err));
    } finally {
      setResetLoading(false);
    }
  }

  async function handleResetPassword(event) {
    event.preventDefault();
    setResetLoading(true);
    setResetError('');
    setResetMessage('');

    if (resetForm.password !== resetForm.confirmPassword) {
      setResetError('Passwords do not match.');
      setResetLoading(false);
      return;
    }

    try {
      const response = await api.post('/api/auth/reset-password', {
        email: resetForm.email,
        token: resetForm.token,
        password: resetForm.password
      });
      setForm({ email: resetForm.email, password: resetForm.password });
      setNotice(response.data.message || 'Password reset successfully. Sign in with your new password.');
      setResetOpen(false);
    } catch (err) {
      setResetError(getErrorMessage(err));
    } finally {
      setResetLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#edf2f7] p-4 sm:p-6">
      <section className="grid min-h-[580px] w-full max-w-5xl overflow-hidden rounded-[18px] border border-[#dbe3ea] bg-white shadow-[0_26px_70px_rgba(15,31,61,0.16)] lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-[#0f1f3d] p-10 text-white lg:flex lg:flex-col">
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,.65)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.65)_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-[9px] bg-[#1d9e75]">
                <PlaneTakeoff className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xl font-semibold">ORBEM</p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Solutions Pvt Ltd</p>
              </div>
            </div>

            <div className="my-auto max-w-sm">
              <h1 className="text-[28px] font-semibold leading-tight">
                Air cargo ops,
                <br />
                <span className="text-[#1d9e75]">fully in control.</span>
              </h1>
              <p className="mt-4 max-w-[300px] text-sm leading-7 text-white/55">
                Real-time shipment tracking, revenue intelligence, and document management built for daily logistics operations.
              </p>
              <div className="mt-9 flex gap-7">
                {[
                  ['247', 'Active bookings'],
                  ['14', 'Departures today'],
                  ['48L', 'Revenue MTD']
                ].map(([value, label]) => (
                  <div key={label} className="border-l-2 border-white/10 pl-4">
                    <p className="text-xl font-semibold">{value}</p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-white/35">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[10px] text-white/25">(c) 2026 ORBEM Solutions Private Limited</p>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white p-6 sm:p-10">
          <div className="w-full max-w-sm">
            <div className="mb-7 lg:hidden">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1d9e75] text-white">
                <PlaneTakeoff className="h-5 w-5" />
              </div>
              <p className="text-xl font-semibold text-[#0f1f3d]">ORBEM Operations</p>
            </div>

            <div className="mb-7">
              <h2 className="text-xl font-semibold text-[#172033]">Sign in</h2>
              <p className="mt-1 text-sm text-[#64748b]">Access your operations dashboard</p>
            </div>

            {error ? <div className="mb-4"><ErrorState title="Login failed" message={error} /></div> : null}
            {notice ? (
              <div className="mb-4 rounded-lg border border-[#bbf7d0] bg-[#f0fdf4] px-4 py-3 text-sm font-semibold text-[#166534]">
                {notice}
              </div>
            ) : null}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <Input label="Email address" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
                <Mail className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 text-[#94a3b8]" />
              </div>
              <div className="relative">
                <Input label="Password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute bottom-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-md text-[#94a3b8] transition hover:bg-[#f1f5f9] hover:text-[#172033]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="-mt-1 flex items-center justify-between gap-3">
                <button type="button" onClick={openResetPanel} className="text-xs font-semibold text-[#1d9e75] hover:text-[#0f6e56]">
                  Forgot password?
                </button>
                <Link to="/register" className="text-xs font-semibold text-[#1d9e75] hover:text-[#0f6e56]">Create account</Link>
              </div>
              <Button type="submit" icon={LogIn} loading={loading} className="w-full bg-[#0f1f3d] hover:bg-[#1a3258]">
                Sign in to dashboard
              </Button>
            </form>

            {resetOpen ? (
              <section className="mt-4 rounded-lg border border-[#dbe3ea] bg-[#f8fafc] p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[#172033]">Reset password</h3>
                    <p className="mt-1 text-xs text-[#64748b]">
                      {resetStep === 'request' ? 'Enter your email to get a reset code.' : 'Enter the reset code and your new password.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setResetOpen(false)}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-[#94a3b8] hover:bg-white hover:text-[#172033]"
                    aria-label="Close password reset"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {resetError ? <p className="mb-3 rounded-md bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">{resetError}</p> : null}
                {resetMessage ? <p className="mb-3 rounded-md bg-[#ecfdf5] px-3 py-2 text-xs font-semibold text-[#0f766e]">{resetMessage}</p> : null}

                {resetStep === 'request' ? (
                  <form className="space-y-3" onSubmit={handleForgotPassword}>
                    <Input
                      label="Account email"
                      type="email"
                      value={resetForm.email}
                      onChange={(event) => setResetForm({ ...resetForm, email: event.target.value })}
                      required
                    />
                    <Button type="submit" icon={Mail} loading={resetLoading} className="w-full">
                      Send reset code
                    </Button>
                  </form>
                ) : (
                  <form className="space-y-3" onSubmit={handleResetPassword}>
                    <Input
                      label="Account email"
                      type="email"
                      value={resetForm.email}
                      onChange={(event) => setResetForm({ ...resetForm, email: event.target.value })}
                      required
                    />
                    <Input
                      label="Reset code"
                      value={resetForm.token}
                      onChange={(event) => setResetForm({ ...resetForm, token: event.target.value })}
                      required
                    />
                    {resetForm.token ? (
                      <p className="rounded-md border border-[#dbe3ea] bg-white px-3 py-2 text-xs text-[#64748b]">
                        Current code: <span className="font-mono font-semibold text-[#172033]">{resetForm.token}</span>
                      </p>
                    ) : null}
                    <Input
                      label="New password"
                      type="password"
                      value={resetForm.password}
                      onChange={(event) => setResetForm({ ...resetForm, password: event.target.value })}
                      minLength={8}
                      required
                    />
                    <Input
                      label="Confirm new password"
                      type="password"
                      value={resetForm.confirmPassword}
                      onChange={(event) => setResetForm({ ...resetForm, confirmPassword: event.target.value })}
                      minLength={8}
                      required
                    />
                    <div className="grid gap-2 sm:grid-cols-2">
                      <Button type="button" variant="secondary" onClick={() => setResetStep('request')}>
                        Back
                      </Button>
                      <Button type="submit" icon={KeyRound} loading={resetLoading}>
                        Reset password
                      </Button>
                    </div>
                  </form>
                )}
              </section>
            ) : null}

            <div className="my-5 flex items-center gap-3 text-[11px] text-[#94a3b8]">
              <span className="h-px flex-1 bg-[#edf2f7]" />
              or sign in as a demo user
              <span className="h-px flex-1 bg-[#edf2f7]" />
            </div>

            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#94a3b8]">Quick access</p>
            <div className="space-y-2">
              {demoUsers.map((user) => (
                <button
                  key={user.email}
                  type="button"
                  onClick={() => setForm({ email: user.email, password: 'password' })}
                  className="flex w-full items-center gap-3 rounded-lg border border-[#dbe3ea] bg-[#f8fafc] px-3 py-2 text-left transition hover:border-[#cbd5e1] hover:bg-white"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: user.color }}>
                    {user.initials}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-semibold text-[#172033]">{user.email}</span>
                    <span className="mt-0.5 block truncate text-[11px] text-[#94a3b8]">{user.role}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-[#94a3b8]" />
                </button>
              ))}
            </div>

            <p className="mt-5 inline-flex items-center gap-2 text-xs text-[#64748b]">
              <ShieldCheck className="h-4 w-4 text-[#1d9e75]" />
              JWT protected demo access
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
