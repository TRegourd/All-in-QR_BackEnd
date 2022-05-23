var express = require("express");
var eventRouter = express.Router();
const Event = require("../controllers/Event");
const checkAuth = require("../middlewares/checkAuth");

eventRouter.post("/", Event.createEvent);

eventRouter.get("/", checkAuth, Event.getEvents);

eventRouter.get("/home/all", Event.getAllEvents);

eventRouter.get("/:id", Event.getOneEvent);

eventRouter.get("/native/:id", Event.getOneEventNative);

eventRouter.put("/:id", Event.modifyEventById);
eventRouter.put("/:id/sum", Event.modifyEventTurnover);

eventRouter.delete("/:id", Event.deleteOneEvent);

module.exports = eventRouter;
