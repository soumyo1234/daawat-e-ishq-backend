const express = require('express');
const router = express.Router();
const { sendContactMessage } = require('../controllers/contactController');

// POST /api/contact
router.post('/', sendContactMessage);

// POST /api/contact/test -> sends a single test email when ALLOW_TEST_EMAIL=true
const { sendTestEmail } = require('../controllers/contactController');
router.post('/test', sendTestEmail);

module.exports = router;
