var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var exampleRoutes = require("./routes/example");
var calendarRoutes = require("./routes/calendar");
var employeesRoutes = require("./routes/employees");
var pendingSupervisor = require("./routes/coverrequests");
var loginRoutes = require("./routes/login");

var cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/example", exampleRoutes);
app.use("/", calendarRoutes);
app.use("/", employeesRoutes);
app.use("/", pendingSupervisor);
app.use("/", loginRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
