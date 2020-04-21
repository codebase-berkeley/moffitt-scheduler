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
  items = req.body.items;
  var userId = req.body.userId;
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
      `INSERT INTO AVAILABILITY (sle_id, start_time, day_of_week) VALUES (${userId}, ${items[i][0]}, ${items[i][1]})`,
      (error, result) => {
        if (error) {
          throw error;
        }
      }
    );
  }
  return res.json({ schedule: items });
});

router.post("/staticcalendar/:userId", (req, res) => {
  let shifts = req.body.items;
  pool.query(
    "SELECT * FROM SHIFTS WHERE sle_id = $1",
    [req.params.userId],
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
            console.log(currentRow.cover_requested);
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
// router.get("/profilehours/:userId", (req, res) => {
//   var selected = [];
//   var curr_day = new Date();
//   var curr_week_sunday = curr_day.getDate() - curr_day.getDay();
//   var curr_week_saturday = curr_day.getDate() + (6 - curr_day.getDay());
//   pool.query(
//     `SELECT * FROM coverrequests, shifts
//      WHERE sle_id = $1 AND sle_id = coveree_id`,
//     [req.params.userId],
//     (error, result) => {
//       if (error) {
//         throw error;
//       } else {
//         let scheduledHoursPerWeek = 0;
//         let totalHoursWorker = 0;
//         let requestedShifts = 0;
//         for (var i = 0; i < result.rows.length; i++) {

//         }
//       }
//       return res.json({ schedule: selected });
//     }
//   );
// });

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

router.post("/openshifts/:userId", (req, res) => {
  let shifts = req.body.items;
  pool.query(
    "select * from coverrequests inner join shifts on coverrequests.shift_id = shifts.shift_id where coverer_id is not distinct from null and sle_id != $1",
    [req.body.userId],
    (error, result) => {
      if (error) {
        console.log(error);
        throw error;
      }
      let shiftid_to_color = {};
      for (var j = 0; j < result.rows.length; j += 1) {
        let currentRow1 = result.rows[j];
        if (!(currentRow1.shift_id in shiftid_to_color)) {
          shiftid_to_color[currentRow1.shift_id] = coverColors[j % 4];
        }
        for (var i = 0; i < 168; i += 1) {
          let sameStartEndValid =
            shifts[i].day == currentRow1.start_time.getDay() &&
            shifts[i].start >= currentRow1.start_time.getHours() &&
            shifts[i].end <= currentRow1.end_time.getHours();
          let diffStartEndValid =
            currentRow1.start_time.getDay() != currentRow1.end_time.getDay() &&
            ((shifts[i].day == currentRow1.start_time.getDay() &&
              shifts[i].start >= currentRow1.start_time.getHours()) ||
              (shifts[i].day == currentRow1.end_time.getDay() &&
                shifts[i].end <= currentRow1.end_time.getHours()));
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

router.post("/updateopenshifts", function (req, res) {
  let sleID = req.body.sleID;
  let shiftID = req.body.shiftID;
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
