const UserModel = require("../models/Users");

const users = {
  createUser(req, res) {
    const userForm = req.body;

    console.log(userForm);

    if (!userForm.name) return res.sendStatus(400);
    if (!userForm.email) return res.sendStatus(400);
    if (!userForm.password) return res.sendStatus(400);

    // On vérifie que l'adresse mail n'existe pas déjà dans la bdd
    UserModel.find({ email: userForm.email })
      .then((result) => {
        if (result.length !== 0) return res.sendStatus(409);
        else {
          UserModel.create(userForm)
            .then(() => {
              res.sendStatus(201);
            })
            .catch(() => res.sendStatus(500));
        }
      })
      .catch(() => res.sendStatus(500));
  },
};

module.exports = users;
