const nodemailer = require("nodemailer");
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;

// async..await is not allowed in global scope, must use a wrapper
async function sendResetEmail(email, id) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  if (email) {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: email,
      subject: "Rest Link", // Subject line
      text: `To reset your password, please click on this link: http://localhost:3000/reset/${id}`, // plain text body
      html: `To reset your password, please click on this link: http://localhost:3000/reset/${id}`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
}

sendResetEmail().catch(console.error);

module.exports = sendResetEmail;
