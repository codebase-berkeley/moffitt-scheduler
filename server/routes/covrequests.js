var express = require("express");
var router = express.Router();

var items = {
  database: [
    {
      desk: "Front Desk",
      loc: "Moffitt",
      date: "Wednesday, March 6, 2020",
      time: "3:00 PM - 5:00 PM",
      needname: "Broco Leeasdf",
      covername: "Ug Lee"
    }
  ]
};

router.get("/covrequests", (req, res) => {
  console.log(res);
  //   var approvalRequest = true;
  //   console.log("approve2", approve);
  console.log("asdfasdf");
  res.json(items);
});

module.exports = router;
