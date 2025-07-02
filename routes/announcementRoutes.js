const express = require('express');
const router = express.Router();
const {
  createAnnouncement,
  getAnnouncements,
  deleteAnnouncement
} = require('../controllers/announcementController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Public route
router.get('/announcements', getAnnouncements);

// Protected routes
router.post('/announcements', protect, authorizeRoles('admin', 'clubhead'), createAnnouncement);
router.delete('/announcements/:id', protect, authorizeRoles('admin'), deleteAnnouncement);

module.exports = router;
