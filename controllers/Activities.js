const ActivitiesModel = require("../models/Activities");
const EvtModel = require("../models/Events");

const activities = {
  createActivities(req, res) {
    const activitiesForm = req.body;

    if (!activitiesForm.name) return res.sendStatus(400);
    if (!activitiesForm.date) return res.sendStatus(400);
    if (!activitiesForm.price) return res.sendStatus(400);
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
      .populate(["role", "event"])

      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  },

  listActivitiesByRole(req, res) {
    ActivitiesModel.find({ role: req.body.id })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  },

  listActivitiesNative(req, res) {
    EvtModel.findOne({ uid: req.params.id })
      .then((event) => {
        ActivitiesModel.find({ event: event._id })
          .populate(["role", "event"])
          .then((data) => {
            res.status(200).json(data);
          })
          .catch((error) => {
            res.status(400).json({ error: error });
          });
      })
      .catch((err) => {
        res.send(err);
      });
  },

  deleteActivities(req, res) {
    ActivitiesModel.deleteMany({ _id: { $in: req.body } })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  },

  modifyActivities(req, res) {
    const activitiesForm = req.body;

    ActivitiesModel.findOneAndUpdate({ _id: req.params.id }, activitiesForm)
      .then(() => {
        res.sendStatus(201);
      })
      .catch(() => res.sendStatus(500));
  },
};

module.exports = activities;
