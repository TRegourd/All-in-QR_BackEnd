const EvtModel = require("../models/Events");
const AttendeesModel = require("../models/Attendees");
const ActivitiesModel = require("../models/Activities");

const events = {
  createEvent(req, res) {
    const { name, start_date, end_date, place, desc, admin, type } = req.body;

    if (!name) return res.sendStatus(400);
    if (!start_date) return res.sendStatus(400);
    if (!end_date) return res.sendStatus(400);
    if (!place) return res.sendStatus(400);
    if (!desc) return res.sendStatus(400);
    if (!type) return res.sendStatus(400);
    EvtModel.create({
      name,
      start_date,
      end_date,
      place,
      desc,
      admin,
      type,
      max_attendees: 100,
    })
      .then(() => {
        res.sendStatus(201);
      })
      .catch((e) => res.send(e));
  },

  getEvents(req, res, next) {
    EvtModel.find({ admin: req.user._id })
      .then((eventList) => {
        res.send(eventList);
      })
      .catch((err) => {
        res.send(err);
      });
  },

  getOneEvent(req, res, next) {
    EvtModel.findById(req.params.id)
      .populate("admin")
      .then((event) => res.send(event))
      .catch((err) => {
        res.send(err);
      });
  },

  deleteOneEvent(req, res) {
    const id = req.params.id;
    EvtModel.deleteOne({ _id: req.params.id })
      .then(() => {
        AttendeesModel.deleteMany({ event: req.params.id }).then(() =>
          console.log("Linked attendees deleted")
        );
        ActivitiesModel.deleteMany({ event: req.params.id }).then(() =>
          console.log("Linked activities deleted")
        );
      })
      .then(res.sendStatus(200))
      .catch(() => res.sendStatus(400));
  },

  modifyEventById(req, res) {
    const idEvent = req.params.id;
    const {
      name,
      start_date,
      end_date,
      place,
      desc,
      max_attendees,
      background_image,
    } = req.body;

    if (!name) return res.sendStatus(400);
    if (!start_date) return res.sendStatus(400);
    if (!end_date) return res.sendStatus(400);
    if (!place) return res.sendStatus(400);
    if (!desc) return res.sendStatus(400);

    console.log(req.body);

    EvtModel.findByIdAndUpdate(idEvent, {
      name,
      start_date,
      end_date,
      place,
      desc,
      max_attendees,
      background_image,
    })
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  },
};

module.exports = events;
