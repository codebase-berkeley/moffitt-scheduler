var express = require("express");
var router = express.Router();

var pool = require("../db/db");

module.exports = router;

router.get("/employees", (req, res) => {
  console.log("user", req.user);
  if (!req.user || !req.user.is_sup) {
    return res.json({ noAuth: true });
  }

  pool.query(
    `SELECT name, email, quizzes, main, moffitt3, moffitt4, psert, notes, workleader FROM sle INNER JOIN training ON training=training.id WHERE is_sup = false;`,
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json({ employees: result.rows });
    }
  );
});

router.get("/sleprofile", (req, res) => {
  if (!req.user || req.user.is_sup) {
    return res.json({ noAuth: true });
  }

  profile(req.user.id, false, e => res.json(e));
});

router.get("/sleprofile/:id", (req, res) => {
  if (!req.user || !req.user.is_sup) {
    return res.json({ noAuth: true });
  }

  profile(req.params.id, true, e => res.json(e));
});

function profile(id, is_sup, cb) {
  pool.query(
    "SELECT name, email, quizzes, maindesk, moffitt3, moffitt4, psert, notes, workleader FROM sle INNER JOIN training ON training=training.id WHERE sle.id=$1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      var employee = result.rows[0];
      employee.sup_view = is_sup;
      cb(employee);
    }
  );
}
