const express = require('express');
const router = express.Router();
const { createClub, joinClub, getAllClubs } = require('../controllers/clubController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/clubs', protect, authorizeRoles('admin', 'clubhead'), createClub);
router.post('/clubs/join', protect, authorizeRoles('student'), joinClub);
router.get('/clubs', protect, getAllClubs);

module.exports = router;

