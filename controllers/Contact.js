const Contact = require("../models/Contacts");

function postNewMessage(req, res) {
  console.log(req.body);
  if (!req.body.message || !req.body.email) {
    res.status(400).send("Incorrect input");
  } else {
    Contact.create(req.body)
      .then(() => {
        res.send(`New Message Created`);
      })
      .catch((error) => console.log(error));
  }
}

const Contacts = { postNewMessage };

module.exports = Contacts;
