const Pool = require("pg").Pool;

var connectionPool = null;

if (process.env.PRODUCTION === "true") {
  connectionPool = new Pool({
    connectionString: process.env.DATABASE_URL
  })
} else {
  connectionPool = new Pool({
    user: process.env.dbuser,
    password: process.env.dbpassword,
    host: process.env.dbhost,
    database: process.env.dbdatabase,
    port: process.env.dbport
  });
}

module.exports = connectionPool;
