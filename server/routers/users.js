const express = require("express");
const router = express.Router();
const pool = require("../db");

// Register New User
router.post("/register", async (req, res) => {
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
      "INSERT INTO tbluser (userEmail, userName, userPassword, loginTime, portrait, blockList, blockedList, reportCount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
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

    res.json("Sucessfully added user");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    res.json("Sucessfully added user");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
