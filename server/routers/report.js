const express = require("express");
const router = express.Router();
const pool = require("../db");

//create a report
router.post("/add", async (req, res) => {
  try {
    const { reason, postid, commentid } = req.body;

    const reportTime = new Date().toLocaleString();

    let newReport = await pool.query(
      "INSERT INTO tblreport_post (reporttime,reason, postid) VALUES ($1, $2, $3, $4) RETURNING *",
      [reportTime, reason, postid, commentid]
    );

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
      
    if(checkPost.rows[0].length == 0) {
      return res.status(401).json("The post does not exist...");
    }

    const getReportByPostid = await pool.query(
      "SELECT * FROM tblReport WHERE postid = $1",[postid]
    )

    res.json(getReportByPostid.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get a report form commentid
router.get("/:commentid", async (req, res) => {
  try {
    const { commentid } = req.params;

    //check if the post still exist
    const checkComment = await pool.query(
      "SELECT * FROM tblComment WHERE commentid = $1",
      [commentid]
    );
      
    if(checkComment.rows[0].length == 0) {
      return res.status(401).json("The post does not exist...");
    }

    const getReportByCommentid = await pool.query(
      "SELECT * FROM tblReport WHERE commentid = $1",[commentid]
    )

    res.json(getReportByCommentid.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//delete a report by reportid
// router.delete("/:postid", async (req, res) => {
//   try{
//     const { postid } = req.params;

//     //check if the post still exist
//     const checkPost = await pool.query(
//       "SELECT * FROM tblPost WHERE postid = $1",
//       [postid]
//     );
      
//     if(checkPost.rows[0].length == 0) {
//       return res.status(401).json("The post does not exist...");
//     }

//     const deleteReportByPostid = await pool.query("DELETE FROM tblReport_Post")
//   } catch(err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// })

module.exports = router;
