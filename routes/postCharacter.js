const router = require("express").Router();
const dotenv = require("dotenv").config();
const {
  charactersRM,
  ObjectId,
  dbconnect,
  dbclose,
} = require("../database/mongodbConnection");
const { checkEmptyInput, sanitizeObjectInput } = require("../functionsLibrary");

//POST /characters - creates a new character
router.post("/characters", async (req, res) => {
  const character = req.body;
  checkEmptyInput(character, res);
  let objectClean = sanitizeObjectInput(character);

  await dbconnect();

  let result = await charactersRM.insertOne(objectClean);

  let objectCreated = await charactersRM.findOne({
    _id: ObjectId(result.insertedId),
  });

  await dbclose();

  result.acknowledged
    ? res.status(201).json(objectCreated)
    : res.status(500).json({ error: "post failed. try again later." });
});

module.exports = router;
