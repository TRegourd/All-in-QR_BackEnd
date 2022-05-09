const RolesModel = require("../models/Roles");

const roles = {
  createRoles(req, res) {
    const rolesForm = req.body;

    console.log(rolesForm);

    if (!rolesForm.name) return res.sendStatus(400);

    RolesModel.find({ name: rolesForm.name }).then((result) => {
      if (result.length !== 0) return res.sendStatus(409);
      else {
        RolesModel.create(rolesForm)
          .then(() => {
            res.sendStatus(201);
          })
          .catch(() => res.sendStatus(500));
      }
    });
  },

  listRoles(req, res) {
    RolesModel.find()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  },
};
module.exports = roles;
