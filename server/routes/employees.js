var express = require("express");
var router = express.Router();
const crypto = require("crypto");

var pool = require("../db/db");

module.exports = router;

router.get("/employees", (req, res) => {
  if (!req.user || !req.user.is_sup) {
    return res.json({ noAuth: true });
  }

  pool.query(
    `SELECT sle.id, name, email, quizzes, maindesk, moffitt3, moffitt4, psert, notes, workleader FROM sle INNER JOIN training ON training=training.id WHERE is_sup = false ORDER BY name`,
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

      if (result.rows.length === 0) {
        return cb({});
      }

      var employee = result.rows[0];
      employee.sup_view = is_sup;
      cb(employee);
    }
  );
}

router.get("/supprofile", (req, res) => {
  if (!req.user || !req.user.is_sup) {
    return res.json({ noAuth: true });
  }

  pool.query(
    "SELECT name, email FROM sle WHERE id=$1",
    [req.user.id],
    (error, result) => {
      if (error) {
        throw error;
      }

      return res.json(result.rows[0]);
    }
  );
});

router.post("/sleedit", (req, res) => {
  if (!req.user) {
    return res.json({ noAuth: true });
  }

  pool.query(
    "UPDATE sle set name=$1, email=$2 WHERE id=$3",
    [req.body.name, req.body.email, req.user.id],
    (err, _) => {
      if (err) {
        throw err;
      }

      return res.json({ successful: true });
    }
  );
});

router.post("/changepassword", (req, res) => {
  if (!req.user) {
    return res.json({ noAuth: true });
  }

  var salt = crypto
    .randomBytes(256)
    .toString("base64")
    .substring(0, 39);
  var hashedPwd = crypto
    .pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`)
    .toString(`hex`)
    .substring(0, 39);

  pool.query(
    "UPDATE sle SET salt=$1, password=$2 WHERE id=$3",
    [salt, hashedPwd, req.user.id],
    (error, _) => {
      if (error) {
        throw error;
      }

      return res.json({ successful: true });
    }
  );
});

router.post("/deleteself", (req, res) => {
  if (!req.user) {
    return res.json({ noAuth: true });
  }

  var userId = req.user.id;

  req.logOut();
  res.clearCookie("connect.sid");

  pool.query("DELETE FROM sle WHERE id=$1", [userId], (error, _) => {
    if (error) {
      throw error;
    }

    return res.json({ successful: true });
  });
});

router.post("/supdeletesle", (req, res) => {
  if (!req.user || !req.user.is_sup) {
    return res.json({ noAuth: true });
  }

  pool.query("DELETE FROM sle WHERE id=$1", [req.body.id], (error, _) => {
    if (error) {
      throw error;
    }

    return res.json({ successful: true });
  });
});

router.post("/supeditsle", (req, res) => {
  if (!req.user || !req.user.is_sup) {
    return res.json({ noAuth: true });
  }

  console.log("in supeditsle", req.user.id);

  pool.query(
    "SELECT training FROM sle WHERE id=$1",
    [req.body.id],
    (error, result) => {
      if (error) {
        throw error;
      }

      var training_id = result.rows[0].training;
      pool.query(
        "UPDATE training set quizzes=$1, maindesk=$2, moffitt3=$3, moffitt4=$4, psert=$5, notes=$6, workleader=$7 WHERE id=$8",
        [
          req.body.quizzes,
          req.body.maindesk,
          req.body.moffitt3,
          req.body.moffitt4,
          req.body.psert,
          req.body.notes,
          req.body.workleader,
          training_id
        ],
        (error, _) => {
          if (error) {
            throw error;
          }

          return res.json({ successful: true });
        }
      );
    }
  );
});
