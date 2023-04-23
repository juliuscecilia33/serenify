const express = require("express");
const router = express.Router();
const pool = require("../db");

// 1. create post route
// like count to 0
router.post("/create", async (req, res) => {
  try {
    const { postDescription, attachment, userid, promptid } = req.body;
    //Generate TIMESTAMP
    const postTime = new Date().toLocaleString();

    //check if the prompt exists
    const checkPrompt = await pool.query(
      "SELECT * FROM tblPrompt WHERE promptid = $1",
      [promptid]
    );

    if (checkPrompt.rows.length == 0) {
      return res.status(401).json("The prompt does not exist...");
    }

    //create the post
    const createPost = await pool.query(
      "INSERT INTO tblPost (postDescription, attachment, postTime, userid, promptid) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [postDescription, attachment, postTime, userid, promptid]
    );

    res.json("Successfully upload a new post");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 2. get post route
router.get("/:postid", async (req, res) => {
  try {
    const { postid } = req.params;

    const postInfo = await pool.query(
      "SELECT * FROM tblPost WHERE postid = $1",
      [postid]
    );

    res.json(postInfo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 3. update like count for post (url)
// router.put("/:postid")
router.put("/:postid/likecount", async (req, res) => {
  try {
    const { postid } = req.params;

    const updateLike = await pool.query(
      "UPDATE tblpost SET postlike = postlike + 1 WHERE postid = $1",
      [postid]
    );

    res.json("Like Count updated");
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Delete a post
router.delete("/:postid", async (req, res) => {
  try {
    const { postid } = req.params;

    const deletePostInfo = await pool.query(
      "SELECT postDescription WHERE postid = $1",
      [postid]
    );
    const deletePostDes = JSON.stringify(deletePostInfo.rows[0]);

    const deletePost = await pool.query(
      "DELETE FROM tblPost WHERE postid = $1",
      [postid]
    );

    res.json("Successfully delete the post: " + deletePostDes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 5. edit post route(save for later)

module.exports = router;

// 3. comment on post route
