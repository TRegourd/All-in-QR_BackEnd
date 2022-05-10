var express = require("express");
const Attendees = require("../controllers/Attendees");
var router = express.Router();

router.post("/", Attendees.createAttendees);

router.get("/", Attendees.listAttendees);

router.delete("/:id", Attendees.deleteAttendees);

module.exports = router;
