const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres@serenify",
  password: "20001225Dhc!",
  database: "serenifyvtwo",
  host: "serenify.postgres.database.azure.com",
  port: 5432,
  ssl: true,
});
pool.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = pool;
