const express = require('express');
const router = express.Router();
const { submitContactForm, getAllMessages } = require('../controllers/contactController');

// Submit contact form
router.post('/contact', submitContactForm);

// Get all contact messages (optional - for admin)
router.get('/contact', getAllMessages);

module.exports = router;
