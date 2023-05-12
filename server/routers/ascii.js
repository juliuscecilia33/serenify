const express = require("express");
const router = express.Router();
const pool = require("../db");

//post an ascii reaction
//if the ascii emoji has not been added
router.post("/reaction/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const { ascii_string, postid } = req.body;
    // check whether the ascii-string/ascii_reactionid has already reacted to that post
    const checkAsciiString = await pool.query(
      "SELECT * FROM tblAscii_Reaction WHERE postid = $1 AND ascii_string = $2",
      [postid, ascii_string]
    );

    if (checkAsciiString.rows.length >= 0) {
      return res.status(401).send("The ascii emoji has already there");
    }

    const postNewAsciiReaction = await pool.query(
      "INSERT INTO tblAscii_Reaction (ascii_String, postid, userid) VALUES ($1, $2, $3) RETURNING *",
      [ascii_string, postid, []]
    );

    const insertUserid = await pool.query(
      "UPDATE tblAscii_Raection SET userid = ARRAY_APPEND(userid, $1) WHERE ascii_reactionid = $2 RETURNING *",
      [userid, postNewAsciiReaction.rows[0].ascii_reactionid]
    );

    res.json(insertUserid.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//put a userid into the ascii if other click it
router.put("/add/reaction/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const { ascii_string, postid } = req.body;

    //check the whether the userid exist in the text[]
    const checkUserid = await pool.query(
      "SELECT * FROM tblAscii_Reaction WHERE ascii_string = $1 AND postid = $2 AND $3 = ANY(userid)",
      [ascii_string, postid, userid]
    );

    if(checkUserid.rows.length )

    //check whether the user
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
