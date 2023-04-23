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
  const { postid } = req.params;

  // const x
});

// 3. comment on post route

// 4. delete post route

// 5. edit post route(save for later)

// 6. update like count for post (url)
// router.put("/:postid")

//7. Delete a post

module.exports = router;

// //generate postTime function
// function pgFormatDate(date) {
//     function zeroPad(d) {
//     return ("0" + d).slice(-2);
//     }

//     var parsed = new Date(date);

//     return (
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
//     );
// }
// postTime = pgFormatDate(new Date());
// //check the prompt is correct

// 3. comment on post route
