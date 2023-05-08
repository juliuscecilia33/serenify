const express = require("express");
const router = express.Router();
const pool = require("../db");

//1. create comment
router.post("/:postid/create", async (req, res) => {
  try {
    const { commentText, userid } = req.body;
    const { postid } = req.params;
    const commentTime = new Date().toLocaleString();

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

//2. get comments by postid
router.get("/:postid", async (req, res) => {
  try {
    const { postid } = req.params;

    const commentList = await pool.query(
      "SELECT * FROM tblComment WHERE postid = $1",
      [postid]
    );

    res.json(commentList.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get a comment
router.get("/:commentid", async (req, res) => {
  try {
    const { commentid } = req.params;

    const commentInfo = await pool.query(
      "SELECT * FROM tblComment WHERE commentid = $1",
      [commentid]
    );

    res.json(commentInfo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//3. delete comment
router.delete("/:commentid", async (req, res) => {
  try {
    const { commentid } = req.params;

    const deleteComment = await pool.query(
      "DELETE FROM tblComment WHERE commentid = $1",
      [commentid]
    );

    res.json("Successfully delete comment");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//4. edit a comment

module.exports = router;
