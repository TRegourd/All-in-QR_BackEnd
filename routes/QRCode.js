var express = require("express");
var router = express.Router();
const QRCode = require("../controllers/QRCode");

router.post("/:id", QRCode.generateQRCode);

module.exports = router;
