var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

require("./dbConnect");

var indexRouter = require("./routes/index");
var adminsRouter = require("./routes/admins");
var eventRouter = require("./routes/events");
var attendeesRouter = require("./routes/attendees");
var authRouter = require("./routes/auth");
var rolesRouter = require("./routes/roles");
var activitiesRouter = require("./routes/activities");
var registerRouter = require("./routes/register");
var QRCodeRouter = require("./routes/QRCode");

var app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);

app.use("/admins", adminsRouter);
app.use("/events", eventRouter);
app.use("/attendees", attendeesRouter);
app.use("/auth", authRouter);
app.use("/roles", rolesRouter);
app.use("/activities", activitiesRouter);
app.use("/register", registerRouter);
app.use("/qrcode", QRCodeRouter);
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
