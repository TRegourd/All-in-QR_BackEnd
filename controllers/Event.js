const EvtModel = require("../models/Events");

const events = {
  createEvent(req, res) {
    const { name, start_date, end_date, place, desc } = req.body;

    if (!name) return res.sendStatus(400);
    if (!start_date) return res.sendStatus(400);
    if (!end_date) return res.sendStatus(400);
    if (!place) return res.sendStatus(400);
    if (!desc) return res.sendStatus(400);

    EvtModel.create({
      name,
      start_date,
      end_date,
      place,
      desc,
    })
      .then(() => {
        res.sendStatus(201);
      })
      .catch((e) => res.send(e));
  },

  getEvents(req, res, next) {
    console.log(req.user);
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
      .then((event) => res.send(event))
      .catch((err) => {
        res.send(err);
      });
  },

  deleteOneEvent(req, res) {
    EvtModel.deleteOne({ _id: req.params.id })
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => res.sendStatus(400));
  },
};

module.exports = events;
