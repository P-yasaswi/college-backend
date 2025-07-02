const express = require('express');
const router = express.Router();
const { submitFeedback, getAllFeedbacks } = require('../controllers/feedbackController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');


// Only students can give feedback
router.post('/feedback', protect, authorizeRoles('student'), submitFeedback);

// Admin and clubhead can view feedback
router.get('/feedback', protect, authorizeRoles('admin', 'clubhead'), getAllFeedbacks);

module.exports = router;
