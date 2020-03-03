var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var exampleRoutes = require("./routes/example");
var calendarRoutes = require("./routes/calendar");
var shiftRoutes = require("./routes/shifts");

var cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/example", exampleRoutes);
app.use("/", calendarRoutes);
app.use("/", shiftRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
