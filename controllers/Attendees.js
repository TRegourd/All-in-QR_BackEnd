const AttendeesModel = require("../models/Attendees");
const Event = require("../models/Events");
const Role = require("../controllers/Roles");
const attendeeRegisterEmail = require("../libs/attendeeRegisterEmail");
const ActivitiesModel = require("../models/Activities");

const attendees = {
  createAttendees(req, res) {
    const attendeesForm = req.body;

    if (!attendeesForm.name) return res.sendStatus(400);
    if (!attendeesForm.surname) return res.sendStatus(400);
    if (!attendeesForm.email) return res.sendStatus(400);
    if (!attendeesForm.phone) return res.sendStatus(400);
    if (!attendeesForm.event) return res.sendStatus(400);
    if (!attendeesForm.role) return res.sendStatus(400);

    AttendeesModel.create({ ...attendeesForm, present: false, QRsent: false })
      .then(() => {
        attendeeRegisterEmail(attendeesForm)
          .then(res.status(201).send("email sent"))
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(() => res.sendStatus(500));
  },

  listAttendees(req, res, next) {
    AttendeesModel.find({ event: req.params.id })
      .populate(["role", "event", "extra_activities"])
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  },

  listOneAttendees(req, res, next) {
    AttendeesModel.findById(req.params.id)
      .populate(["role", "event", "extra_activities"])
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  },

  listOneAttendeesByEmail(req, res, next) {
    console.log(req.body);
    AttendeesModel.findOne({ event: req.body.event, email: req.body.email })
      .populate(["role", "event", "extra_activities"])
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  },

  deleteAttendees(req, res) {
    AttendeesModel.deleteMany({ _id: { $in: req.body } })
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => res.sendStatus(400));
  },

  modifyAttendees(req, res) {
    const attendeesForm = req.body;

    const array = req.body.extra_activities.split(",");
    console.log(array);
    AttendeesModel.findById(req.body.id).then((attendee) => {
      let event = attendee.event;
      ActivitiesModel.find({ name: { $in: array }, event: event }).then(
        (result) => {
          const toto = { extra_activities: result };
          console.log(toto);
          AttendeesModel.findOneAndUpdate({ _id: req.params.id }, toto)
            .then(() => {
              res.sendStatus(201);
            })
            .catch(() => res.sendStatus(500));
        }
      );
    });
  },
};

module.exports = attendees;
