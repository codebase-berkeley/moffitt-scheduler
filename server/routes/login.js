var express = require("express");
var router = express.Router();

var pool = require("../db/db");

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
      res.json({ successful: false });
      console.log("email doesnt exist");
    } else if (result.rows[0]["password"] == password) {
      console.log("true");
      res.json({ successful: true });
    } else {
      console.log("false");
      res.json({ successful: false });
    }
  });
});
module.exports = router;
