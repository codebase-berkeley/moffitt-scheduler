var express = require("express");
var router = express.Router();

var pool = require("../db/db");

var abbrevs = {
  Monday: "mon",
  Tuesday: "tue",
  Wednesday: "wed",
  Thursday: "thu",
  Friday: "fri",
  Saturday: "sat",
  Sunday: "sun"
};

var revAbbrevs = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday"
};

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

var libraries = ["moffitt3", "moffitt4", "main"];

var blankSchedule = {
  moffitt3: {
    sun: {},
    mon: {},
    tue: {},
    wed: {},
    thu: {},
    fri: {},
    sat: {}
  },
  moffitt4: {
    sun: {},
    mon: {},
    tue: {},
    wed: {},
    thu: {},
    fri: {},
    sat: {}
  },
  main: {
    sun: {},
    mon: {},
    tue: {},
    wed: {},
    thu: {},
    fri: {},
    sat: {}
  }
};

for (var l = 0; l < libraries.length; l++) {
  var library = libraries[l];
  for (var d = 0; d < days.length; d++) {
    var day = abbrevs[days[d]];
    for (t = 0; t < 24; t += 0.5) {
      blankSchedule[library][day][t] = [];
    }
  }
}
router.get("/loadschedule/:schedule", (req, res) => {
  var schedule = JSON.parse(JSON.stringify(blankSchedule));

  pool.query(
    "select schedules.name, day, time, library, sle.name as emp_name, sle.id as emp_id from schedules INNER JOIN sle on employee=sle.id WHERE schedules.name=$1",
    [req.params.schedule],
    (err, result) => {
      if (err) {
        return schedule;
      }

      for (var i = 0; i < result.rows.length; i++) {
        var row = result.rows[i];
        schedule[row.library][row.day][row.time].push({
          name: row.emp_name,
          id: row.emp_id
        });
      }
      return res.json({ schedule: schedule });
    }
  );
});

router.post("/saveschedule/:schedule", (req, res) => {
  saveSchedule(req.params.schedule, req.body.schedule).then(
    res.json({ successful: true })
  );
});

async function saveSchedule(scheduleName, schedule) {
  try {
    await pool.query("BEGIN");
    await pool.query("DELETE FROM schedules where name=$1", [scheduleName]);

    for (var l = 0; l < libraries.length; l++) {
      var library = libraries[l];
      for (var d = 0; d < days.length; d++) {
        var abbrev = abbrevs[days[d]];
        for (var t = 0; t < 24; t += 0.5) {
          for (var e = 0; e < schedule[library][abbrev][t].length; e++) {
            await pool.query(
              "INSERT INTO schedules(name, day, time, library, employee) VALUES ($1, $2, $3, $4, $5)",
              [
                scheduleName,
                abbrev,
                t,
                library,
                schedule[library][abbrev][t][e].id
              ]
            );
          }
        }
      }
    }
    await pool.query("COMMIT");
  } catch (e) {
    console.error(e.stack);
    await client.query("ROLLBACK");
  }
}

module.exports = router;
