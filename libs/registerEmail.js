const nodemailer = require("nodemailer");
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;

async function registerEmail(email, eventId, roleId) {
  if (email) {
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
      to: email,
      subject: "Register to the event !",
      text: `Please click on this link: http://localhost:3000/register/${eventId}/${roleId} to register.`,
      html: `    <h1>Register to the Event</h1>
      <p>You have been invited to register to a new amazing event</p>
      <p>
        Please follow
        <a href="http://localhost:3000/register/${eventId}/${roleId}"
          >this link</a
        >
        to register
      </p>
      `,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
}

registerEmail().catch(console.error);

module.exports = registerEmail;
