const mongoose = require("mongoose");

const AttendeesSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  phone: String,
  extra_activities: [
    { type: mongoose.Schema.Types.ObjectId, ref: "activities" },
  ],
  event: { type: mongoose.Schema.Types.ObjectId, ref: "events" },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "roles" },
});

const AttendeesModel = mongoose.model("Attendees", AttendeesSchema);

module.exports = AttendeesModel;
