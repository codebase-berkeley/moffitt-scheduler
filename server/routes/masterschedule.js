var express = require("express");
var router = express.Router();
var config = require("./config");

var pool = require("../db/db");

router.get("/masterschedule", function (req, res) {
  pool.query(
    "SELECT name, start_time, end_time, location FROM shifts, sle WHERE id=sle_id ",
    (error, result) => {
      if (error) {
        throw error;
      }
      return res.json({ items: result.rows });
    }
  );
});

router.get("/generatesched", function (req, res) {
  pool.query(
    "SELECT * from AVAILABILITY inner join SLE on AVAILABILITY.sle_id = SLE.id",
    (error, result) => {
      if (error) {
        throw error;
      }
      var employeeList = [];
      var weekdayMap = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
      for (let i = 0; i < result.rows.length; i += 1) {
        let idExists = false;
        let currEmployee = null;
        for (let j = 0; j < employeeList.length; j += 1) {
          if (employeeList[j].id == result.rows[i].id) {
            idExists = true;
            currEmployee = employeeList[j];
            break;
          }
        }
        //ASSUMING AVAILABILITY TABLE START_TIME = 30MIN SHIFTS
        if (idExists) {
          currEmployee.avails.push({
            day: weekdayMap[result.rows[i].day_of_week],
            slot: result.rows[i].start_time,
          });
        } else {
          employeeList.push({
            id: result.rows[i].id,
            tMoffitt3: result.rows[i].training_level_moffitt,
            tMoffitt4: null, //NOT IN DATABASE ?
            tMain: result.rows[i].training_level_doe,
            avails: [
              {
                day: weekdayMap[result.rows[i].day_of_week],
                slot: result.rows[i].start_time,
              },
            ],
          });
        }
      }
      return res.json({ items: employeeList });
    }
  );
});

module.exports = router;
