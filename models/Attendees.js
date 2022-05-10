const mongoose = require("mongoose");

const AttendeesSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  phone: String,
  extra_activities: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Activities" },
  ],
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Events" },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Roles" },
});

const AttendeesModel = mongoose.model("Attendees", AttendeesSchema);

module.exports = AttendeesModel;
