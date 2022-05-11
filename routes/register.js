var express = require("express");
const Register = require("../controllers/Register");
var router = express.Router();

router.post("/", Register.emailRegisterPage);

module.exports = router;
