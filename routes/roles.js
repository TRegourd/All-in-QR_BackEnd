var express = require("express");
const Roles = require("../controllers/Roles");
var router = express.Router();
const checkAuth = require("../middlewares/checkAuth");

router.post("/", checkAuth, Roles.createRoles);

router.get("/:id", checkAuth, Roles.listRoles);

router.put("/:id", checkAuth, Roles.modifyRoles);

router.post("/delete", checkAuth, Roles.deleteRoles);

module.exports = router;
