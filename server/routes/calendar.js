var express = require("express");
var router = express.Router();

var pool = require("../db/db");

router.post("/save", (req, res) => {
  items = req.body.items;
  var userId = req.body.userId;
  pool.query("DELETE FROM AVAILABILITY", (error, result) => {
    if (error) {
      throw error;
    }
  });
  for (var i = 0; i < items.length; i += 1) {
    pool.query(
<<<<<<< HEAD
      `INSERT INTO AVAILABILITY (sle_id, start_time, day_of_week) VALUES (${userId}, ${items[i][0]}, ${items[i][1]})`,
=======
      `INSERT INTO AVAILABILITY (sle_id, start_time, day_of_week) VALUES (${1}, ${
      items[i][0]
      }, ${items[i][1]})`,
>>>>>>> 8218f11c3d45dba30b39023f7274fed122829ac3
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

<<<<<<< HEAD
router.get("/staticcalendar", function(req, res) {
  return res.json({ schedule: schedule });
});

router.get("/age", function(req, res) {
=======
router.get("/staticcalendar", function (req, res) {
  console.log("in backend");
  return res.json({ schedule: schedule });
});

router.get("/age", function (req, res) {
  console.log("In /age");
>>>>>>> 8218f11c3d45dba30b39023f7274fed122829ac3
  return res.json({ age: 21 });
});

router.post("/save", (req, res) => {
  items = req.body.items;
  return res.json({ schedule: items });
});

router.get("/shifts", function (req, res) {
  pool.query("SELECT * FROM SHIFTS", (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result.rows);
  });
});

router.get("/availability/:userId", (req, res) => {
  var selected = [];
  var curr_day = new Date();
  var curr_week_sunday = curr_day.getDate() - curr_day.getDay();
  pool.query(
    `SELECT start_time AS t, day_of_week AS d FROM AVAILABILITY 
     WHERE sle_id = $1`,
    [req.params.userId],
    (error, result) => {
      if (error) {
        throw error;
      } else {
        for (var r = 0; r < result.rows.length; r++) {
          var row = result.rows[r];
          var t = result.rows[r].t;
          var d = result.rows[r].d;
          selected.push(
            new Date(
              curr_day.getFullYear(),
              curr_day.getMonth(),
              d + curr_week_sunday,
              t,
              0,
              0,
              0
            )
          );
        }
      }
      return res.json({ schedule: selected });
    }
  );
});

module.exports = router;
