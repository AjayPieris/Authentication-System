import nodemailer from "nodemailer";

// Brevo (Sendinblue) SMTP transport. Port 587 uses STARTTLS (secure: false)
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default transporter;
