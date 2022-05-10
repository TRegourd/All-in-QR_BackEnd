var express = require("express");
var eventRouter = express.Router();
const Event = require("../controllers/Event");

eventRouter.post("/", Event.createEvent);

eventRouter.get("/", Event.getEvents);

eventRouter.get("/:id", Event.getOneEvent);

module.exports = eventRouter;
