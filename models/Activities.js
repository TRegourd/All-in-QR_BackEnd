const mongoose = require("mongoose");

const ActivitiesSchema = new mongoose.Schema({
  name: String,
  date: Date,
  duration: Number,
  price: Number,
  desc: String,
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Events" },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Roles" },
});

const ActivitiesModel = mongoose.model("Activities", ActivitiesSchema);

module.exports = ActivitiesModel;
