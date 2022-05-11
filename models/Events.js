const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: String,
  start_date: Date,
  end_date: Date,
  place: String,
  desc: String,
  admin: { type: mongoose.Types.ObjectId, ref: "Admin" },
  type: String,
});

const EvtModel = mongoose.model("Events", EventSchema);

module.exports = EvtModel;
