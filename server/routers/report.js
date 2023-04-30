const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/add", async (req, res) => {
  try {
    const { reason, postid } = req.body;

    const reportTime = new Date().toLocaleString();

    let newReport = await pool.query(
      "INSERT INTO tblreport_post (reporttime,reason, postid) VALUES ($1, $2, $3) RETURNING *",
      [reportTime, reason, postid]
    );

    res.json(newReport.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
