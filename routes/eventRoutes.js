const express = require('express');
const router = express.Router();
const {
  createEvent,
  getEvents,
  deleteEvent,
  updateEvent
} = require('../controllers/eventController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Routes
router.get('/events', getEvents);
router.post('/events', protect, authorizeRoles('admin', 'clubhead'), createEvent);
router.delete('/events/:id', protect, authorizeRoles('admin'), deleteEvent);
router.put('/events/:id', protect, authorizeRoles('admin', 'clubhead'), updateEvent);


module.exports = router;


