const EvtModel = require("../models/Events");

const events = {
  createEvent(req, res) {
    const { name, start_date, end_date, place, desc } = req.body;
    console.log(start_date);
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
};

module.exports = events;
