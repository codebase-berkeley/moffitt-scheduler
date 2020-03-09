var express = require("express");
var router = express.Router();

var pool = require("../db/db");

router.post("/save", (req, res) => {
  items = req.body.items;
  console.log(items);
  pool.query("DELETE FROM AVAILABILITY", (error, result) => {
    if (error) {
      throw error;
    }
  });
  for (var i = 0; i < items.length; i += 1) {
    pool.query(
      `INSERT INTO AVAILABILITY (sle_id, start_time, day_of_week) VALUES (${1}, ${
        items[i][0]
      }, ${items[i][1]})`,
      (error, result) => {
        if (error) {
          throw error;
        }
      }
    );
  }
  return res.json({ schedule: items });
});

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
  return res.json({ schedule: schedule });
});

router.get("/age", function(req, res) {
  console.log("In /age");
  return res.json({ age: 21 });
});

router.post("/save", (req, res) => {
  items = req.body.items;
  console.log(items);
  return res.json({ schedule: items });
});

router.get("/shifts", function(req, res) {
  pool.query("SELECT * FROM SHIFTS", (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result.rows);
  });
});

module.exports = router;
