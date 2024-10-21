const express = require('express');
const router = express.Router();
const verifyEmail = require('../controllers/email-verify.controller');

// Route to send verification email
router.post('/send-verification-code', verifyEmail);

module.exports = router;