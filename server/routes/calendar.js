var express = require("express");
var router = express.Router();

var savedAvails = [];
router.post("/save", (req, res) => {
  items = req.body.items;
  console.log(items);
  savedAvails = items;
  return res.json({ schedule: items });
});

var formattedSavedAvails = [];

router.get("/availability", function (req, res) {
  for (date in savedAvails) {
    let day_and_hour = [getDay(date), getHours(hour)];
    formattedSavedAvails.push(day_and_hour);
  }
  console.log(formattedSavedAvails);
  pool.query("DELETE FROM AVAILABILITY", (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result.rows);
  });
  pool.query(
    `INSERT INTO AVAILABILITY (sle_id, start_time, day_of_week) VALUES (${1}, ${
    formattedSavedAvails[0][0]
    }, ${formattedSavedAvails[0][1]})`,
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rows);
    }
  );
  pool.query("SELECT * FROM AVAILABILITY", (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result.rows);
  });
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

router.get("/staticcalendar", function (req, res) {
  console.log("in backend");
  res.json({ schedule: schedule });
});

router.get("/age", function (req, res) {
  console.log("In /age");
  return res.json({ age: 21 });
});

router.post("/save", (req, res) => {
  items = req.body.items;
  console.log(items);
  return res.json({ schedule: items });
});

module.exports = router;

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "3034538456",
  host: "127.0.0.1",
  database: "moffitt",
  port: 5432
});

router.get("/shifts", function (req, res) {
  pool.query("SELECT * FROM SHIFTS", (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result.rows);
  });
});
