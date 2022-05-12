var express = require("express");
var router = express.Router();
const QRCode = require("../controllers/QRCode");

router.post("/:id", QRCode.generateQRCode);

router.post("/all/:id", QRCode.generateQRCodeAll);

module.exports = router;
