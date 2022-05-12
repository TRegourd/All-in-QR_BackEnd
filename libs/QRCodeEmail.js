const nodemailer = require("nodemailer");
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;

async function QRCodeEmail(email, QRCodeLink) {
  if (email) {
    // const transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   auth: {
    //     user: MAIL_USER,
    //     pass: MAIL_PASS,
    //   },
    // });

    const transporter = nodemailer.createTransport({
      host: "localhost",
      port: 1025,
      auth: {
        user: "project.1",
        pass: "secret.1",
      },
    });

    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>',
      to: email,
      subject: "Register to the event !",
      text: `You've successfully been registered to an event ! Here is the QRCode Link if you need : ${QRCodeLink}`,
      html: `<p>
      You've successfully been registered to an event !
      <br />
      Here is your QR Code to enter and to participate to you diffrent
      activities :
    </p>
    <img src="${QRCodeLink}" alt="" />
      `,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
}

QRCodeEmail().catch(console.error);

module.exports = QRCodeEmail;
