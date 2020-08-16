var express = require("express");
var router = express.Router();

var pool = require("../db/db");
var utils = require("./utils");

router.get("/loadschedule/:schedule", (req, res) => {
  var schedule = utils.getBlankSchedule();

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

    for (var l = 0; l < utils.libraries.length; l++) {
      var library = utils.libraries[l];
      for (var d = 0; d < utils.abbrevs.length; d++) {
        var abbrev = utils.abbrevs[d];
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

router.get("/schedules", (req, res) => {
  pool.query("SELECT DISTINCT name FROM schedules", (err, result) => {
    if (err) {
      console.error(err.stack);
    }

    var schedules = [];
    for (let i = 0; i < result.rows.length; i++) {
      schedules.push(result.rows[i].name);
    }

    return res.json({ schedules: schedules });
  });
});

router.get("/deleteschedule/:schedule", (req, res) => {
  pool.query(
    "DELETE FROM schedules WHERE name=$1",
    [req.params.schedule],
    (err, result) => {
      if (err) {
        console.error(err.stack);
      }

      return res.json({ successful: true });
    }
  );
});

module.exports = router;
