var express = require("express");
var router = express.Router();

router.post("/employees", function(req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  console.log("firstName", firstName);
  console.log("lastName", lastName);
  console.log("working");
  res.json({ Successful: true });
  // res.send("Hi!");
});

// router.get("/age", function(req, res) {
//   console.log("In /age");
//   return res.json({ age: 21 });
// });

module.exports = router;
