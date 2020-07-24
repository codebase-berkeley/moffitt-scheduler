var express = require("express");
var router = express.Router();

var pool = require("../db/db");

router.get("/loadschedule/:schedule", (req, res) => {
  console.log("Received request for:", req.params.schedule);

  return res.json({ successful: true });
});

router.post("/saveschedule/:schedule", (req, res) => {
  console.log("Saving:", req.params.schedule);
  console.log("Schedule:", req.body.schedule);

  return res.json({ successful: true });
});

module.exports = router;
