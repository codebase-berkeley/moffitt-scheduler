var express = require("express");
var router = express.Router();

var pool = require("../db/db");

router.post("/login", function(req, res) {
  var email = req.body.email.trim();
  var password = req.body.password;
  var sleID;

  const sleSelect = "SELECT id, password FROM sle WHERE email = $1";
  const supSelect = "SELECT id, password FROM supervisor WHERE email = $1";
  const values2 = [email];

  pool.query(sleSelect, values2, (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    } else if (result.rows.length == 0) {
      console.log("sle email doesnt exist");
      pool.query(supSelect, values2, (error, result) => {
        if (error) {
          console.log(error);
          throw error;
        } else if (result.rows.length == 0) {
          res.json({ isSupervisor: false });
          console.log("sup email doesnt exist");
        } else if (result.rows[0]["password"] == password) {
          console.log("sup true");
          res.json({ isSupervisor: true });
        } else {
          console.log("sup false");
          res.json({ isSupervisor: false });
        }
      });
    } else if (result.rows[0]["password"] == password) {
      console.log("sle true");
      sleID = result.rows[0]["id"];
      res.json({ isSle: sleID });
    } else {
      console.log("sle false");
      pool.query(supSelect, values2, (error, result) => {
        if (error) {
          console.log(error);
          throw error;
        } else if (result.rows.length == 0) {
          res.json({ isSupervisor: false });
          console.log("sup email doesnt exist");
        } else if (result.rows[0]["password"] == password) {
          console.log("sup true");
          res.json({ isSupervisor: true });
        } else {
          console.log("sup false");
          res.json({ isSupervisor: false });
        }
      });
    }
  });
});
module.exports = router;
