const AdminModel = require("../models/Admin");

const admins = {
  createAdmin(req, res) {
    const adminForm = req.body;

    console.log(adminForm);

    if (!adminForm.name) return res.sendStatus(400);
    if (!adminForm.email) return res.sendStatus(400);
    if (!adminForm.password) return res.sendStatus(400);

    // On vérifie que l'adresse mail n'existe pas déjà dans la bdd
    AdminModel.find({ email: adminForm.email })
      .then((result) => {
        if (result.length !== 0) return res.sendStatus(409);
        else {
          AdminModel.create(adminForm)
            .then(() => {
              res.sendStatus(201);
            })
            .catch(() => res.sendStatus(500));
        }
      })
      .catch(() => res.sendStatus(500));
  },
};

module.exports = admins;
