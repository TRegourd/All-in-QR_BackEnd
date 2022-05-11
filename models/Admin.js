const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  adress: String,
  uuid: { token: String, timeStamp: Date },
});

const AdminModel = mongoose.model("Admin", AdminSchema);

module.exports = AdminModel;
