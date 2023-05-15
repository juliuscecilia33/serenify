const express = require("express");
const router = express.Router();
const pool = require("../db");

//create a prompt
router.post("/create/:promptDate", async (req, res) => {
  try {
    const { promptDescription } = req.body;

    const { promptDate } = req.params;
    //new Date().toLocaleDateString(); //.split('T')[0];

    if (promptDescription === null) {
      return res.status(401).send("the prompt content cannot be null...");
    }

    const checkDate = await pool.query(
      "SELECT * FROM tblPrompt WHERE promptDate  = $1",
      [promptDate]
    );

    if (checkDate.rows.length !== 0) {
      return res.status(401).json("Prompt already posted for today");
    }

    const uploadPrompt = await pool.query(
      "INSERT INTO tblPrompt (promptDescription, promptDate) VALUES ($1, $2) RETURNING *",
      [promptDescription, promptDate]
    );

    res.json(uploadPrompt.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get promptDes by the promptDate DEFAULT
router.get("/:promptDate", async (req, res) => {
  try {
    const { promptDate } = req.params;
    //const { promptDate } = req.body;

    const getPromptInfo = await pool.query(
      "SELECT * FROM tblPrompt WHERE promptDate = $1",
      [promptDate]
    );

    res.json(getPromptInfo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get all prompts
router.get("/allprompts", async (req, res) => {
  try {
    // const { promptid } = req.params;
    //const { promptDate } = req.body;

    const getAllPrompts = await pool.query("SELECT * FROM tblPrompt");

    res.json(getAllPrompts.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error asdfkajsdlfkaj");
  }
});

//Delete a prompt
router.delete("/:promptid", async (req, res) => {
  try {
    const { promptid } = req.params;
    //get the promptDescription info
    const deletePromptInfo = await pool.query(
      "SELECT promptDescription FROM tblPrompt WHERE promptid = $1",
      [promptid]
    );
    const deletePromptDes = JSON.stringify(deletePromptInfo.rows[0]);

    const deletePrompt = await pool.query(
      "DELETE FROM tblPrompt WHERE promptid = $1",
      [promptid]
    );

    res.json("Successfully Delete the prompt:" + deletePromptDes);
    //res.json(`Successfully deleted the prompt: ${deletePromptDes}`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Modify the prompt based on promptid or promptDate
router.put("/:promptid", async (req, res) => {
  try {
    const { promptid } = req.params;
    const { promptDescription } = req.body;

    const updatePromptDes = await pool.query(
      "UPDATE tblPrompt SET promptDescription = $1 WHERE promptid = $2",
      [promptDescription, promptid]
    );

    //get the new promptDescription
    const newPrompt = await pool.query(
      "SELECT promptDescription from tblPrompt WHERE promptid = $1",
      [promptid]
    );
    const newPromptDes = JSON.stringify(newPrompt.rows[0]);

    res.json("Successfully changed the promptDescription to" + newPromptDes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
