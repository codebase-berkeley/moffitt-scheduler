var express = require("express");
var router = express.Router();
const crypto = require("crypto");
var pool = require("../db/db");
var passport = require("../passport");

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err || !user) {
      console.log("There is not a valid user");
      return res.json({ successful: false, isSupervisor: false });
    }
    req.logIn(user, function (err) {
      console.log("There is a valid user");
      console.log(user);
      if (err) {
        console.log("If there is a valid user why is this reached? Why error?");
        return res.json({ successful: false, isSupervisor: false });
      }
      console.log("This statement should happen");
      return res.json({ successful: true });
    });
  })(req, res, next);
});

module.exports = router;
