var express = require("express");
var router = express.Router();

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "miW478facabbghy78",
  host: "127.0.0.1",
  database: "moffitt",
  port: 5432
});

router.post("/employees", function(req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  console.log("firstName", firstName);
  console.log("lastName", lastName);
  console.log("working");
  res.json({ Successful: true });

  const text =
    "INSERT INTO sle (name, training_level_doe, training_level_moffitt, email, password) VALUES ($1, $2, $3, $4, $5)";
  const values = [firstName, 1, 1, null, null];

  pool.query(text, values, (error, result) => {
    if (error) {
      // throw error;
      console.log(error);
    }
    console.log(result);
    console.log("insidequery");
  });
});

// router.get("/age", function(req, res) {
//   console.log("In /age");
//   return res.json({ age: 21 });
// });

module.exports = router;

// pool.query("SELECT * FROM sle", (error, result) => {
//   if (error) {
//     throw error;
//   }
