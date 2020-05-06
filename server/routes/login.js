var express = require("express");
var router = express.Router();
const crypto = require("crypto");
var pool = require("../db/db");

function converter(password, salt) {
  return crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`)
    .substring(0, 39);
}

router.post("/login", function (req, res) {
  var email = req.body.email.trim();
  var password = req.body.password;
  var sleID;

  const sleSelect = "SELECT id, password, salt FROM sle WHERE email = $1";
  const supSelect =
    "SELECT id, password, salt FROM supervisor WHERE email = $1";
  const values2 = [email];
  pool.query(sleSelect, values2, (error, result) => {
    // console.log(sleSelect);
    // console.log(supSelect);
    if (error) {
      throw error;
    } else if (result.rows.length == 0) {
      pool.query(supSelect, values2, (error, result) => {
        console.log("Case 1");
        if (error) {
          res.json({ isSupervisor: false });
        } else if (result.rows.length == 0) {
          res.json({ isSupervisor: false });
        } else if (
          result.rows[0]["password"] ==
          converter(password, result.rows[0]["salt"])
        ) {
          res.json({ isSupervisor: true });
        } else {
          res.json({ isSupervisor: false });
        }
      });
    } else if (
      result.rows[0]["password"] == converter(password, result.rows[0]["salt"])
    ) {
      console.log("Case 2");
      sleID = result.rows[0]["id"];
      res.json({ isSle: sleID });
    } else {
      console.log("Case 3");
      pool.query(supSelect, values2, (error, result) => {
        if (error) {
          res.json({ isSupervisor: false });
        } else if (result.rows.length == 0) {
          res.json({ isSupervisor: false });
        } else if (
          result.rows[0]["password"] ==
          converter(password, result.rows[0]["salt"])
        ) {
          res.json({ isSupervisor: true });
        } else {
          res.json({ isSupervisor: false });
        }
      });
    }
  });
});
module.exports = router;
