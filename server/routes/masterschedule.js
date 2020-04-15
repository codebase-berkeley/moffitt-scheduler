var express = require("express");
var router = express.Router();

var pool = require("../db/db");

router.get("/masterschedule", function (req, res) {
  pool.query(
    "SELECT name, start_time, end_time, location, shift_id, sle_id FROM shifts, sle WHERE id=sle_id ",
    (error, result) => {
      if (error) {
        throw error;
      }
      return res.json({ items: result.rows });
    }
  );
});

// router.get("/modalinfo", function(req, res) {
//   pool.query(
//     ""
//   )
// });

router.post("/removeemployee", function (req, res) {

  pool.query(

  )
});

module.exports = router;
