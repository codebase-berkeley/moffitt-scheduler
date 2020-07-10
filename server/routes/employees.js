var express = require("express");
var router = express.Router();

var pool = require("../db/db");

module.exports = router;

router.get("/employees", (req, res) => {
  pool.query(
    `SELECT name, email, quizzes, main, moffitt3, moffitt4, psert, notes, workleader FROM sle INNER JOIN training ON training=training.id WHERE is_sup = false;`,
    (error, result) => {
      if (error) {
        throw error;
      } else {
        res.json({ employees: result.rows });
      }
    }
  );
});
