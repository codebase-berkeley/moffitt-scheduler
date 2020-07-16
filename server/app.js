var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var calendarRoutes = require("./routes/calendar");
var coverRequestRoutes = require("./routes/coverrequests");
var employeesRoutes = require("./routes/employees");
var loginRoutes = require("./routes/login");
var masterScheduleRoutes = require("./routes/masterschedule");
var passport = require("./passport");
var cors = require("cors");
var path = require("path");

var session = require("express-session");
const MongoStore = require("connect-mongo")(session);

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(require("cookie-parser")());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// In production, just use the in memory store. In
// development use mongo so that sessions persist through changes
if (true || process.env.PRODUCTION === "true") {
  app.use(
    session({
      secret: "keyboard cat",
      resave: true,
      saveUninitialized: true
    })
  );
} else {
  app.use(
    session({
      secret: "foo",
      store: new MongoStore({ url: "mongodb://localhost/mofsess:27017" }),
      resave: true,
      saveUninitialized: true
    })
  );
}

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "build")));

app.use("/api", calendarRoutes);
app.use("/api", coverRequestRoutes);
app.use("/api", employeesRoutes);
app.use("/api", loginRoutes);
app.use("/api", masterScheduleRoutes);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

var port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Listening on port: " + port);
});
