var express = require("express");
var router = express.Router();

router.post("/pendingsupervisor", (req, res) => {
  var approve = req.body.approve;
  var deny = req.body.deny;
  console.log("approve", approve);
  console.log("deny", deny);
  res.json({ Successful: true });
});

module.exports = router;
