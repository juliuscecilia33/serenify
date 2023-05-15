const express = require("express");
const router = express.Router();
const pool = require("../db");

//create a comment
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

//get all the comment by userid
router.get("/:userid", async (req, res) => {
  try {
    const { userid } = req.params;

    const getCommentAndPost = await pool.query(
      "SELECT pc.commentid, pc.commenttext, pc.commenttime,  \
      pc.userid, po.postid, po.postdescription, po.attachment, \
      po.posttime, po.userid, po.postlike, po.likedusers, \
      po.reportcount, po.isvisible, po.ascii_mood FROM tblpost po \
      JOIN tblcomment pc ON po.postid = pc.postid \
      WHERE pc.userid = $1",
      [userid]
    );

    res.json(getCommentAndPost.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get all comments by postid
router.get("/post/:postid", async (req, res) => {
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

//get a comment by commentid
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

//delete comment
router.delete("/:commentid/:userid", async (req, res) => {
  try {
    const { commentid, userid } = req.params;

    const deleteComment = await pool.query(
      "DELETE FROM tblComment WHERE commentid = $1 AND userid = $2",
      [commentid, userid]
    );

    res.json(deleteComment.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
