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

//get all the user like post
router.get("/:userid/likepost", async (req, res) => {
  try {
    const { userid } = req.params;

    const getAllUserLikePost = await pool.query(
      "SELECT postsliked FROM tblUser WHERE userid = $1",
      [userid]
    );
    //const res = getAllUserLikePost.rows[0].postsliked;

    res.json(JSON.parse(getAllUserLikePost.rows[0].postsliked));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Register New User
router.post("/register", async (req, res) => {
  try {
    const { useremail, userpassword } = req.body;

    // check whether useremail has already been registered
    const user = await pool.query(
      "SELECT * FROM tbluser WHERE userEmail = $1",
      [useremail]
    );

    if (user.rows.length !== 0) {
      return res.status(401).json("User has already existed...");
    }

    const loginTime = new Date().toLocaleString();

    let newUser = await pool.query(
      "INSERT INTO tbluser (useremail, userpassword, logintime) VALUES ($1, $2, $3) RETURNING *",
      [useremail, userpassword, loginTime]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { useremail, userpassword } = req.body;
  const dateObject = new Date().toLocaleString();

  console.log("user email from login: ", useremail);
  console.log("user password from login: ", userpassword);

  try {
    const user = await pool.query(
      "SELECT * FROM tbluser WHERE userEmail = $1",
      [useremail]
    );

    if (user.rows.length === 0) {
      console.log("wrong email");
      return res.status(401).json("Invalid Credential");
    }

    // const validPassword = await bcrypt.compare(
    //   user_password,
    //   user.rows[0].user_password
    // );

    if (user.rows[0].userpassword !== userpassword) {
      console.log("wrong password");
      return res.status(401).json("Invalid Credential");
    }

    const time = await pool.query(
      "UPDATE tbluser SET logintime = $1 WHERE userEmail = $2",
      [dateObject, useremail]
    );

    // const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//Put the LoginTime
//add a check
router.put("/logintime", async (req, res) => {
  const { useremail } = req.body;
  //generate the current timestamp
  const dateObject = new Date().toLocaleString();
  //pgFormatDate(new Date());
  //console.log("Date Object:", dateObject);

  try {
    //check whether user exist
    const user = await pool.query(
      "SELECT * FROM tbluser WHERE userEmail = $1",
      [useremail]
    );

    if (user.rows.length === 0) {
      return res.status(401).json("User does not exist...");
    }

    //put in the new login time
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

//get user info by userid
router.get("/:userid", async (req, res) => {
  try {
    const { userid } = req.params;

    //check whether user exist
    const user = await pool.query("SELECT * FROM tbluser WHERE userid = $1", [
      userid,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("User does not exist...");
    }

    //get the user info
    const getUserInfo = await pool.query(
      "SELECT * FROM tbluser WHERE userid = $1",
      [userid]
    );

    res.json(getUserInfo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get user info by useremail
router.get("/:useremail", async (req, res) => {
  try {
    const { useremail } = req.params;

    //check whether user exist
    const user = await pool.query(
      "SELECT * FROM tbluser WHERE userEmail = $1",
      [useremail]
    );

    if (user.rows.length === 0) {
      return res.status(401).json("User does not exist...");
    }

    //get the user info
    const getUserInfo = await pool.query(
      "SELECT * FROM tbluser WHERE useremail = $1",
      [useremail]
    );

    res.json(getUserInfo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Delete a user by useremail
router.delete("/:useremail", async (req, res) => {
  try {
    const { useremail } = req.params;

    //check whether user exist
    const user = await pool.query(
      "SELECT * FROM tbluser WHERE userEmail = $1",
      [useremail]
    );

    if (user.rows.length === 0) {
      return res.status(401).json("User does not exist...");
    }

    //if user exists, delete the user and return the email
    const deleteUser = await pool.query(
      "DELETE FROM tblUser WHERE userid = $1",
      [useremail]
    );

    res.json("Successfully Delete the user: " + useremail);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

//TimeStamp function
// function pgFormatDate(date) {
//   /* Via http://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date */
//   function zeroPad(d) {
//     return ("0" + d).slice(-2);
//   }

//   var parsed = new Date(date);

//   return (
//     parsed.getUTCFullYear().toString() +
//     "-" +
//     zeroPad(parsed.getMonth() + 1).toString() +
//     "-" +
//     zeroPad(parsed.getDate()).toString() +
//     " " +
//     zeroPad(parsed.getHours()).toString() +
//     ":" +
//     zeroPad(parsed.getMinutes()).toString() +
//     ":" +
//     zeroPad(parsed.getSeconds()).toString() +
//     "-" +
//     zeroPad(parsed.getMilliseconds()).toString()
//   );

//   // 2023-04-16 17:37-59 <- ours
//   // 2016-06-22 19:10:25-07 <- correct format
// }
