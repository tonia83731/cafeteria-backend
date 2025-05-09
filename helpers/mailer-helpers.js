const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const info = await transport.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    console.log("Gmail sent", info.messageId);
  } catch (error) {
    console.error("Send gmail error: ", error);
  }
};

module.exports = sendEmail;
