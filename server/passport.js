var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
var pool = require("./db/db");

function converter(password, salt) {
  return crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`)
    .substring(0, 39);
}

passport.use(
  new LocalStrategy((username, password, cb) => {
    var email = username.trim();
    var password = password;
    var sleID;
    const sleSelect = "SELECT id, password, salt FROM sle WHERE email = $1";
    const supSelect =
      "SELECT id, password, salt FROM supervisor WHERE email = $1";
    const values2 = [email];
    pool.query(sleSelect, values2, (error, result) => {
      if (result.rows.length > 0) {
        console.log(result.rows[0]["salt"]);
        console.log(result.rows[0]);
      }

      if (error) {
        throw error;
      } else if (result.rows.length === 0) {
        pool.query(supSelect, values2, (error, result) => {
          if (error) {
            cb(null, false);
          } else if (result.rows.length === 0) {
            cb(null, false);
          } else if (
            result.rows[0]["password"] ==
            converter(password, result.rows[0]["salt"])
          ) {
            let num = 0;
            cb(null, { id: num.toString() });
          } else {
            cb(null, false);
          }
        });
      } else if (
        result.rows[0]["password"] ==
        converter(password, result.rows[0]["salt"])
      ) {
        sleID = result.rows[0]["id"];
        cb(null, { id: sleID });
      } else {
        pool.query(supSelect, values2, (error, result) => {
          if (error) {
            cb(null, false);
          } else if (result.rows.length === 0) {
            cb(null, false);
          } else if (
            result.rows[0]["password"] ==
            converter(password, result.rows[0]["salt"])
          ) {
            let num = 0;
            cb(null, { id: num.toString() });
          } else {
            cb(null, false);
          }
        });
      }
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, cb) => {
  // console.log("Des id: " + id);
  cb(null, id);
});

module.exports = passport;
