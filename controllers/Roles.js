const RolesModel = require("../models/Roles");

const roles = {
  createRoles(req, res) {
    const rolesForm = req.body;

    console.log(rolesForm);

    if (!rolesForm.name) return res.sendStatus(400);
    if (!rolesForm.event) return res.sendStatus(400);

    RolesModel.find({ event: rolesForm.event, name: rolesForm.name }).then(
      (result) => {
        if (result.length !== 0) return res.sendStatus(409);
        else {
          RolesModel.create(rolesForm)
            .then(() => {
              res.sendStatus(201);
            })
            .catch(() => res.sendStatus(500));
        }
      }
    );
  },

  listRoles(req, res) {
    RolesModel.find({ event: req.params.id })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  },

  modifyRoles(req, res) {
    const idRoles = req.params.id;
    const { name } = req.body;

    if (!name) return res.sendStatus(400);

    console.log(req.body);

    RolesModel.findByIdAndUpdate(idRoles, { name })
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => {
        res.sendStatus(400);
      });
  },

  deleteRoles(req, res) {
    RolesModel.deleteOne({ _id: req.params.id })
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => {
        res.sendStatus(400);
      });
  },
};
module.exports = roles;
