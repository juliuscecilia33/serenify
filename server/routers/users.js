const express = require("express");
const router = express.Router();
const pool = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");
const validinfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");
const admin = require("../config/firebase-config");

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
    const { useremail, userpassword } = req.body;

    // check whether useremail has already been registered
    const user = await pool.query(
      "SELECT * FROM tbluser WHERE userEmail = $1",
      [useremail]
    );

    if (user.rows.length !== 0) {
      return res.status(401).json("User has already existed...");
    }

    if (userpassword <= 6 || userpassword.length >= 18) {
      return res.status(401).json("invalid password format");
    } else {
      var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
      if (!userpassword.match(paswd)) {
        return res.status(401).json("invalid password format");
      }
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

// regular login
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
      return res.status(401).json("Invalid Credentials");
    }

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

//firebase login
router.post("/firebase/login", async (req, res) => {
  try {
    const { token } = req.body;
    const dateObject = new Date().toLocaleString();
    let uid = 0;
    let email = 0;
    //console.log("undecrypted token in backend:", token);

    const decodeValue = await admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        //console.log("decoded token", decodedToken);
        uid = decodedToken.uid;
        email = decodedToken.email;
      });

    const checkEmail = await pool.query(
      "SELECT * FROM tblUser WHERE useremail = $1",
      [email]
    );

    if (checkEmail.rows.length === 0) {
      const insertGoogle = await pool.query(
        "INSERT INTO tblUser (googleid, isGoogle, useremail, logintime) VALUES ($1, $2, $3, $4) RETURNING *",
        [uid, true, email, dateObject]
      );
      res.json(insertGoogle.rows[0]);
    }

    res.json(checkEmail.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
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
    console.log(getAllUserLikePost.rows[0]);

    if (getAllUserLikePost.rows[0].postsliked === null) {
      return res.json(getAllUserLikePost.rows[0]);
    }

    const result = getAllUserLikePost.rows[0].postsliked.map((item) =>
      JSON.parse(item)
    );

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//change password routes
router.put("/changePassword/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const { userpassword } = req.body;

    //check if the password vaild
    const updatePassword = await pool.query(
      "UPDATE tbluser SET userpassword = $1 WHERE userid = $2 RETURNING *",
      [userpassword, userid]
    );

    res.json(updatePassword.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//Update user login time route
router.put("/logintime", async (req, res) => {
  const { useremail } = req.body;
  //generate the current timestamp
  const dateObject = new Date().toLocaleString();

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
