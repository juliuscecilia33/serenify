const express = require("express");
const router = express.Router();
const pool = require("../db");

//1. create comment
router.post("/create", async (req, res) => {
  try {
    const { commentText, userid, postid } = req.body;
    const commentTime = new Date().toLocaleDateString();

    //check if the post exists
    const checkPost = await pool.query(
      "SELECT * FROM tblPost WHERE postid = $1",
      [postid]
    );

    if (checkPost.rows.length == 0) {
      return res.status(401).json("The post does not exist...");
    }

    const postComment = await pool.query(
      "INSERT INTO tblComment (commentText, commentTime, userid, postid) VALUES($1, $2, $3, $4) RETURNING *",
      [commentText, commentTime, userid, postid]
    );

    res.json("Successfully comment: " + commentText);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//2. get comments

//3. delete comment

//4. edit a comment

//

module.exports = router;
