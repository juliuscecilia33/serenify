const express = require("express");
const router = express.Router();
const pool = require("../db");

//post an ascii reaction
//if the ascii emoji has not been added
// no reaction
router.post("/reaction/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const { ascii_string, postid } = req.body;

    // check whether the ascii-string/ascii_reactionid has already reacted to that post
    const checkAsciiString = await pool.query(
      "SELECT * FROM tblAscii_Reaction WHERE postid = $1 AND ascii_string = $2",
      [postid, ascii_string]
    );

    if (checkAsciiString.rows.length != 0) {
      return res.json(false);
    }

    const postNewAsciiReaction = await pool.query(
      "INSERT INTO tblascii_reaction (ascii_string, postid, userid) VALUES ($1, $2, ARRAY[$3]) RETURNING *",
      [ascii_string, postid, userid]
    );

    // const insertUserid = await pool.query(
    //   "UPDATE tblAscii_Reaction SET userid = ARRAY_APPEND(userid, $1) WHERE postid = $2 AND ascii_string = $3 RETURNING *",
    //   [userid, postid, ascii_string]
    // );

    res.json(postNewAsciiReaction.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//put a userid into the ascii if other click it; no matter who the user is
router.put("/add/reaction/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const { ascii_string, postid } = req.body;

    const useridCol = await pool.query(
      "SELECT * FROM tblascii_reaction WHERE ascii_string = $1 AND postid = $2",
      [ascii_string, postid]
    );

    //check the whether the userid exist in the text[]
    const checkUserid = await pool.query(
      "SELECT $1 = ANY(userid) as checkresult FROM tblAscii_Reaction WHERE ascii_string = $2 AND postid = $3",
      [userid, ascii_string, postid]
    );
    console.log(checkUserid.rows[0].checkresult);

    if (checkUserid.rows[0].checkresult) {
      //remove the userid from text[];
      //if the userid is the only user who like, remvoe the entire ascii reaction
      const info = await pool.query(
        "SELECT * FROM tblAscii_Reaction WHERE ascii_string = $1 AND postid = $2",
        [ascii_string, postid]
      );

      console.log(info.rows[0]);

      if (info.rows[0].total > 1) {
        await pool.query(
          "UPDATE tblAscii_Reaction SET total = total - 1, userid = ARRAY_REMOVE(userid, $1) WHERE ascii_string = $2 AND postid = $3",
          [userid, ascii_string, postid]
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
        "UPDATE tblAscii_Reaction SET total = total + 1, userid = ARRAY_APPEND(userid, $1) WHERE ascii_string = $2 AND postid = $3",
        [userid, ascii_string, postid]
      );
    }

    const finalRes = await pool.query(
      "SELECT * FROM tblAscii_Reaction WHERE ascii_string = $1 AND postid = $2",
      [ascii_string, postid]
    );

    res.json(finalRes.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get a ascii_string info for specific post
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

//get all ascii_strings for specific post
router.get("/:postid/reactions", async (req, res) => {
  try {
    const { postid } = req.params;

    const getAsciiInfo = await pool.query(
      "SELECT * FROM tblAscii_Reaction WHERE postid = $1",
      [postid]
    );

    res.json(getAsciiInfo.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
