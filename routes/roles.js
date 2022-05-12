var express = require("express");
const Roles = require("../controllers/Roles");
var router = express.Router();

router.post("/", Roles.createRoles);

router.get("/", Roles.listRoles);

router.put("/:id", Roles.modifyRoles);

router.delete("/:id", Roles.deleteRoles);

module.exports = router;
