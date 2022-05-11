const registerEmail = require("../libs/registerEmail");

function createAttendee(req, res) {
  res.send(req.params.roleId);
}

function emailRegisterPage(req, res) {
  const body = req.body;
  registerEmail(body.email, body.eventId, body.roleId)
    .then(res.send("email sent"))
    .catch((err) => {
      console.log(err);
    });
}

const Register = { createAttendee, emailRegisterPage };

module.exports = Register;
