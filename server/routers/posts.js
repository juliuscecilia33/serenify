const express = require("express");
const router = express.Router();
const pool = require("../db");

// create post route
// like count to 0
router.post("/create", async (req, res) => {
  try {
    const {
      postDescription,
      attachment,
      userid,
      promptid,
      ascii_mood,
      isvideo,
    } = req.body;
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
      "INSERT INTO tblPost (postDescription, attachment, postTime, userid, promptid, ascii_mood, isvideo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        postDescription,
        attachment,
        postTime,
        userid,
        promptid,
        ascii_mood,
        isvideo,
      ]
    );

    res.json("Successfully post~~~");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get all the post that is invisible rn
router.get("/invisible", async (req, res) => {
  try {
    const getAllPostInvisible = await pool.query(
      "SELECT pm.promptid, pm.promptdescription, pm.promptdate, \
      po.postid, po.postdescription, po.attachment, po.posttime, po.userid, po.postlike, po.likedusers, \
      po.reportcount, po.isvisible, po.ascii_mood\
        FROM tblPost po \
        JOIN tblPrompt pm ON pm.promptid = po.promptid \
        WHERE po.isVisible = false"
    );

    res.json(getAllPostInvisible.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get all post that has report count is greater than one
router.get("/allReports", async (req, res) => {
  try {
    const getAllReport = await pool.query(
      "SELECT pm.promptid, pm.promptdescription, pm.promptdate, \
      po.postid, po.postdescription, po.attachment, po.posttime, po.userid, po.postlike, po.likedusers, \
      po.reportcount, po.isvisible, po.ascii_mood\
        FROM tblPost po \
        JOIN tblPrompt pm ON pm.promptid = po.promptid \
        WHERE reportcount > 0"
    );

    res.json(getAllReport.rows);
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

//get post based on postid
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

//get all the post based on userid
router.get("/:userid/posts", async (req, res) => {
  try {
    const { userid } = req.params;

    const getPromptAndUserPosts = await pool.query(
      "SELECT pm.promptid, pm.promptdescription, pm.promptdate, \
      po.postid, po.postdescription, po.attachment, po.posttime, po.userid, po.postlike, po.likedusers, \
      po.reportcount, po.isvisible, po.ascii_mood, po.isvideo \
        FROM tblPost po \
        JOIN tblPrompt pm ON pm.promptid = po.promptid \
        WHERE po.userid = $1",
      [userid]
    );

    res.json(getPromptAndUserPosts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get postliked router
router.get("/:postid/checklike", async (req, res) => {
  const { postid } = req.params;

  try {
    const checkLike = await pool.query(
      "SELECT postlike from tblpost WHERE postid = $1 ",
      [postid]
    );

    res.json(checkLike.rows[0].postlike);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// update like count for post (url)
// like route
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

    // get post data
    const postDataResult = await pool.query(
      "SELECT * FROM tblPost WHERE postid = $1",
      [postid]
    );

    const updateUserPostsLiked = await pool.query(
      "UPDATE tblUser SET postsLiked = ARRAY_APPEND(postsliked, $1) WHERE userid = $2",
      [postDataResult.rows[0], userid]
    );
    res.json("Like Count incremented");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//dislike route
router.put("/likedecremented/:postid", async (req, res) => {
  try {
    const { postid } = req.params;
    const { userid } = req.body;

    const checkLike = await pool.query(
      "SELECT postlike from tblpost WHERE postid = $1 ",
      [postid]
    );

    if (checkLike.rows[0].postlike <= 0) {
      res.status(401).send("Like count can't be below 0!");
    }

    const getAllUserLikePost = await pool.query(
      "SELECT * FROM tblpost WHERE postid = $1",
      [postid]
    );

    /*
    //get the user postsliked array
    */
    const userLikedPost = await pool.query(
      "SELECT postsliked FROM tblUser WHERE userid = $1",
      [userid]
    );
    console.log(userLikedPost.rows[0].postsliked);

    //filter the postsliked array without the parameter postid
    const newUserLikedPost = userLikedPost.rows[0].postsliked.filter(
      (item) => JSON.parse(item).postid != postid
    );
    console.log(newUserLikedPost);

    //then insert the new array into the tblUser
    const removeFromUserLikedPosts = await pool.query(
      "UPDATE tblUser SET postsliked = $1 WHERE userid = $2 RETURNING *",
      [newUserLikedPost, userid]
    );

    /*
    //get the user postsliked array
    */

    // set user like count minus 1
    const updateLike = await pool.query(
      "UPDATE tblpost SET postlike = postlike - 1 WHERE postid = $1",
      [postid]
    );

    const postDataResult = await pool.query(
      "SELECT * FROM tblPost WHERE postid = $1",
      [postid]
    );

    res.json(removeFromUserLikedPosts.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Edit the post route
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

    const userLiked = await pool.query(
      "SELECT likedusers FROM tblPost WHERE postid = $1",
      [postid]
    );

    console.log(userLiked.rows[0].likedusers);

    /*
    //get the user postsliked array
    */
    const updateEveryUser = userLiked.rows[0].likedusers.map(async (userid) => {
      const userLikedPost = await pool.query(
        "SELECT postsliked FROM tblUser WHERE userid = $1",
        [userid]
      );
      console.log(userLikedPost.rows[0].postsliked);

      //filter the postsliked array without the parameter postid
      const newUserLikedPost = userLikedPost.rows[0].postsliked.filter(
        (item) => JSON.parse(item).postid != postid
      );
      //console.log(newUserLikedPost);

      //then insert the new array into the tblUser
      const removeFromUserLikedPosts = await pool.query(
        "UPDATE tblUser SET postsliked = $1 WHERE userid = $2 RETURNING *",
        [newUserLikedPost, userid]
      );
    });

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

module.exports = router;
