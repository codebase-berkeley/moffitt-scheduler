var express = require("express");
var router = express.Router();

var utils = require("./utils");

var pool = require("../db/db");

router.post("/yourshifts", (req, res) => {
  if (!req.user || req.user.is_sup) {
    return res.json({ noAuth: true });
  }

  var userId = req.user.id;
  var firstDay = req.body.week;
  var lastDay = new Date(firstDay);
  lastDay.setDate(lastDay.getDate() + 6);

  var schedule = utils.getBlankSleSchedule("none");

  pool.query(
    "SELECT * FROM shifts WHERE sle_id=$1 AND date >= $2 and date <= $3 and (cover_requested=false or sup_status is null or sup_status != 'approved')",
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

      pool.query(
        "SELECT * FROM shifts WHERE coverer_id=$1 AND date >= $2 and date <= $3 and sup_status='approved'",
        [userId, firstDay, lastDay],
        (err, result) => {
          if (err) {
            console.error(err.stack);
          }

          for (let i = 0; i < result.rows.length; i++) {
            let r = result.rows[i];
            schedule[utils.abbrevs[r.date.getDay()]][r.time] = r.location;
          }

          return res.json({ schedule: schedule });
        }
      );
    }
  );
});

router.post("/requestcover", (req, res) => {
  if (!req.user || req.user.is_sup) {
    return res.json({ noAuth: true });
  }

  var reason = req.body.reason;
  var userId = req.user.id;
  var date = req.body.date;
  var time = req.body.time;

  pool.query(
    "UPDATE shifts SET cover_requested=true, notes=$1, sup_status=null WHERE date=$2 AND time=$3 AND sle_id=$4",
    [reason, date, time, userId],
    (err, result) => {
      return res.json({ successful: true });
    }
  );
});

router.post("/openshifts", (req, res) => {
  if (!req.user || req.user.is_sup) {
    return res.json({ noAuth: true });
  }

  var userId = req.user.id;
  var firstDay = req.body.week;
  var lastDay = new Date(firstDay);
  lastDay.setDate(lastDay.getDate() + 6);

  var schedule = utils.getBlankSleSchedule({ location: "none", shift: null });

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
  if (!req.user || req.user.is_sup) {
    return res.json({ noAuth: true });
  }

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
  if (!req.user || req.user.is_sup) {
    return res.json({ noAuth: true });
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

class Shift {
  constructor(color, id, start, end, day, sleid, location) {
    this.color = color;
    this.id = id;
    this.start = start;
    this.end = end;
    this.day = day;
    this.sleid = sleid;
  }
}

function initialShifts() {
  let a = [];
  for (var i = 0; i < 336; i += 1) {
    a.push(new Shift("rgb(248, 248, 248)", null, null, null, null, null, null));
  }
  let count = 0;
  for (var i = 0; i <= 23; i += 0.5) {
    for (var j = 0; j <= 6; j += 1) {
      a[count].start = i;
      a[count].end = i + 0.5;
      a[count].day = j;
      count += 1;
    }
  }
  return a;
}

router.get("/availability", (req, res) => {
  if (!req.user || req.user.is_sup) {
    return res.json({ noAuth: true });
  }

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
