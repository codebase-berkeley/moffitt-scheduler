var express = require("express");
var router = express.Router();

router.get("/approvalrequest", res => {
  console.log(res);
  var approvalRequest = true;
  console.log("approve2", approve);
  res.json({ approvalRequest: approvalRequest });
});

module.exports = router;
