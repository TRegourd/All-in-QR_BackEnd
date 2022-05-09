var express = require("express");
const Roles = require("../controllers/Roles");
var router = express.Router();

router.post("/", Roles.createRoles);

router.get("/", Roles.listRoles);

module.exports = router;
