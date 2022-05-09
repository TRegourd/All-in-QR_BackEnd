var express = require("express");
const Attendees = require("../controllers/Attendees");
var router = express.Router();

router.post("/", Attendees.createAttendees);

module.exports = router;
