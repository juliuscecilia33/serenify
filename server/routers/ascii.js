const express = require("express");
const router = express.Router();
const pool = require("../db");

//post an ascii reaction
//if the ascii emoji has not been added
router.post("/reaction/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const { ascii_string, postid } = req.body;

    // const insertUserid = ARRAY[userid];
    // check whether the ascii-string/ascii_reactionid has already reacted to that post
    const checkAsciiString = await pool.query(
      "SELECT * FROM tblAscii_Reaction WHERE postid = $1 AND ascii_string = $2",
      [postid, ascii_string]
    );

    if (checkAsciiString.rows.length > 0) {
      return res.status(401).send("The ascii emoji has already there");
    }

    const postNewAsciiReaction = await pool.query(
      "INSERT INTO tblAscii_Reaction (ascii_String, postid) VALUES ($1, $2)",
      [ascii_string, postid]
    );

    const insertUserid = await pool.query(
      "UPDATE tblAscii_Raection SET userid = ARRAY_APPEND(userid, $1) WHERE postid = $2 AND ascii_string = $3 RETURNING *",
      [userid, postid, ascii_string]
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
      "SELECT * FROM tblAscii_Reaction WHERE ascii_string = $1 AND postid = $2 AND $3 = ANY(userid) RETURNING *",
      [ascii_string, postid, userid]
    );

    if (checkUserid.rows.length > 0) {
      //remove the userid from text[];
      //if the userid is the only user who like, remvoe the entire ascii reaction
      if (checkUserid.rouws[0].total > 1) {
        await pool.query(
          "UPDATE tblAscii_Reaction SET total = total - 1, ARRAY_REMOVE(userid, $1) WHERE ascii_string = $1 AND postid = $2",
          [ascii_string, postid]
        );
      } else {
        await pool.query(
          "DELETE FROM tblAscii_Reaction WHERE ascii_string = $1 AND postid = $2",
          [ascii_string, postid]
        );
      }
    } else {
      //the user does not in the userid[]
      //put userid in the userid[]
      await pool.query(
        "UPDATE tblAscii_Reaction SET total = total + 1, ARRAY_APPEND(userid, $1) WHERE ascii_string = $2 AND postid = $3",
        [userid, ascii_string, postid]
      );
    }

    const res = await poolquery(
      "SELECT * FROM tblAscii_Reaction WHERE ascii_string = $1 AND postid = $2",
      [ascii_string, postid]
    );

    res.json(res.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get a ascii_string info
router.get("/get", async (req, res) => {
  try {
    const { ascii_string, postid } = req.body;

    const getAsciiInfo = await pool.query(
      "SELECT * FROM tblAscii_Reaction WHERE ascii_string = $1 AND postid = $2",
      [ascii_string, postid]
    );

    res.json(getAsciiInfo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
