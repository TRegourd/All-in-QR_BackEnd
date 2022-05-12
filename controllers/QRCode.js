const AttendeesModel = require("../models/Attendees");
var QRCodeNPM = require("qrcode");
const QRCodeEmail = require("../libs/QRCodeEmail");

function generateQRCode(req, res, next) {
  QRCodeNPM.toDataURL(JSON.stringify(req.params.id), function (err, url) {
    AttendeesModel.findById({ _id: req.params.id }).then((result) =>
      QRCodeEmail(result.email, url)
    );
  });
  res.send("QR Link Created");
}

const QRCode = { generateQRCode };

module.exports = QRCode;
