const AttendeesModel = require("../models/Attendees");
const Event = require("../models/Events");
const Role = require("../controllers/Roles");

const attendees = {
  createAttendees(req, res) {
    const attendeesForm = req.body;

    console.log(attendeesForm);

    if (!attendeesForm.name) return res.sendStatus(400);
    if (!attendeesForm.surname) return res.sendStatus(400);
    if (!attendeesForm.email) return res.sendStatus(400);
    if (!attendeesForm.phone) return res.sendStatus(400);
    if (!attendeesForm.event) return res.sendStatus(400);
    if (!attendeesForm.role) return res.sendStatus(400);

    AttendeesModel.create(attendeesForm)
      .then(() => {
        res.sendStatus(201);
      })
      .catch(() => res.sendStatus(500));
  },

  listAttendees(req, res, next) {
    AttendeesModel.find({ event: req.params.id })
      .populate(["role", "event"])
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  },

  deleteAttendees(req, res) {
    AttendeesModel.deleteOne({ _id: req.params.id })
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => res.sendStatus(400));
  },
};

module.exports = attendees;
