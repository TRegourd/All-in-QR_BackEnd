const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signInEmail = require("../libs/signInEmail");
const AdminModel = require("../models/Admin");
const { v4: uuidv4 } = require("uuid");
const sendResetEmail = require("../libs/sendResetLink");
const { now } = require("mongoose");
const saltRounds = 10;
const dayjs = require("dayjs");

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

async function forgot(req, res) {
  if (!req.body.email) {
    res.status(400).send("Incorrect input");
  } else {
    const lowEmail = req.body.email.toLowerCase().trim();

    const isExistingAdmin = await AdminModel.findOne({ email: lowEmail });

    if (isExistingAdmin !== null) {
      try {
        const uuid = {
          token: uuidv4(),
          timeStamp: Date.now(),
        };
        await AdminModel.findOneAndUpdate({ email: lowEmail }, { uuid: uuid });
        sendResetEmail(isExistingAdmin.email, uuid);
        res.send(200);
      } catch (err) {
        res.status(400).send(err);
      }
    } else {
      res.status(500).send("No user with this email");
    }
  }
}

async function reset(req, res) {
  const user = await AdminModel.findOne({ "uuid.token": req.params.id });
  if (user) {
    const timeStampDate = dayjs(user.uuid.timeStamp);
    const nowDate = dayjs();
    const diffDates = nowDate.diff(timeStampDate, "minute");
    if (req.body.email === user.email && diffDates < 15) {
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      await AdminModel.findOneAndUpdate(
        { "uuid.token": req.params.id },
        { password: hashedPassword, uuid: {} }
      );
      res.send(200);
    } else {
      res.status(403).json();
    }
  } else {
    res.status(404).json();
  }
}

const Auth = { login, signin, forgot, reset };

module.exports = Auth;
