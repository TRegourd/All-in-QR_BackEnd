var express = require("express");
var eventRouter = express.Router();
const Event = require("../controllers/Event");

eventRouter.post("/", Event.createEvent);

module.exports = eventRouter;
