var express = require("express");
const Admin = require("../controllers/Admin");
var router = express.Router();

router.post("/", Admin.createAdmin);

module.exports = router;
