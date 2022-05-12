const mongoose = require("mongoose");

const RolesSchema = new mongoose.Schema({
  name: String,
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Events" },
});

const RolesModel = mongoose.model("Roles", RolesSchema);

module.exports = RolesModel;
