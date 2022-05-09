const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signInEmail = require("../libs/signInEmail");
const AdminModel = require("../models/Admin");
const saltRounds = 10;

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  const lowEmail = email.toLowerCase().trim();
  const admin = await AdminModel.findOne({ email: lowEmail });
  if (admin === null) {
    res.status(400);
    return res.send("No User Found");
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  const token = jwt.sign({ id: admin._id }, process.env.SECRET);

  if (isMatch) res.send({ jwt: token });
  else {
    res.status(400);
    res.send("Incorrect Login");
  }
}

async function signin(req, res) {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.confirmPassword
  ) {
    res.status(400).send("Incorrect input");
  } else {
    const lowEmail = req.body.email.toLowerCase().trim();

    const isExistingAdmin = await AdminModel.findOne({ email: lowEmail });

    if (isExistingAdmin === null) {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const newAdmin = {
          name: req.body.name,
          email: lowEmail,
          password: hashedPassword,
          position: "",
          adress: "",
        };
        await AdminModel.create(newAdmin);
        signInEmail(newAdmin);
        res.status(204).send("User created");
      } catch (err) {
        res.status(400).send(err);
      }
    } else {
      res.status(500).send("User already exists");
    }
  }
}

const Auth = { login, signin };

module.exports = Auth;
