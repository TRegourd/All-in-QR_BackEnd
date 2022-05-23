var express = require("express");
const Roles = require("../controllers/Roles");
var router = express.Router();
const checkAuth = require("../middlewares/checkAuth");

router.post("/", Roles.createRoles);

router.get("/:id", Roles.listRoles);

router.put("/:id", Roles.modifyRoles);

router.post("/delete", Roles.deleteRoles);

module.exports = router;
