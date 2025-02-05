const express = require('express');
const otpController = require('../controllers/otplesscontroller');

const router = express.Router();

router.post('/request', otpController.requestOTP);

router.post('/resend', otpController.resendOTPRequest);

router.post('/verify', otpController.verifyOTPRequest);

module.exports = router;
