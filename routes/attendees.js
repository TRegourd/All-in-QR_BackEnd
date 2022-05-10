var express = require("express");
const Attendees = require("../controllers/Attendees");
var router = express.Router();

router.post("/", Attendees.createAttendees);

router.put("/:id", Attendees.modifyAttendees);

router.get("/", Attendees.listAttendees);

router.get("/:id", Attendees.listOneAttendees);

router.delete("/:id", Attendees.deleteAttendees);

module.exports = router;
