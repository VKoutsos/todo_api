const nodemailer = require("nodemailer");
require("dotenv").config();

// Configure email transport
const transporter = nodemailer.createTransport({
    service: "gmail", // Or use another provider
    auth: {
        user: process.env.EMAIL_USER,  // Your email
        pass: process.env.EMAIL_PASS   // Your app password (not your personal password!)
    }
});

// Universal function to send emails
const sendMail = (to, subject, message) => {


    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: message
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error("Error sending email:", err);
        } else {
            /*console.log("Email sent:", info.response);*/
        }
    });
};

module.exports = sendMail;