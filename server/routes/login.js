var express = require("express");
var router = express.Router();
const crypto = require("crypto");
var pool = require("../db/db");
var passport = require("../passport");

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err || !user) {
      return res.json({ isSupervisor: false, isSle: false });
    }

    req.logIn(user, function (err) {
      if (err) {
        return res.json({ isSupervisor: false, isSle: false });
      }
      if (user.id === 0) {
        return res.json({ isSupervisor: true, isSle: false });
      } else {
        return res.json({ isSupervisor: false, isSle: true, id: user.id });
      }
    });
  })(req, res, next);
});

router.get("/logout", function (req, res) {
  req.logOut();
  res.clearCookie("connect.sid");
  return res.json({ logout: true });
});

router.get("/homepage", function (req, res) {
  if (!req.user) {
    return res.json({ user: null });
  } else {
    return res.json({ user: req.user });
  }
});

module.exports = router;