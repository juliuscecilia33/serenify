const express = require("express");

const app = express();
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres@serenify",
  password: "20001225Dhc!",
  database: "serenifyvtwo",
  host: "serenify.postgres.database.azure.com",
  port: 5432,
  ssl: true,
});

const cors = require("cors");

app.use(cors());

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) =>
    console.error("Error connecting to PostgreSQL database", err)
  );

app.use(express.json());

app.use("/users", require("./routers/users"));
app.use("/posts", require("./routers/posts"));
app.use("/prompt", require("./routers/prompt"));
app.use("/comments", require("./routers/comments"));
app.use("/report", require("./routers/report"));
app.use("/ascii", require("./routers/ascii"));

app.listen(3005, () => console.log("Server listening on port 3005"));
