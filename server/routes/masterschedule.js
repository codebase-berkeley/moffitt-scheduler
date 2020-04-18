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

router.get("/otheremployees", function (req, res) {
  pool.query("SELECT name, id FROM sle", (error, result) => {
    console.log("resulting rows", result.rows);
    if (error) {
      throw error;
    }
    return res.json({ allEmployees: result.rows });
  });
});

router.post("/removeemployee", function (req, res) {
  pool.query();
});

module.exports = router;
