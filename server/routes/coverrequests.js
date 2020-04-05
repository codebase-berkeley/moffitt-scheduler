var express = require("express");
var router = express.Router();

var pool = require("../db/db");

router.post("/pendingsupervisor", (req, res) => {
  var approve = req.body.approve;
  console.log("initial", approve);
  if (approve) {
    approve = "Approved";
  } else {
    approve = "Denied";
  }
  var requestID = req.body.requestID;
  console.log("requestID", requestID);
  pool.query(
    "UPDATE coverrequests SET supervisor_status = $1 WHERE request_id = $2",
    [approve, requestID],
    (error, result) => {
      if (error) {
        throw error;
      }
    }
  );
  if (approve === "Approved") {
    pool.query(
      `UPDATE shifts SET sle_id = coverer_id
    FROM coverrequests
    WHERE coverrequests.shift_id = shifts.shift_id`,
      (error, result) => {
        if (error) {
          throw error;
        }
      }
    );
  }

  console.log("approve", approve);
  res.json({ Successful: true });
});

router.get("/requesthistory", (req, res) => {
  pool.query(
    `SELECT s1.name AS covername, s2.name AS needname, supervisor_status AS approval, shifts.start_time AS time, shifts.location AS loc
    FROM coverrequests, sle AS s1, sle AS s2, shifts
    WHERE coverer_id = s1.id AND coveree_id = s2.id AND coverrequests.shift_id = shifts.shift_id AND (supervisor_status = 'Approved' OR supervisor_status = 'Denied')`,
    (error, result) => {
      if (error) {
        throw error;
      } else {
        for (var i = 0; i < result.rows.length; i++) {
          var day = result.rows[i].time.getDay();
          if (day == 0) {
            day = "Sunday, ";
          } else if (day == 1) {
            day = "Monday, ";
          } else if (day == 2) {
            day = "Tuesday, ";
          } else if (day == 3) {
            day = "Wednesday, ";
          } else if (day == 4) {
            day = "Thursday, ";
          } else if (day == 5) {
            day = "Friday, ";
          } else if (day == 6) {
            day = "Saturday, ";
          } else if (day == 7) {
            day = "Sunday, ";
          }
          var month = result.rows[i].time.getMonth();
          if (month == 1) {
            month = "January ";
          } else if (month == 2) {
            month = "February ";
          } else if (month == 3) {
            month = "March ";
          } else if (month == 4) {
            month = "April ";
          } else if (month == 5) {
            month = "May ";
          } else if (month == 6) {
            month = "June ";
          } else if (month == 7) {
            month = "July ";
          } else if (month == 8) {
            month = "August ";
          } else if (month == 9) {
            month = "September ";
          } else if (month == 10) {
            month = "October ";
          } else if (month == 11) {
            month = "November ";
          } else if (month == 12) {
            month = "December ";
          }
          var date = result.rows[i].time.getDate();
          var year = result.rows[i].time.getFullYear();
          var hour = result.rows[i].time.getHours();
          var min = result.rows[i].time.getMinutes();
          result.rows[i].desk = "Fourth Floor";
          result.rows[i].date = day + month + date + ", " + year;
          result.rows[i].time = hour + ":" + min + "0" + " AM"; //hardcoded for msd
        }
        console.log("result.rows:", result.rows);
        res.json({ items: result.rows });
      }
    }
  );
});

router.get("/pendingsupervisor", (req, res) => {
  pool.query(
    `SELECT s1.name AS covername, s2.name AS needname, supervisor_status AS approval, shifts.start_time AS time, 
    shifts.location AS loc, request_id AS requestid
    FROM coverrequests, sle AS s1, sle AS s2, shifts
    WHERE coverer_id = s1.id AND coveree_id = s2.id AND coverrequests.shift_id = shifts.shift_id AND supervisor_status = 'null'`,
    (error, result) => {
      if (error) {
        throw error;
      } else {
        console.log("pend super row length:", result.rows.length);
        console.log("pend super result.rows:", result.rows);
        for (var i = 0; i < result.rows.length; i++) {
          console.log("time", result.rows[i].time);
          result.rows[i].desk = "Fourth Floor";
          result.rows[i].date = result.rows[i].time.toDateString();
          result.rows[i].time = result.rows[i].time.toTimeString();
          result.rows[i].requestId = result.rows[i].requestid;
        }
        console.log("rows", result.rows);
        res.json({ items: result.rows });
      }
    }
  );
});

router.get("/pendingcoverage", (req, res) => {
  var database = {
    items: [
      {
        desk: "Fourth Floor",
        loc: "Moffitt",
        date: "Wednesday, March 6, 2020",
        time: "3:00 PM - 5:00 PM",
        needname: "Broco Lee",
        message: "Going home for the weekend"
      },
      {
        desk: "Fourth Floor",
        loc: "Moffitt",
        date: "Thursday, March 7, 2020",
        time: "3:00 PM - 5:00 PM",
        needname: "Broco Lee",
        message: "Need sleep. Very tired."
      }
    ]
  };
  res.json(database);
});

module.exports = router;
