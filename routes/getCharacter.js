const router = require("express").Router();
const dotenv = require("dotenv").config();
const { dbconnect, dbclose } = require("../database/mongodbConnection");
const { checkId, doesItExist } = require("../functionsLibrary");

//GET /characters/:id, returns character by id
router.get("/characters/:id", async (req, res) => {
  const id = req.params.id;
  checkId(id);

  await dbconnect();
  let character = await doesItExist(id);
  character
    ? res.send(character)
    : res.status(404).json({ response: "character not found!" });
  await dbclose();
});

module.exports = router;
