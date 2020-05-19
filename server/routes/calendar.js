var express = require("express");
var router = express.Router();

var pool = require("../db/db");
router.post("/changecoverage", (req, res) => {
  var coverage = req.body.coverage;
  approve = true;
  var shiftID = req.body.shiftID;
  var notes = req.body.sentNotes;
  pool.query(
    "UPDATE shifts SET cover_requested = $1 WHERE shift_id = $2",
    [approve, shiftID],
    (error, result) => {
      if (error) {
        throw error;
      }
    }
  );
  pool.query(
    "SELECT sle_id FROM shifts WHERE shift_id = $1",
    [shiftID],
    (error, result) => {
      if (error) {
        throw error;
      }
      pool.query(
        "INSERT INTO coverrequests (coverer_id, coveree_id, shift_id, supervisor_status, notes) VALUES (null, $3, $1, null, $2)",
        [shiftID, notes, result.rows[0].sle_id],
        (error, result) => {
          if (error) {
            throw error;
          }
        }
      );
    }
  );
  return res.json({ Successful: true });
});

router.post("/save", (req, res) => {
  if (!req.user) {
    return res.json({ schedule: null });
  }

  items = req.body.items;
  var userId = req.user;
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

router.post("/staticcalendar", (req, res) => {
  if (!req.user) {
    return res.json({ shifts: null });
  } else {
    let currentUser;
    if (req.body.userId) {
      if (req.user != 0 && req.body.userId != req.user) {
        return res.json({ shifts: null });
      } else {
        currentUser = req.body.userId;
      }
    } else {
      currentUser = req.user;
    }
    let shifts = req.body.items;
    pool.query(
      "SELECT * FROM SHIFTS WHERE sle_id = $1",
      [currentUser],
      (error, result) => {
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
              if (currentRow.location == "Moffitt3") {
                if (currentRow.cover_requested == "true") {
                  shifts[i].color = "#C187D3";
                } else {
                  shifts[i].color = "#ff8d06";
                }
              } else if (currentRow.location == "Doe") {
                if (currentRow.cover_requested == "true") {
                  shifts[i].color = "#C187D3";
                } else {
                  shifts[i].color = "#d7269b";
                }
              } else if (currentRow.location == "Moffitt4") {
                if (currentRow.cover_requested == "true") {
                  shifts[i].color = "#C187D3";
                } else {
                  shifts[i].color = "#04b17e";
                }
              }
            }
          }
        }
        return res.json({ shifts: shifts });
      }
    );
  }
});

router.get("/shifts", function(req, res) {
  pool.query("SELECT * FROM SHIFTS", (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result.rows);
  });
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
  if (!req.user) {
    return res.json({ schedule: null });
  }

  var userId = req.user;

  console.log("userId", userId);

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
              result.rows[r].day_of_week == selected[s].day &&
              result.rows[r].start_time == selected[s].start
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

router.get("/totalhours/:userId", (req, res) => {
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff =
    now -
    start +
    (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  var oneDay = 1000 * 60 * 60 * 24;
  var currentDay = Math.floor(diff / oneDay);
  pool.query(
    `select * from shifts as a left join coverrequests as b on a.shift_id = b.shift_id and a.sle_id = b.coveree_id where (supervisor_status is null or supervisor_status = 'Denied') and sle_id = $1;
    `,
    [req.params.userId],
    (error, result) => {
      let allHours = 0;
      if (error) {
        throw error;
      } else {
        for (var i = 0; i < result.rows.length; i++) {
          var currentRow = result.rows[i].end_time;
          var startt = new Date(currentRow.getFullYear(), 0, 0);
          var difff =
            currentRow -
            startt +
            (startt.getTimezoneOffset() - currentRow.getTimezoneOffset()) *
              60 *
              1000;
          var oneDayy = 1000 * 60 * 60 * 24;
          var lastDay = Math.floor(difff / oneDayy);
          if (lastDay < currentDay) {
            let start_time = result.rows[i].start_time;
            let end_time = result.rows[i].end_time;
            let start_time_date = start_time.getDay();
            let end_time_date = start_time.getDay();
            let start_hour = start_time.getHours();
            let end_hour = end_time.getHours();
            if (start_time_date == end_time_date) {
              allHours = allHours + (end_hour - start_hour);
            } else {
              allHours = allHours + (24 - start_hour) + end_hour;
            }
          }
        }
      }
      return res.json({ totalhours: allHours });
    }
  );
});

router.get("/profilehours/:userId", (req, res) => {
  pool.query(
    `SELECT * FROM shifts
     WHERE sle_id = $1 AND cover_requested = $2`,
    [req.params.userId, true],
    (error, result) => {
      if (error) {
        throw error;
      } else {
      }
      return res.json({ profileHours: result.rows.length });
    }
  );
});

const coverColors = ["#ffff42", "#ffaf0f", "#ffc34d", "#4eb548"];

router.post("/openshifts", (req, res) => {
  let shifts = req.body.items;

  console.log("USERUSER:", req.user);
  pool.query(
    "select * from coverrequests inner join shifts on coverrequests.shift_id = shifts.shift_id where coverer_id is null and sle_id != $1",
    [req.user],
    (error, result) => {
      console.log("Length", result.rows.length);

      if (error) {
        console.log(error);
        throw error;
      }
      let wantedDates = [];
      for (var k = 0; k < result.rows.length; k++) {
        if (
          Date.parse(result.rows[k].start_time) >=
            Date.parse(req.body.startOfWeek) &&
          Date.parse(result.rows[k].start_time) < Date.parse(req.body.endOfWeek)
        ) {
          wantedDates.push(result.rows[k]);
        }
      }
      console.log("wantedDates", wantedDates);

      result.rows = wantedDates;
      let shiftid_to_color = {};
      for (var j = 0; j < result.rows.length; j += 1) {
        let currentRow1 = result.rows[j];
        if (!(currentRow1.shift_id in shiftid_to_color)) {
          shiftid_to_color[currentRow1.shift_id] = coverColors[j % 4];
        }
        console.log(currentRow1.start_time);
        for (var i = 0; i < 336; i += 1) {
          let sameStartEndValid =
            shifts[i].day == currentRow1.start_time.getDay() &&
            shifts[i].start >=
              currentRow1.start_time.getHours() * 2 +
                currentRow1.start_time.getMinutes() / 30 &&
            shifts[i].end <=
              currentRow1.end_time.getHours() * 2 +
                currentRow1.end_time.getMinutes() / 30;
          let diffStartEndValid =
            currentRow1.start_time.getDay() != currentRow1.end_time.getDay() &&
            ((shifts[i].day == currentRow1.start_time.getDay() &&
              shifts[i].start >=
                currentRow1.start_time.getHours() * 2 +
                  currentRow1.start_time.getMinutes() / 30) ||
              (shifts[i].day == currentRow1.end_time.getDay() &&
                shifts[i].end <=
                  currentRow1.end_time.getHours() * 2 +
                    currentRow1.end_time.getMinutes() / 30));
          if (sameStartEndValid || diffStartEndValid) {
            shifts[i].id = currentRow1.shift_id;
            shifts[i].color = shiftid_to_color[shifts[i].id];
            shifts[i].sleid = currentRow1.sle_id;
            shifts[i].location = currentRow1.location;
          }
        }
      }
      return res.json({ shifts: shifts });
    }
  );
});

router.post("/updateopenshifts", function(req, res) {
  let sleID = req.user;
  let shiftID = req.body.shiftID;

  console.log("shiftID", shiftID);
  console.log("sleID", sleID);
  pool.query(
    "update coverrequests set coverer_id = $1 where shift_id = $2",
    [sleID, shiftID],
    (error, result) => {
      if (error) {
        console.log(error);
        throw error;
      }
    }
  );
  return res.json({ successful: true });
});

module.exports = router;
