var express = require("express");
var router = express.Router();
var pool = require("../db/db");
var utils = require("./utils");

router.post("/getmaster", (req, res) => {
  var firstDay = req.body.week;

  getSchedule(firstDay).then(schedule => res.json({ schedule: schedule }));
});

async function getSchedule(firstDay) {
  var schedule = utils.getBlankSchedule();

  var lastDay = new Date(firstDay);
  lastDay.setDate(lastDay.getDate() + 6);

  var result = await pool.query(
    "SELECT date, time, location, sle.name as emp_name, sle.id as emp_id FROM shifts INNER JOIN sle on sle_id=sle.id WHERE date >= $1 and date <= $2",
    [firstDay, lastDay]
  );

  for (let i = 0; i < result.rows.length; i++) {
    let r = result.rows[i];
    let day = utils.abbrevs[r.date.getDay()];
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

  applySchedule(schedule, week).then(() => {
    getSchedule(week).then(schedule => {
      res.json({ schedule: schedule });
    });
  });
});

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
      date.setDate(date.getDate() + utils.abbrevToIndex[r.day]);
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

router.post("/updatemaster", (req, res) => {
  updateSchedule(
    req.body.date,
    req.body.time,
    req.body.library,
    req.body.assigned
  ).then(res.json({ successful: true }));
});

async function updateSchedule(date, time, library, employees) {
  try {
    await pool.query("BEGIN");
    await pool.query(
      "DELETE FROM shifts WHERE date=$1 AND time=$2 AND location=$3",
      [date, time, library]
    );
    for (let i = 0; i < employees.length; i++) {
      await pool.query(
        "INSERT INTO shifts(sle_id, location, cover_requested, date, time) VALUES ($1, $2, false, $3, $4)",
        [employees[i].id, library, date, time]
      );
    }

    await pool.query("COMMIT");
  } catch (e) {
    console.error(e.stack);
    await client.query("ROLLBACK");
  }
}

module.exports = router;
