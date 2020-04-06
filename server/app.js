var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var calendarRoutes = require("./routes/calendar");
var coverRequestRoutes = require("./routes/coverrequests");
var employeesRoutes = require("./routes/employees");
var loginRoutes = require("./routes/login");
var masterScheduleRoutes = require("./routes/masterschedule");
var yourshiftsRoutes = require("./routes/yourshifts");

var cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", calendarRoutes);
app.use("/", coverRequestRoutes);
app.use("/", employeesRoutes);
app.use("/", loginRoutes);
app.use("/", masterScheduleRoutes);
app.use("/", yourshiftsRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
