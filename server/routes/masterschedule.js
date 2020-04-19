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
    console.log("resulting rows", result.rows);
    if (error) {
      throw error;
    }
    return res.json({ allEmployees: result.rows });
  });
});

router.post("/removeemployee", (req, res) => {
  var shiftId = req.body.shiftId;
  var sleId = req.body.sleId;
  var currHour = req.body.currHour;

  pool.query(
    "SELECT start_time, end_time FROM shifts WHERE shift_id = $1",
    [shiftId],
    (error, result) => {
      if (error) {
        throw error;
      }

      var startTimeObj = result.rows[0]["start_time"];
      var endTimeObj = result.rows[0]["end_time"];
      var currTimeObj = new Date(startTimeObj.getTime()).setHours(
        currHour,
        0,
        0,
        0
      );
      var startTime = startTimeObj.getHours();
      var endTime = endTimeObj.getHours();
      if (currHour != startTime) {
        //overnight
        if (currHour < startTime) {
          currTimeObj = new Date(endTimeObj.getTime()).setHours(
            currHour,
            0,
            0,
            0
          );
          pool.query(
            `INSERT INTO AVAILABILITY (sle_id, location, start_time, end_time) VALUES (${sleId}, ${startTimeObj}, ${currTimeObj})`,
            (error, result) => {
              if (error) {
                throw error;
              }
            }
          );
        } //non-overnight
        else {
          pool.query(
            `INSERT INTO AVAILABILITY (sle_id, location, start_time, end_time) VALUES (${sleId}, ${startTimeObj}, ${currTimeObj})`,
            (error, result) => {
              if (error) {
                throw error;
              }
            }
          );
        }
      }
      var endCurrHour = (currHour + 1) % 24;
      var endCurrTimeObj = new Date(startTimeObj.getTime()).setHours(
        endCurrHour,
        0,
        0,
        0
      );
      if (endCurrHour != endTime) {
        //non-overnight
        if (endCurrHour < endTime) {
          pool.query(
            `INSERT INTO AVAILABILITY (sle_id, location, start_time, end_time) VALUES (${sleId}, ${endCurrTimeObj}, ${endTimeObj})`,
            (error, result) => {
              if (error) {
                throw error;
              }
            }
          );
        } //overnight
        else {
          endCurrTimeObj = new Date(endTimeObj.getTime()).setHours(
            endCurrHour,
            0,
            0,
            0
          );
          pool.query(
            `INSERT INTO AVAILABILITY (sle_id, location, start_time, end_time) VALUES (${sleId}, ${endCurrTimeObj}, ${endTimeObj})`,
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
});

module.exports = router;
