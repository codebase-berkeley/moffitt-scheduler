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

var abbrevs = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

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

var libraries = ["moffitt3", "moffitt4", "main"];

for (var l = 0; l < libraries.length; l++) {
  var library = libraries[l];
  for (var d = 0; d < abbrevs.length; d++) {
    var day = abbrevs[d];
    for (t = 0; t < 24; t += 0.5) {
      blankSchedule[library][day][t] = [];
    }
  }
}

router.post("/getmaster", (req, res) => {
  var firstDay = req.body.week;

  getSchedule(firstDay).then(schedule => res.json({ schedule: schedule }));
});

async function getSchedule(firstDay) {
  var schedule = JSON.parse(JSON.stringify(blankSchedule));

  var lastDay = new Date(firstDay);
  lastDay.setDate(lastDay.getDate() + 6);

  var result = await pool.query(
    "SELECT date, time, location, sle.name as emp_name, sle.id as emp_id FROM shifts INNER JOIN sle on sle_id=sle.id WHERE date >= $1 and date <= $2",
    [firstDay, lastDay]
  );

  for (let i = 0; i < result.rows.length; i++) {
    let r = result.rows[i];
    let day = abbrevs[r.date.getDay()];
    schedule[r.location][day][r.time].push({
      name: r.emp_name,
      id: r.emp_id
    });
  }

  return schedule;
}

router.post("/applysched/:schedule", (req, res) => {
  var week = req.body.week;
  var schedule = req.params.schedule;

  applySchedule(schedule, week).then();
});

var abbrevToIndex = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6
};

var abbrevs = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

async function applySchedule(scheduleName, firstDay) {
  var lastDay = new Date(firstDay);
  lastDay.setDate(lastDay.getDate() + 6);

  try {
    await pool.query("BEGIN");
    await pool.query("DELETE FROM shifts WHERE date >= $1 and date <= $2", [
      firstDay,
      lastDay
    ]);
    var schedule = await pool.query("SELECT * FROM schedules WHERE name=$1", [
      scheduleName
    ]);

    for (let i = 0; i < schedule.rows.length; i++) {
      let r = schedule.rows[i];
      var date = new Date(firstDay);
      date.setDate(date.getDate() + abbrevToIndex[r.day]);
      await pool.query(
        "INSERT INTO shifts(sle_id, location, cover_requested, date, time) VALUES ($1, $2, false, $3, $4)",
        [r.employee, r.library, date, r.time]
      );
    }
    await pool.query("COMMIT");
  } catch (e) {
    console.error(e.stack);
    await client.query("ROLLBACK");
  }
}

module.exports = router;
