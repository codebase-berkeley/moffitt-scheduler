const Pool = require("pg").Pool;

const connectionPool = new Pool({
  user: process.env.dbuser,
  password: process.env.dbpassword,
  host: process.env.dbhost,
  database: process.env.dbdatabase,
  port: process.env.dbport
});

module.exports = connectionPool;
