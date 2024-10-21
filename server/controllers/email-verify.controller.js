require("dotenv").config();
const nodemailer = require('nodemailer');

// Function to send verification email
const verifyEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        console.log("Generated Code:", verificationCode);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification',
            html: `<h1>Email Verification</h1>
                    <p>Your verification code is: <strong>${verificationCode}</strong></p>
                    <p>Please enter this code to verify your email address.</p>`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Verification email sent: %s", info.messageId);

        res.status(200).json({ message: 'Verification email sent successfully', email: email, code: verificationCode });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send verification email', error: error.message });
    }
};

module.exports = verifyEmail;