const mongoose = require("mongoose");

const ActivitiesSchema = new mongoose.Schema({
  name: String,
  date: Date,
  duration: Number,
  price: Number,
  desc: String,
  event: { type: mongoose.Schema.Types.ObjectId, ref: "events" },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "roles" },
});

const ActivitiesModel = mongoose.model("Activities", ActivitiesSchema);

module.exports = ActivitiesModel;
