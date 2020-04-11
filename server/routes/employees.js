var express = require("express");
var router = express.Router();

var pool = require("../db/db");

router.post("/employees", function (req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var m3lev = req.body.moffitt3Level;
  var m4lev = req.body.moffitt4Level;
  var dlev = req.body.doeLevel;
  console.log("firstName", firstName);
  console.log("lastName", lastName);
  console.log("email", email);
  res.json({ successful: true });
  const text =
    "INSERT INTO sle (name, training_level_doe, training_level_moffitt3, email, password, training_level_moffitt4) VALUES ($1, $2, $3, $4, $5, $6)";
  const values = [firstName + " " + lastName, dlev, m3lev, email, null, m4lev];

  pool.query(text, values, (error, result) => {
    if (error) {
      console.log(error);
    }
    console.log(result);
  });
});

module.exports = router;

router.get("/allemployees", (req, res) => {
  pool.query(`SELECT * FROM SLE;`, (error, result) => {
    if (error) {
      throw error;
    } else {
      for (var i = 0; i < result.rows.length; i++) {
        result.rows[i].moffitt3TrainingLevel = result.rows[
          i
        ].training_level_moffitt3.toString();
        result.rows[i].moffitt4TrainingLevel = result.rows[
          i
        ].training_level_moffitt4.toString();
        result.rows[i].doeTrainingLevel = result.rows[
          i
        ].training_level_doe.toString();
        if (result.rows[i].training_level_moffitt3 != 0) {
          result.rows[i].currentDisplayMoffitt3 = "moffitt3Display";
        } else {
          result.rows[i].currentDisplayMoffitt3 = "moffitt3NoDisplay";
        }
        if (result.rows[i].training_level_moffitt4 != 0) {
          result.rows[i].currentDisplayMoffitt4 = "moffitt4Display";
        } else {
          result.rows[i].currentDisplayMoffitt4 = "moffitt4NoDisplay";
        }
        if (result.rows[i].training_level_doe != 0) {
          result.rows[i].currentDisplayDoe = "doeDisplay";
        } else {
          result.rows[i].currentDisplayDoe = "doeNoDisplay";
        }
      }
    }
    res.json({ items: result.rows });
  });
});
