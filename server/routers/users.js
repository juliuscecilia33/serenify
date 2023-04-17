const express = require("express");
const router = express.Router();
const pool = require("../db");

//test connection
router.get("/test", async (req, res) => {
  try {
    res.json("Sucessfully works");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Register New User
router.post("/register", async (req, res) => {
  try {
    const { useremail, userpassword, logintime } = req.body;

    let newUser = await pool.query(
      "INSERT INTO tbluser (userEmail, userName, userPassword, loginTime, portrait, blockList, blockedList, reportCount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [useremail, userpassword, logintime]
    );

    res.json("Sucessfully added user");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { useremail, userpassword } = req.body;

  try {
    const user = await pool.query(
      "SELECT * FROM tbluser WHERE userEmail = $1",
      [useremail]
    );

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    // const validPassword = await bcrypt.compare(
    //   user_password,
    //   user.rows[0].user_password
    // );

    if (user.rows[0].userPassword !== userpassword) {
      return res.status(401).json("Invalid Credential");
    }

    // const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json("logged in");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//Put the LoginTime
router.put("/logintime", async (req, res) => {
  function pgFormatDate(date) {
    /* Via http://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date */
    function zeroPad(d) {
      return ("0" + d).slice(-2);
    }

    var parsed = new Date(date);

    return (
      parsed.getUTCFullYear().toString() +
      "-" +
      zeroPad(parsed.getMonth() + 1).toString() +
      "-" +
      zeroPad(parsed.getDate()).toString() +
      " " +
      zeroPad(parsed.getHours()).toString() +
      ":" +
      zeroPad(parsed.getMinutes()).toString() +
      ":" +
      zeroPad(parsed.getSeconds()).toString() +
      "-" +
      zeroPad(parsed.getMilliseconds()).toString()
    );

    // 2023-04-16 17:37-59 <- ours
    // 2016-06-22 19:10:25-07 <- correct format
  }

  const { useremail } = req.body;
  //generate the current timestamp
  const dateObject = pgFormatDate(new Date());
  //console.log("Date Object:", dateObject);

  try {
    const time = await pool.query(
      "UPDATE tbluser SET logintime = $1 WHERE userEmail = $2",
      [dateObject, useremail]
    );

    res.json("Successfully updated time to " + dateObject);
    // res.json("Sucessfully update the logintime");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;