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
};

module.exports = events;
