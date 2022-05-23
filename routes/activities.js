var express = require("express");
const Activities = require("../controllers/Activities");
var router = express.Router();
const checkAuth = require("../middlewares/checkAuth");

router.post("/", checkAuth, Activities.createActivities);

router.get("/:id", checkAuth, Activities.listActivities);

router.post("/byRole", checkAuth, Activities.listActivitiesByRole);

router.get("/native/:id", checkAuth, Activities.listActivitiesNative);

router.post("/delete", checkAuth, Activities.deleteActivities);

router.put("/:id", checkAuth, Activities.modifyActivities);

module.exports = router;
