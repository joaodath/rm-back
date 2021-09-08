const router = require("express").Router();
const {
  charactersRM,
  ObjectId,
  dbconnect,
  dbclose,
} = require("../database/mongodbConnection");
const { checkId, doesItExist } = require("../functionsLibrary");

//DELETE /characters/:id - deletes a character with the given id
router.delete("/characters/:id", async (req, res) => {
  const id = req.params.id;
  checkId(id);

  await dbconnect();
  let isADocument = await doesItExist(id);
  if (!isADocument) {
    res.status(404).json({ response: "character not found!" });
  }

  let deleteResult = await charactersRM.deleteOne({ _id: ObjectId(id) });
  await dbclose();

  deleteResult.deletedCount === 1
    ? res.status(204)
    : res.status(500).json({
        error: "could not delete the character now. try again later.",
      });
});

module.exports = router;
