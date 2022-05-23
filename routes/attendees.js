var express = require("express");
const Attendees = require("../controllers/Attendees");
var router = express.Router();
const checkAuth = require("../middlewares/checkAuth");

router.post("/", checkAuth, Attendees.createAttendees);

router.post("/email", checkAuth, Attendees.listOneAttendeesByEmail);

router.get("/event/:id", checkAuth, Attendees.listAttendees);

router.put("/:id", checkAuth, Attendees.modifyAttendees);

router.put("/native/:id", checkAuth, Attendees.modifyAttendeesNative);

router.get("/:id", checkAuth, Attendees.listOneAttendees);

router.post("/delete", checkAuth, Attendees.deleteAttendees);

module.exports = router;
