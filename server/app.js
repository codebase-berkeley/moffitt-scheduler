var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var exampleRoutes = require("./routes/example");
var employeesRoutes = require("./routes/employees");

var cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/example", exampleRoutes);
app.use("/", employeesRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
