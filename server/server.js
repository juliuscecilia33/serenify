// const express = require("express");
// const app = express();
// const cors = require("cors");

// const PORT = 5001;

// app.listen(PORT, function (err) {
//   if (err) console.log("Error in server setup");
//   console.log("Server listening on Port", PORT);
// });

// //middleware
// app.use(cors());
// app.use(express.json);

// //ROUTES//
// app.use("/login", require("./routers/login"));
// app.use("/dashboard", require("./routers/dashboard"));

const express = require("express");
const { Client } = require("pg");

const connectionString =
  "postgres://postgres@serenify:20001225Dhc!@serenify.postgres.database.azure.com:5432/serenifyvtwo";

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

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) =>
    console.error("Error connecting to PostgreSQL database", err)
  );

// app.get("/users", async (req, res) => {
//   try {
//     const result = await client.query("SELECT * FROM users");
//     res.json(result.rows);
//   } catch (err) {
//     console.error("Error executing query", err);
//     res.status(500).send("Error executing query");
//   }
// });

app.post("/login", async (req, res) => {
  try {
    // const {
    //   useremail,
    //   username,
    //   userpassword,
    //   logintime,
    //   portrait,
    //   blocklist,
    //   blockedlist,
    //   reportcount,
    // } = req.body;

    let newUser = await pool.query(
      "INSERT INTO tbluser (userEmail, userName, userPassword, loginTime, portrait, blockList, blockedList, reportCount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        "haochen@gmail.com",
        "haochen",
        "asdfasdf",
        "2016-06-22 19:10:25-07",
        null,
        null,
        null,
        null,
      ]
    );

    // // const user = await pool.query("SELECT * FROM users WHERE
    // // ", [email]);

    // // if (user.rows.length === 0) {
    // //   return res.status(401).json("Password/Email is incorrect...");
    // // }

    // // //3. check if incoming password is the same as the password in database
    // // const validPassword = await bcrypt.compare(
    // //   password,
    // //   user.rows[0].user_password
    // // );
    // // //console.log(validPassword);
    // // if (!validPassword) {
    // //   return res.status(401).json("Password/Email is incorrect...");
    // // }

    // // //4. assign jwt token
    // // const token = jwtGenerator(newUser.rows[0].user_id);

    res.json("Sucessfully added user");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.listen(3005, () => console.log("Server listening on port 3005"));
