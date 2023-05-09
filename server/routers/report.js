const express = require("express");
const router = express.Router();
const pool = require("../db");

//create a report
router.post("/:postid/add", async (req, res) => {
  try {
    const { reason, userid } = req.body;
    const { postid } = req.params;

    const reportTime = new Date().toLocaleString();

    //check the post still exist or not
    const checkPost = await pool.query(
      "SELECT * FROM tblPost WHERE postid = $1",
      [postid]
    );

    if (checkPost.rows.length == 0) {
      return res.status(401).json("The post does not exist...");
    }

    // SELECT * FROM tblreport_post where userid = userid and postid = postid; if row > 1, then you return error
    //check whether the user has already reported it before
    const checkUserReported = await pool.query(
      "SELECT * FROM tblreport_post WHERE userid = $1 AND postid = $2",
      [userid, postid]
    );

    if (checkUserReported.rows.length > 0) {
      return res
        .status(401)
        .json("You have already report this post before...");
    }

    let newReport = await pool.query(
      "INSERT INTO tblreport_post (reporttime,reason, postid, userid) VALUES ($1, $2, $3, $4) RETURNING *",
      [reportTime, reason, postid, userid]
    );

    // update report count on post table
    const updatePostReportCount = await pool.query(
      "UPDATE tblPost SET reportCount = reportCount + 1 WHERE postid = $1 RETURNING *",
      [postid]
    );

    // if updatePostReportCount.rows[0].reportCount >= 5...
    const checkReportCount = await pool.query(
      "SELECT reportCount FROM tblPost WHERE postid = $1",
      [postid]
    );
    console.log("check report count:", checkReportCount);

    if (checkReportCount.rows[0].reportcount >= 5) {
      const updateIsVisible = await pool.query(
        "UPDATE tblPost SET isvisible = false WHERE postid = $1",
        [postid]
      );
    }

    res.json(newReport.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


//get a report from postid
router.get("/:postid", async (req, res) => {
  try {
    const { postid } = req.params;

    //check if the post still exist
    const checkPost = await pool.query(
      "SELECT * FROM tblPost WHERE postid = $1",
      [postid]
    );

    if (checkPost.rows[0].length == 0) {
      return res.status(401).json("The post does not exist...");
    }

    const getReportByPostid = await pool.query(
      "SELECT * FROM tblReport WHERE postid = $1",
      [postid]
    );

    res.json(getReportByPostid.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



//get all report reason for single post
router.get("/reason/:postid", async (req, res) => {
  try {
    const { postid } = req.params;

    const getAllReportReason = await pool.query(
      "SELECT reason FROM tblReport_Post WHERE postid = $1",
      [postid]
    );

    res.json(getAllReportReason.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



//delete a report by reportid
router.delete("/:postid", async (req, res) => {
  try {
    const { postid } = req.params;

    //check if the post still exist
    const checkPost = await pool.query(
      "SELECT * FROM tblPost WHERE postid = $1",
      [postid]
    );

    if (checkPost.rows[0].length == 0) {
      return res.status(401).json("The post does not exist...");
    }

    const deleteReportByPostid = await pool.query(
      "DELETE FROM tblReport_Post WHERE postid = $1",
      [postid]
    );

    res.json("Successfully solve the report for postid: ", postid);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//approve a report
router.delete{ "/approve/:postid", async(req, res) => {
  try{
    const {postid} = req.params;
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}
}

module.exports = router;


//get a report form commentid
// router.get("/:commentid", async (req, res) => {
//   try {
//     const { commentid } = req.params;

//     //check if the post still exist
//     const checkComment = await pool.query(
//       "SELECT * FROM tblComment WHERE commentid = $1",
//       [commentid]
//     );

//     if (checkComment.rows[0].length == 0) {
//       return res.status(401).json("The post does not exist...");
//     }

//     const getReportByCommentid = await pool.query(
//       "SELECT * FROM tblReport WHERE commentid = $1",
//       [commentid]
//     );

//     res.json(getReportByCommentid.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });