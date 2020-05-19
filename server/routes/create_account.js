const crypto = require("crypto");
const newPool = require("pg").Pool;
const connectionPool = newPool({
  user: "onetime",
  password: "onetime",
  host: "127.0.0.1",
  database: "moffitt",
  port: 5432
});
var username = "brian";
var password = "kerrypass";
var email = "sahil@berkeley.edu";
var training_level_doe = 3;
var training_level_moffitt3 = 3;
var training_level_moffitt4 = 2;
var salt = crypto
  .randomBytes(256)
  .toString("base64")
  .substring(0, 39);
var hashedPwd = crypto
  .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
  .toString(`hex`)
  .substring(0, 39);

connectionPool.query(
  "update sle set salt = $1, password = $2 where id = 5",
  [salt, hashedPwd],
  (error, result) => {
    if (error) {
      throw error;
    }
    console.log("Worked!");
  }
);
