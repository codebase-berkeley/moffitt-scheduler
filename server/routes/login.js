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

router.post("/login", function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  const text2 = "SELECT password FROM sle WHERE email = $1";
  const values2 = [email];

  pool.query(text2, values2, (error, result) => {
    if (error) {
      console.log(error);
      console.log("nothing");
      //throw error;
    } else if (result.rows.length == 0) {
      res.json({ Successful: false });
      console.log("email doesnt exist");
    } else if (result.rows[0]["password"] == password) {
      console.log("true");
      res.json({ Successful: true });
    } else {
      console.log("false");
      res.json({ Successful: false });
    }
  });
});
module.exports = router;
