const express = require('express');
const router = express.Router();
const { registerForEvent, getAllRegistrations } = require('../controllers/registrationController');

// POST: Student registers for event
router.post('/register-event', registerForEvent);

// GET: Admin views all registrations
router.get('/registrations', getAllRegistrations);

module.exports = router;
