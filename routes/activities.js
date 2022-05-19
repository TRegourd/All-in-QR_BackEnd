var express = require("express");
const Activities = require("../controllers/Activities");
var router = express.Router();

router.post("/", Activities.createActivities);

router.get("/:id", Activities.listActivities);

router.post("/byRole", Activities.listActivitiesByRole);

router.get("/native/:id", Activities.listActivitiesNative);

router.post("/delete", Activities.deleteActivities);

router.put("/:id", Activities.modifyActivities);

module.exports = router;
