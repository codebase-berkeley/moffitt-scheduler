var express = require("express");
var router = express.Router();

router.post("/login", function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  console.log("email", email);
  console.log("password", password);
  res.json({ Successful: true });
});

module.exports = router;
