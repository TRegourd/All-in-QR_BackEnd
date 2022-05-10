var express = require("express");
const Admin = require("../controllers/Admin");
const checkAuth = require("../middlewares/checkAuth");
var router = express.Router();

router.post("/", Admin.createAdmin);
router.get("/", checkAuth, Admin.getCurrentAdmin);

module.exports = router;
