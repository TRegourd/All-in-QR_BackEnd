const AttendeesModel = require("../models/Attendees");

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

  listAttendees(req, res) {
    AttendeesModel.find()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  },

  listOneAttendees(req, res, next) {
    AttendeesModel.findById(req.params.id)
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

  modifyAttendees(req, res) {
    const attendeesForm = req.body;

    console.log(attendeesForm);

    if (!attendeesForm.name) return res.sendStatus(400);
    if (!attendeesForm.surname) return res.sendStatus(400);
    if (!attendeesForm.email) return res.sendStatus(400);
    if (!attendeesForm.phone) return res.sendStatus(400);
    if (!attendeesForm.event) return res.sendStatus(400);
    if (!attendeesForm.role) return res.sendStatus(400);

    AttendeesModel.findOneAndUpdate({ _id: req.params.id }, attendeesForm)
      .then(() => {
        res.sendStatus(201);
      })
      .catch(() => res.sendStatus(500));
  },
};

module.exports = attendees;
