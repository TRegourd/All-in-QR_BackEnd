const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const getToken = (req) => String(req.get("Authorization")).split(" ")[1];

function checkAuth(req, res, next) {
  const token = getToken(req);

  if (!token) return res.sendStatus(401);

  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    Admin.findById(id).then((user) => {
      req.user = user;
      next();
    });
  } catch (err) {
    res.sendStatus(403);
  }
}

module.exports = checkAuth;
