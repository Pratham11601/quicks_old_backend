const { sendOTP, resendOTP, verifyOTP } = require("otpless-node-js-auth-sdk");




async function requestOTP(req, res) {
    try {
        const { phoneNumber, email, channel, hash, orderId, expiry, otpLength, clientId, clientSecret } = req.body;
        const response = await sendOTP(phoneNumber, email, channel, hash, orderId, expiry, otpLength, clientId, clientSecret);
        console.log("OTP Sent:", response);
        res.json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ success: false, error: 'Failed to send OTP' });
    }
}






async function resendOTPRequest(req, res) {
    try {
        const { orderId, clientId, clientSecret } = req.body;
        const response = await resendOTP(orderId, clientId, clientSecret);
        console.log("OTP Resent:", response);
        res.json({ success: true, message: 'OTP resent successfully' });
    } catch (error) {
        console.error("Error resending OTP:", error);
        res.status(500).json({ success: false, error: 'Failed to resend OTP' });
    }
}



async function verifyOTPRequest(req, res) {
    try {
        const { email, phoneNumber, orderId, otp, clientId, clientSecret } = req.body;
        const response = await verifyOTP(email, phoneNumber, orderId, otp, clientId, clientSecret);
        console.log("OTP Verification Result:", response);
        if (response.isOTPVerified) {
            res.json({ success: true, message: 'OTP verified successfully' });
        } else {
            res.status(400).json({ success: false, error: 'Invalid OTP' });
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ success: false, error: 'Failed to verify OTP' });
    }
}

module.exports = {
    requestOTP,
    resendOTPRequest,
    verifyOTPRequest
};
