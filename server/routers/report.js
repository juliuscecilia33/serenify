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

    if (checkReportCount.rows[0].reportcount >= 3) {
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

    console.log(getAllReportReason.rows[1]);

    const reasonArray = () => {
      const array = new Array();

      for (let i = 0; i < getAllReportReason.rows.length; i++) {
        if (!array.includes(getAllReportReason.rows[i].reason)) {
          array.push(getAllReportReason.rows[i].reason);
        } else {
          break;
        }
      }

      return array;
    };

    // res.json(getAllReportReason.rows);
    res.json(reasonArray());
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//approve a report
router.delete("/:postid/approve", async (req, res) => {
  try {
    const { postid } = req.params;

    //check the post still exist or not
    const checkPost = await pool.query(
      "SELECT * FROM tblPost WHERE postid = $1",
      [postid]
    );

    if (checkPost.rows.length == 0) {
      return res.status(401).json("The post does not exist...");
    }

    //first update all the routes in the post
    //delete the post in tblpost
    const deletePost = await pool.query(
      "DELETE FROM tblPost WHERE postid = $1",
      [postid]
    );

    //then delete all records in tblReport_Post
    const deleteReportRecord = await pool.query(
      "DELETE FROM tblReport_Post WHERE postid = $1",
      [postid]
    );

    res.json("Successfully Approve the report");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//deny a report
router.delete("/:postid/deny", async (req, res) => {
  try {
    const { postid } = req.params;

    //check the post still exist or not
    const checkPost = await pool.query(
      "SELECT * FROM tblPost WHERE postid = $1",
      [postid]
    );

    if (checkPost.rows.length == 0) {
      return res.status(401).json("The post does not exist...");
    }

    //if post exists, update isvisible and clear the report count for that post to 0
    const updatePost = await pool.query(
      "UPDATE tblPost SET isvisible = true, reportCount = 0 WHERE postid = $1",
      [postid]
    );

    //delete all the records in the tblReport_Post
    const deleteReportRecord = await pool.query(
      "DELETE FROM tblReport_Post WHERE postid = $1",
      [postid]
    );

    res.json("Successfully deny the report");
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

module.exports = router;
