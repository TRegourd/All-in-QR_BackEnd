const mongoose = require("mongoose");

const RolesSchema = new mongoose.Schema({
  name: String,
});

const RolesModel = mongoose.model("Roles", RolesSchema);

module.exports = RolesModel;
