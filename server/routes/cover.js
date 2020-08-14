var express = require("express");
var router = express.Router();

var pool = require("../db/db");

router.get("/pendingcoverage", (req, res) => {
  pool.query(
    "SELECT date, time, location, notes as reason, name as employee FROM shifts INNER JOIN sle ON sle_id=id WHERE cover_requested=true AND coverer_id IS null",
    (err, result) => {
      if (err) {
        console.error(err.stack);
      }
      res.json({ requests: result.rows });
    }
  );
});

module.exports = router;
