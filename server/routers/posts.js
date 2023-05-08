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

    res.json("Successfully post~~~");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get all the post
//get all first, then id
router.get("/all", async (req, res) => {
  try {
    const allPosts = await pool.query("SELECT * FROM tblPost");

    res.json(allPosts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 2. get post
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

//get all the post that is unvaild rn
router.get("/invisible", async (req, res) => {
  try {
    const getAllPostInvisible = await pool.query(
      "SELECT * FROM tblPost WHERE isVisible = false"
    );

    res.json(getAllPostInvisible.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:postid/checkifliked", async (req, res) => {
  try {
    const { postid } = req.params;
    const { userid } = req.body;

    // const checkIfUserHasLiked = await pool.query(
    //   "SELECT * FROM tbluser WHERE '769156ac-405a-4d93-bea3-781bc3f7dec1' = ANY(postsliked) AND userid = '76f8fe50-06bb-4553-9b28-a453fac37712'"
    // );

    const checkIfUserHasLiked = await pool.query(
      "SELECT * FROM tbluser WHERE $1 = ANY(postsliked) AND userid = $2",
      [postid, userid]
    );

    if (checkIfUserHasLiked.rows.length > 0) {
      return res.json(true);
    }

    res.json(false);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 3. update like count for post (url)
// router.put("/:postid")
router.put("/:postid/likeincremented", async (req, res) => {
  try {
    const { postid } = req.params;
    const { userid } = req.body;

    const updateLike = await pool.query(
      "UPDATE tblpost SET postlike = postlike + 1 WHERE postid = $1",
      [postid]
    );

    const updateLikedUsers = await pool.query(
      "UPDATE tblpost SET likedusers = ARRAY_APPEND(likedusers, $1) WHERE postid = $2",
      [userid, postid]
    );

    const updateUserPostsLiked = await pool.query(
      "UPDATE tblUser SET postsLiked = ARRAY_APPEND(postsliked, $1) WHERE userid = $2",
      [postid, userid]
    );

    res.json("Like Count incremented");
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:postid/likedecremented", async (req, res) => {
  try {
    const { postid } = req.params;

    const updateLike = await pool.query(
      "UPDATE tblpost SET postlike = postlike - 1 WHERE postid = $1",
      [postid]
    );

    const updateUserPostsLiked = await pool.query(
      "UPDATE tblUser SET postsLiked = ARRAY_REMOVE(postsliked, $1) WHERE userid = $2",
      [postid, userid]
    );

    res.json("Like Count decremented");
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 3. update like count for post (url)
// router.put("/:postid")
router.put("/:postid/editdescription", async (req, res) => {
  try {
    const { postid } = req.params;
    const { postdescription } = req.body;

    const updatePostDescription = await pool.query(
      "UPDATE tblpost SET postdescription = $1 WHERE postid = $2 RETURNING *",
      [postdescription, postid]
    );

    res.json(updatePostDescription.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//Delete a post
router.delete("/:postid", async (req, res) => {
  try {
    const { postid } = req.params;

    const deletePost = await pool.query(
      "DELETE FROM tblPost WHERE postid = $1",
      [postid]
    );

    res.json("Successfully deleted post");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 5. edit post route(save for later)

module.exports = router;

// 3. comment on post route
