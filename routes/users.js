var express = require("express");
const Users = require("../controllers/Users");
var router = express.Router();

router.post("/", Users.createUser);

module.exports = router;
