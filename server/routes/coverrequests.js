var express = require("express");
var router = express.Router();

router.post("/pendingsupervisor", (req, res) => {
  var approve = req.body.approve;
  console.log("approve", approve);
  res.json({ Successful: true });
});

router.get("/requesthistory", (req, res) => {
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

module.exports = router;
