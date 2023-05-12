const express = require("express");
const router = express.Router();
const pool = require("../db");

//post an ascii reaction
router.post("/reaction/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const { ascii_string, postid } = req.body;
    // check whether the ascii-string/ascii_reactionid has already reacted to that post
    const checkAsciiString = await pool.query(
      "SELECT * FROM tblAscii_Reaction WHERE postid = $1 AND ascii_string = $2",
      [postid, ascii_string]
    );

    if (checkAsciiString.rows.length === 0) {
      const postNewAsciiReaction = await pool.query(
        "INSERT INTO tblAscii_Reaction (ascii_String, postid, userid) VALUES "
      );
    }
    //check whether the userid[] contains that userid

    //
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
