var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var pool = require("./db/db");

passport.use(
  new LocalStrategy((username, password, cb) => {
    console.log("why doesnt this happen");
    console.log(username);
    console.log(password);
    cb(null, { id: 2 });
    // var email = req.body.email.trim();
    // var password = req.body.password;
    // var sleID;
    // const sleSelect = "SELECT id, password, salt FROM sle WHERE email = $1";
    // const supSelect =
    //   "SELECT id, password, salt FROM supervisor WHERE email = $1";
    // const values2 = [email];
    // pool.query(sleSelect, values2, (error, result) => {
    //   if (error) {
    //     throw error;
    //   } else if (result.rows.length == 0) {
    //     pool.query(supSelect, values2, (error, result) => {
    //       if (error) {
    //         res.json({ isSupervisor: false });
    //       } else if (result.rows.length == 0) {
    //         res.json({ isSupervisor: false });
    //       } else if (
    //         result.rows[0]["password"] ==
    //         converter(password, result.rows[0]["salt"])
    //       ) {
    //         res.json({ isSupervisor: true });
    //       } else {
    //         res.json({ isSupervisor: false });
    //       }
    //     });
    //   } else if (
    //     result.rows[0]["password"] == converter(password, result.rows[0]["salt"])
    //   ) {
    //     sleID = result.rows[0]["id"];
    //     res.json({ isSle: sleID });
    //   } else {
    //     pool.query(supSelect, values2, (error, result) => {
    //       if (error) {
    //         res.json({ isSupervisor: false });
    //       } else if (result.rows.length == 0) {
    //         res.json({ isSupervisor: false });
    //       } else if (
    //         result.rows[0]["password"] ==
    //         converter(password, result.rows[0]["salt"])
    //       ) {
    //         res.json({ isSupervisor: true });
    //       } else {
    //         res.json({ isSupervisor: false });
    //       }
    //     });
    //   }
    // });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, cb) => {
  dbquery(
    "SELECT uid, username FROM users WHERE uid = $1",
    [parseInt(id)],
    (rows) => {
      cb(null, rows[0]);
    }
  );
});

module.exports = passport;
