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
    const sleSelect =
      "SELECT id, password, salt, is_sup FROM sle WHERE email = $1";

    pool.query(sleSelect, [email], (error, result) => {
      if (error) {
        throw error;
      }
      if (result.rows.length > 0) {
        var first = result.rows[0];
        if (first["password"] == converter(password, first["salt"])) {
          console.log("id:", first.id, "is_sup", first.is_sup);
          return cb(null, { id: first.id, is_sup: first.is_sup });
        }
      }
      return cb(null, false);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, cb) => {
  pool.query("SELECT * FROM sle where id=$1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    cb(null, result.rows[0]);
  });
});

module.exports = passport;
