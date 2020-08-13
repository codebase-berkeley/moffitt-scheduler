var express = require("express");
var router = express.Router();

var utils = require("./utils");

var pool = require("../db/db");

router.post("/yourshifts", (req, res) => {
  var userId = req.user.id;
  var firstDay = req.body.week;
  var lastDay = new Date(firstDay);
  lastDay.setDate(lastDay.getDate() + 6);

  var schedule = utils.getBlankSleSchedule("none");

  pool.query(
    "SELECT * FROM shifts WHERE sle_id=$1 AND date >= $2 and date <= $3",
    [userId, firstDay, lastDay],
    (err, result) => {
      if (err) {
        console.error(err.stack);
      }

      for (let i = 0; i < result.rows.length; i++) {
        let r = result.rows[i];
        schedule[utils.abbrevs[r.date.getDay()]][r.time] = r.location;
        if (r.cover_requested) {
          schedule[utils.abbrevs[r.date.getDay()]][r.time] = "cover";
        }
      }

      return res.json({ schedule: schedule });
    }
  );
});

router.post("/requestcover", (req, res) => {
  var userId = req.user.id;
  var date = req.body.date;
  var time = req.body.time;

  pool.query(
    "UPDATE shifts SET cover_requested=true WHERE date=$1 AND time=$2 AND sle_id=$3",
    [date, time, userId],
    (err, result) => {
      return res.json({ successful: true });
    }
  );
});

router.post("/openshifts", (req, res) => {
  var userId = req.user.id;
  var firstDay = req.body.week;
  var lastDay = new Date(firstDay);
  lastDay.setDate(lastDay.getDate() + 6);

  var schedule = utils.getBlankSleSchedule("none");

  pool.query(
    "SELECT * FROM shifts WHERE sle_id != $1 AND date >= $2 and date <= $3 AND cover_requested=true AND coverer_id is null",
    [userId, firstDay, lastDay],
    (err, result) => {
      if (err) {
        console.error(err.stack);
      }

      for (let i = 0; i < result.rows.length; i++) {
        let r = result.rows[i];
        schedule[utils.abbrevs[r.date.getDay()]][r.time] = {
          location: r.location,
          shift: r.shift_id
        };
      }

      return res.json({ schedule: schedule });
    }
  );
});

router.post("/covershift", (req, res) => {
  var userId = req.user.id;
  var shiftId = req.body.shiftId;

  pool.query(
    "UPDATE shifts SET coverer_id=$1, sup_status='pending' WHERE shift_id=$2",
    [userId, shiftId],
    (err, result) => {
      return res.json({ successful: true });
    }
  );
});

router.post("/save", (req, res) => {
  if (!req.user) {
    return res.json({ schedule: null });
  }

  items = req.body.items;
  var userId = req.user.id;
  pool.query(
    "DELETE FROM AVAILABILITY WHERE sle_id=$1",
    [userId],
    (error, result) => {
      if (error) {
        throw error;
      }
    }
  );
  for (var i = 0; i < items.length; i += 1) {
    pool.query(
      `INSERT INTO AVAILABILITY (sle_id, start_time, day_of_week) VALUES (${userId}, ${items[i].start}, ${items[i].day})`,
      (error, result) => {
        if (error) {
          throw error;
        }
      }
    );
  }
  return res.json({ schedule: items });
});

router.get("/availability", (req, res) => {
  if (!req.user) {
    return res.json({ schedule: null });
  }

  var userId = req.user.id;

  var selected = initialShifts();

  pool.query(
    `SELECT start_time, day_of_week FROM AVAILABILITY 
     WHERE sle_id = $1`,
    [userId],
    (error, result) => {
      if (error) {
        throw error;
      } else {
        for (var r = 0; r < result.rows.length; r++) {
          for (var s = 0; s < selected.length; s++) {
            if (
              result.rows[r].day_of_week === selected[s].day &&
              result.rows[r].start_time === selected[s].start
            ) {
              selected[s].color = "rgb(176, 233, 194)";
            }
          }
        }
      }
      return res.json({ schedule: selected });
    }
  );
});

module.exports = router;
