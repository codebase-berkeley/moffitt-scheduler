var express = require("express");
var router = express.Router();

router.post("/pendingsupervisor", (req, res) => {
  var approve = req.body.approve;
  console.log("approve", approve);
  res.json({ Successful: true });
});

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "127.0.0.1",
  database: "moffitt",
  port: 5432
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
          result.rows[i].desk = "Fourth Floor";
          result.rows[i].date = result.rows[i].time.toDateString();
          result.rows[i].time = result.rows[i].time.toTimeString();
        }
        console.log("result.rows:", result.rows);
        res.json({ items: result.rows });
      }
    }
  );
});

router.get("/pendingcoverage", (req, res) => {
  var database = {
    items: [
      {
        desk: "Front Desk",
        loc: "Moffitt",
        date: "Wednesday, March 6, 2020",
        time: "3:00 PM - 5:00 PM",
        needname: "Broco Lee",
        message: "Going home for the weekend"
      },
      {
        desk: "Front Desk",
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
router.get("/pendingsupervisor", (req, res) => {
  var database = {
    items: [
      {
        desk: "Front Desk",
        loc: "Moffitt",
        date: "Wednesday, March 6, 2020",
        time: "3:00 PM - 5:00 PM",
        needname: "Broco Lee",
        covername: "Ug Lee"
      },
      {
        desk: "Front Desk",
        loc: "Moffitt",
        date: "Thursday, March 7, 2020",
        time: "3:00 PM - 5:00 PM",
        needname: "Broco Lee",
        covername: "Ug Lee"
      }
    ]
  };
  res.json(database);
});

module.exports = router;
