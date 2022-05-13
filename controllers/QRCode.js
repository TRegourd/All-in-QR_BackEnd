const AttendeesModel = require("../models/Attendees");
var QRCodeNPM = require("qrcode");
const QRCodeEmail = require("../libs/QRCodeEmail");
const QRCodeEthe = require("../libs/QRCodeEmailEthereal");

function generateQRCode(req, res, next) {
  QRCodeNPM.toDataURL(JSON.stringify(req.params.id), function (err, url) {
    AttendeesModel.findById({ _id: req.params.id }).then((result) =>
      QRCodeEmail(result.email, url)
    );
  });
  res.send("QR Link Created");
}

function generateQRCodeAll(req, res, next) {
  AttendeesModel.find({ event: req.params.id })
    .then((data) => {
      data.map((attendee) => {
        QRCodeNPM.toDataURL(JSON.stringify(attendee._id), function (err, url) {
          QRCodeEthe(attendee.email, url);
        });
      });
      res.send("Emails envoyés");
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
}

const QRCode = { generateQRCode, generateQRCodeAll };

module.exports = QRCode;
