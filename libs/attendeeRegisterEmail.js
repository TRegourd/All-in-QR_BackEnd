const dayjs = require("dayjs");
const nodemailer = require("nodemailer");
const EvtModel = require("../models/Events");
const RolesModel = require("../models/Roles");
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;
let attendeeRole;
let eventName;
let eventStartDate;
let eventEndDate;
let eventPlace;

async function attendeeRegisterEmail(attendeesForm) {
  if (attendeesForm) {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });

    await RolesModel.findById(attendeesForm.role)
      .then((result) => {
        attendeeRole = result;
      })
      .catch((err) => console.log(err));

    await EvtModel.findById(attendeesForm.event)
      .then((result) => {
        eventName = result.name;
        eventStartDate = dayjs(result.start_date).format("DD-MM-YYYY");
        eventEndDate = dayjs(result.end_date).format("DD-MM-YYYY");
        eventPlace = result.place;
      })
      .catch((err) => console.log(err));
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
      to: '"Fred Foo 👻" <foo@example.com>',
      cc: attendeesForm.email,
      subject: "Thanks for registering !",
      text: `Inscription successfull,
      You have been registered to a new amazing event`,
      html: `    <h1>Inscription successfull</h1>
      <p>Thank you ${attendeesForm.surname} ${attendeesForm.name}, you have been registered as ${attendeeRole.name} to the event "${eventName}"</p>
      <p>
      This event will take place in ${eventPlace} from ${eventStartDate} to ${eventEndDate}
      </p>
      <p>You will recieve your QR code for the access shortly before the event</p>
      <h5>See you soon!</h5>
      `,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
}

attendeeRegisterEmail().catch(console.error);

module.exports = attendeeRegisterEmail;
