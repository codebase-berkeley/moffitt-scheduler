var express = require("express");
var router = express.Router();

function randomSchedule() {
  var a = new Array(24);
  for (var i = 0; i <= 23; i += 1) {
    a[i] = new Array(7);
  }
  for (var row = 0; row <= 23; row++) {
    for (var col = 0; col <= 6; col++) {
      a[row][col] = "#f8f8f8";
    }
  }
  for (var r = 0; r <= 5; r++) {
    a[r][0] = "pink";
  }
  return a;
}

var schedule = randomSchedule();

router.get("/staticcalendar", function(req, res) {
  console.log("in backend");
  res.json({ schedule: schedule });
});

router.get("/age", function(req, res) {
  console.log("In /age");
  return res.json({ age: 21 });
});

module.exports = router;
