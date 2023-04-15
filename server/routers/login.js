const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async (req, res) => {
  try {
    const {
      useremail,
      username,
      userpassword,
      logintime,
      portrait,
      blocklist,
      blockedlist,
      reportcount,
    } = req.body;

    let newUser = await pool.query(
      "INSERT INTO tbluser (useremail, username, userpassword, logintime, portrait, blocklist, blockedlist, reportcount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        useremail,
        username,
        userpassword,
        logintime,
        portrait,
        blocklist,
        blockedlist,
        reportcount,
      ]
    );

    // const user = await pool.query("SELECT * FROM users WHERE
    // ", [email]);

    // if (user.rows.length === 0) {
    //   return res.status(401).json("Password/Email is incorrect...");
    // }

    // //3. check if incoming password is the same as the password in database
    // const validPassword = await bcrypt.compare(
    //   password,
    //   user.rows[0].user_password
    // );
    // //console.log(validPassword);
    // if (!validPassword) {
    //   return res.status(401).json("Password/Email is incorrect...");
    // }

    // //4. assign jwt token
    // const token = jwtGenerator(newUser.rows[0].user_id);

    res.json("Sucessfully added user");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
