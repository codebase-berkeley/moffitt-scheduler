var express = require("express");
var router = express.Router();

var pool = require("../db/db");

router.get("/pendingcoverage", (req, res) => {
  if (!req.user || !req.user.is_sup) {
    return res.json({ noAuth: true });
  }

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

router.get("/pendingapproval", (req, res) => {
  if (!req.user || !req.user.is_sup) {
    return res.json({ noAuth: true });
  }

  pool.query(
    "SELECT shift_id, date, time, location, notes as reason, s1.name as coverer, s2.name as coveree FROM shifts INNNER JOIN sle AS s1 ON s1.id=coverer_id INNER JOIN sle AS s2 on s2.id=sle_id WHERE coverer_id IS NOT null AND sup_status = 'pending'",
    (err, result) => {
      if (err) {
        console.error(err.stack);
      }

      res.json({ requests: result.rows });
    }
  );
});

router.get("/requesthistory", (req, res) => {
  if (!req.user || !req.user.is_sup) {
    return res.json({ noAuth: true });
  }

  pool.query(
    "SELECT date, time, location, notes as reason, s1.name as coverer, s2.name as coveree, sup_status FROM shifts INNNER JOIN sle AS s1 ON s1.id=coverer_id INNER JOIN sle AS s2 on s2.id=sle_id WHERE coverer_id IS NOT null AND sup_status != 'pending'",
    (err, result) => {
      if (err) {
        console.error(err.stack);
      }

      res.json({ requests: result.rows });
    }
  );
});

router.post("/coverdecision", (req, res) => {
  if (!req.user || !req.user.is_sup) {
    return res.json({ noAuth: true });
  }

  pool.query(
    "UPDATE shifts SET sup_status=$1 WHERE shift_id=$2",
    [req.body.decision, req.body.shift_id],
    (err, result) => {
      if (err) {
        console.error(err.stack);
      }

      return res.json({ successful: true });
    }
  );
});

module.exports = router;
