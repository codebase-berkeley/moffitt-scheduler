var express = require("express");
var router = express.Router();

router.post("/pendingsupervisor", (req, res) => {
  var approve = req.body.approve;
  console.log("approve", approve);
  res.json({ Successful: true });
});

// router.get("/requesthistory", (req, res) => {
//   var database = {
//     items: [
//       {
//         desk: "Front Desk",
//         loc: "Moffitt",
//         date: "Wednesday, March 6, 2020",
//         time: "3:00 PM - 5:00 PM",
//         needname: "Broco Lee",
//         covername: "Ug Lee"
//       },
//       {
//         desk: "Front Desk",
//         loc: "Moffitt",
//         date: "Thursday, March 7, 2020",
//         time: "3:00 PM - 5:00 PM",
//         needname: "Broco Lee",
//         covername: "Ug Lee"
//       }
//     ]
//   };
//   res.json(database);
// });

router.get("/requesthistory", (req, res) => {
  var itemsValues = [];
  pool.query(
    "SELECT * FROM coverrequests WHERE supervisor_status = $1 OR supervisor_status = $2  ",
    ["Approved", "Denied"],
    (error, result) => {
      if (error) {
        throw error;
      } else {
        itemsValues.push(result.rows[0]);
        // res.json(result.rows);
      }
      var database = { items: itemsValues };
      res.json(database);
    }
  );
});

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "127.0.0.1",
  database: "moffitt",
  port: 5432
});

router.get("/sqlrequesthistory", (req, res) => {
  pool.query(
    "SELECT * FROM coverrequests WHERE supervisor_status = $1 OR supervisor_status = $2  ",
    ["Approved", "Denied"],
    (error, result) => {
      if (error) {
        throw error;
      } else {
        res.json(result.rows);
      }
      console.log(result);
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
