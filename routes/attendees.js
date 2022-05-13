var express = require("express");
const Attendees = require("../controllers/Attendees");
var router = express.Router();

router.post("/", Attendees.createAttendees);

router.get("/event/:id", Attendees.listAttendees);

router.put("/:id", Attendees.modifyAttendees);

router.get("/:id", Attendees.listOneAttendees);

router.post("/delete", Attendees.deleteAttendees);

module.exports = router;
