const router = require("express").Router();
const {
  charactersRM,
  ObjectId,
  dbconnect,
  dbclose,
} = require("../database/mongodbConnection");
const {
  checkEmptyInput,
  sanitizeObjectInput,
  checkId,
  doesItExist,
} = require("../functionsLibrary");

//PUT /characters/:id - updates a character with the given id
router.put("/characters/:id", async (req, res) => {
  const id = req.params.id;
  checkId(id, res);

  await dbconnect();
  let isADocument = await doesItExist(id);

  let incomingObject = req.body;
  checkEmptyInput(incomingObject);
  let cleanObject = sanitizeObjectInput(incomingObject);

  const updateQuery = { _id: ObjectId(id) };
  const updateObject = { $set: cleanObject };
  const updateOptions = { upsert: true };
  const updatingObject = await charactersRM.findOneAndUpdate(
    updateQuery,
    updateObject,
    updateOptions
  );
  const updatedObject = await charactersRM.findOne(updateQuery);

  await dbclose();

  updatingObject.lastErrorObject.updatedExisting
    ? res.json(updatedObject)
    : res.status(500).json({ error: "failed to update. try again later." });
});

module.exports = router;
