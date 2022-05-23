var express = require("express");
const Attendees = require("../controllers/Attendees");
var router = express.Router();
const checkAuth = require("../middlewares/checkAuth");

router.post("/", Attendees.createAttendees);

router.post("/email", Attendees.listOneAttendeesByEmail);

router.get("/event/:id", Attendees.listAttendees);

router.put("/:id", Attendees.modifyAttendees);

router.put("/native/:id", Attendees.modifyAttendeesNative);

router.get("/:id", Attendees.listOneAttendees);

router.post("/delete", Attendees.deleteAttendees);

module.exports = router;
