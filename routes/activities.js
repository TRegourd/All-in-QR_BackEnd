var express = require("express");
const Activities = require("../controllers/Activities");
var router = express.Router();

router.post("/", Activities.createActivities);

router.get("/:id", Activities.listActivities);

module.exports = router;
