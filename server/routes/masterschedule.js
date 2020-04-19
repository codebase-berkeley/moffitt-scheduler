var express = require("express");
var router = express.Router();

var pool = require("../db/db");

router.get("/masterschedule", function (req, res) {
  pool.query(
    "SELECT name, start_time, end_time, location, shift_id, sle_id FROM shifts, sle WHERE id=sle_id ",
    (error, result) => {
      if (error) {
        throw error;
      }
      return res.json({ items: result.rows });
    }
  );
});

router.get("/otheremployees", function (req, res) {
  pool.query("SELECT name, id FROM sle", (error, result) => {
    if (error) {
      throw error;
    }
    return res.json({ allEmployees: result.rows });
  });
});

router.post("/addemployee", (req, res) => {
  var sleId = parseInt(req.body.sleId);
  var currHour = parseInt(req.body.currHour);
  var currDate = new Date(req.body.currDate);
  var loc = req.body.loc;

  var endTime = new Date(currDate);
  endTime.setHours(currHour + 1, 0, 0, 0);

  pool.query(
    `INSERT INTO shifts (sle_id, location, start_time, end_time) VALUES (${sleId}, '${loc}', to_timestamp(${currDate.getTime()} / 1000.0), to_timestamp(${endTime.getTime()} / 1000.0))`,
    [],
    (error, result) => {
      if (error) {
        throw error;
      }
    }
  );
  return res.json({});
});

router.post("/removeemployee", (req, res) => {
  var shiftId = parseInt(req.body.shiftId);
  var sleId = parseInt(req.body.sleId);
  var currHour = parseInt(req.body.currHour);

  pool.query(
    "SELECT start_time, end_time, location FROM shifts WHERE shift_id = $1",
    [shiftId],
    (error, result) => {
      if (error) {
        throw error;
      }
      var startTimeObj = result.rows[0]["start_time"];
      var endTimeObj = result.rows[0]["end_time"];

      var startTime = startTimeObj.getHours();
      var endTime = endTimeObj.getHours();

      var loc = result.rows[0]["location"];

      var currTimeObj = new Date(startTimeObj.getTime());
      currTimeObj.setHours(currHour, 0, 0, 0);

      if (currHour != startTime) {
        //overnight
        if (currHour < startTime) {
          currTimeObj = new Date(endTimeObj.getTime());
          currTimeObj.setHours(currHour, 0, 0, 0);
          pool.query(
            `INSERT INTO shifts (sle_id, location, start_time, end_time) VALUES (${sleId}, '${loc}', to_timestamp(${startTimeObj.getTime()} / 1000.0), to_timestamp(${currTimeObj.getTime()} / 1000.0))`,
            (error, result) => {
              if (error) {
                throw error;
              }
            }
          );
        } //non-overnight
        else {
          pool.query(
            `INSERT INTO shifts (sle_id, location, start_time, end_time) VALUES (${sleId}, '${loc}', to_timestamp(${startTimeObj.getTime()} / 1000.0), to_timestamp(${currTimeObj.getTime()} / 1000.0))`,
            (error, result) => {
              if (error) {
                throw error;
              }
            }
          );
        }
      }
      var endCurrHour = (currHour + 1) % 24;
      var endCurrTimeObj = new Date(startTimeObj.getTime());
      endCurrTimeObj.setHours(endCurrHour, 0, 0, 0);

      if (endCurrHour != endTime) {
        //non-overnight
        if (endCurrHour < endTime) {
          pool.query(
            `INSERT INTO shifts (sle_id, location, start_time, end_time) VALUES (${sleId}, '${loc}', to_timestamp(${endCurrTimeObj.getTime()} / 1000.0), to_timestamp(${endTimeObj.getTime()} / 1000.0))`,
            (error, result) => {
              if (error) {
                throw error;
              }
            }
          );
        } //overnight
        else {
          endCurrTimeObj = new Date(endTimeObj.getTime());
          endCurrTimeObj.setHours(endCurrHour, 0, 0, 0);

          pool.query(
            `INSERT INTO shifts (sle_id, location, start_time, end_time) VALUES (${sleId}, '${loc}', to_timestamp(${endCurrTimeObj.getTime()} / 1000.0), to_timestamp(${endTimeObj.getTime()} / 1000.0))`,
            (error, result) => {
              if (error) {
                throw error;
              }
            }
          );
        }
      }
    }
  );

  pool.query(
    "DELETE FROM shifts WHERE shift_id = $1",
    [shiftId],
    (error, result) => {
      if (error) {
        throw error;
      }
    }
  );
  return res.json({});
});

module.exports = router;
