const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "127.0.0.1",
  database: "moffitt",
  port: 5432
});

pool.query("SELECT * FROM sle", (error, result) => {
  if (error) {
    throw error;
  }

  console.log(result);
});
