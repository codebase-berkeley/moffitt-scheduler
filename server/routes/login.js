var express = require("express");
var router = express.Router();
const crypto = require("crypto");
var pool = require("../db/db");
var passport = require("../passport");

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err || !user) {
      console.log("no user");
      return res.json({ successful: false, isSupervisor: false, isSle: null });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.json({ successful: false });
      }
      if (user.id == 0) {
        return res.json({ successful: true, isSupervisor: true });
      } else {
        return res.json({ successful: true, isSle: true, id: user.id });
      }
    });
  })(req, res, next);
});

router.get("/logout", function (req, res) {
  req.logOut();
  res.clearCookie("connect.sid");
  return res.json({ logout: true });
});

module.exports = router;
