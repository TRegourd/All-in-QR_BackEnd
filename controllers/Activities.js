const ActivitiesModel = require("../models/Activities");

const activities = {
  createActivities(req, res) {
    const activitiesForm = req.body;

    console.log(activitiesForm);

    if (!activitiesForm.name) return res.sendStatus(400);
    if (!activitiesForm.date) return res.sendStatus(400);
    if (!activitiesForm.duration) return res.sendStatus(400);
    if (!activitiesForm.price) return res.sendStatus(400);
    if (!activitiesForm.desc) return res.sendStatus(400);
    if (!activitiesForm.event) return res.sendStatus(400);
    if (!activitiesForm.role) return res.sendStatus(400);

    ActivitiesModel.create(activitiesForm)
      .then(() => {
        res.sendStatus(201);
      })
      .catch(() => res.sendStatus(500));
  },

  listActivities(req, res) {
    ActivitiesModel.find({ event: req.params.id })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  },
};

module.exports = activities;
