var express = require("express");
var router = express.Router();
const crypto = require("crypto");
var pool = require("../db/db");
var passport = require("../passport");

function converter(password, salt) {
  return crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`)
    .substring(0, 39);
}

router.post("/login", function (req, res, next) {
  console.log(user);
  passport.authenticate("local", function (err, user, info) {
    console.log("where tf is the above statement going");
    console.log(user);
    if (err || !user) {
      return res.json({ successful: false });
    }

    req.logIn(user, function (err) {
      if (err) {
        return res.json({ successful: false });
      }

      return res.json({ successful: true });
    });
  })(req, res, next);
});

module.exports = router;
