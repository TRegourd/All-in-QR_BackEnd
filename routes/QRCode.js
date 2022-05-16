var express = require("express");
var router = express.Router();
const QRCode = require("../controllers/QRCode");

// router.post("/:id", QRCode.generateQRCode);

router.post("/all/:id", QRCode.generateQRCodeAll);

router.post("/many/", QRCode.generateQRCodeToMany);

module.exports = router;
