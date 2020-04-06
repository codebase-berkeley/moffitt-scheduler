var express = require("express");
var router = express.Router();

var pool = require("../db/db");

router.post("/yourshifts/1", function(req, res) {
  var Reason = req.body.Reason;
  console.log("reason", Reason);
  res.json({ successful: true });
  const text =
    "INSERT INTO coverrequests (request_id, coverer_id, coveree_id, shift_id, supervisor_status, notes) VALUES ($1, $2, $3, $4, $5, $6)";
  const values = [1, 1, 1, 1, null, Reason];

  pool.query(text, values, (error, result) => {
    if (error) {
      throw error;
      console.log("error");
    }
    console.log(result);
  });
});

module.exports = router;
