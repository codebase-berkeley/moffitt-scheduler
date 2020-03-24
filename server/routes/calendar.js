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

router.post("/staticcalendar", function(req, res) {
  let shifts = req.body.items;
  pool.query("SELECT * FROM SHIFTS", (error, result) => {
    if (error) {
      throw error;
    }
    for (var i = 0; i < 168; i += 1) {
      for (var j = 0; j < result.rows.length; j += 1) {
        let currentRow = result.rows[j];
        let sameStartEndValid =
          shifts[i].day == currentRow.start_time.getDay() &&
          shifts[i].start >= currentRow.start_time.getHours() &&
          shifts[i].end <= currentRow.end_time.getHours();
        let diffStartEndValid =
          currentRow.start_time.getDay() != currentRow.end_time.getDay() &&
          ((shifts[i].day == currentRow.start_time.getDay() &&
            shifts[i].start >= currentRow.start_time.getHours()) ||
            (shifts[i].day == currentRow.end_time.getDay() &&
              shifts[i].end <= currentRow.end_time.getHours()));
        if (sameStartEndValid || diffStartEndValid) {
          shifts[i].id = currentRow.shift_id;
          if (currentRow.location == "Moffitt") {
            shifts[i].color = "#FFA1A1";
          } else if (currentRow.location == "Doe") {
            shifts[i].color = "#b0e9c2";
          }
        }
      }
    }
    return res.json({ shifts: shifts });
  });
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
