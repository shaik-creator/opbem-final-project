const express = require('express');
const {
  getSettings,
  updateSettings,
  updateSetting,
  deleteSetting,
  updateProfile,
  securitySummary
} = require('../controllers/settingsController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.get('/', getSettings);
router.put('/', updateSettings);
router.put('/profile', updateProfile);
router.get('/security-summary', securitySummary);
router.put('/:key', updateSetting);
router.delete('/:key', deleteSetting);

module.exports = router;
