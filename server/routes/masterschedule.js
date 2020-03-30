var express = require("express");
var router = express.Router();

var pool = require("../db/db");

router.get("/masterschedule", function(req, res) {
  pool.query(
    "SELECT name, start_time, end_time, location FROM shifts, sle WHERE id=sle_id ",
    (error, result) => {
      if (error) {
        throw error;
      }
      return res.json({ items: result.rows });
    }
  );
});

module.exports = router;
