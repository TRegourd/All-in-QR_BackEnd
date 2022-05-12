const nodemailer = require("nodemailer");
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;

async function signInEmail(user) {
  if (user) {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });

    // const transporter = nodemailer.createTransport({
    //   host: "localhost",
    //   port: 1025,
    //   auth: {
    //     user: "project.1",
    //     pass: "secret.1",
    //   },
    // });

    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>',
      to: user.email,
      subject: "Hello ✔",
      text: `Thanks for signing in to All-in-QR`,
      html: `    <p>Thanks for signing in to All-in-QR</p>
      <p>
        Get Started organizing your events
        <button>
          <a href="http://localhost:3000/login">Let's go</a>
        </button>
      </p>`,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
}

signInEmail().catch(console.error);

module.exports = signInEmail;
