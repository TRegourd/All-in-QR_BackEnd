const EvtModel = require("../models/Events");

const events = {
  createEvent(req, res) {
    console.log(req.body);

    const newEvent = req.body;
    if (!newEvent.name) return res.sendStatus(400);
    if (!newEvent.start_date) return res.sendStatus(400);
    if (!newEvent.end_date) return res.sendStatus(400);
    if (!newEvent.place) return res.sendStatus(400);
    if (!newEvent.desc) return res.sendStatus(400);

    EvtModel.create(newEvent)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((e) => res.send(e));
  },

  getEvents(req, res, next) {
    EvtModel.find()
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
};

module.exports = events;
