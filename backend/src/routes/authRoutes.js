const express = require('express');
const { register, login, me } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router
  .route('/login')
  .post(login)
  .all((req, res) => {
    res.set('Allow', 'POST');
    res.status(405).json({
      success: false,
      message: 'Use POST /api/auth/login to sign in.'
    });
  });
router.get('/me', protect, me);

module.exports = router;
