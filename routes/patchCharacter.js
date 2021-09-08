const router = require('express').Router();
const dotenv = require('dotenv').config();
const { charactersRM, ObjectId, dbconnect, dbclose } = require('../database/mongodbConnection');
const {checkId, sanitizeObjectPatch, doesItExist} = require('../functionsLibrary');

//PATCH /characters/:id, patchs a given character by id
router.patch('/characters/:id', async (req, res) => {
    const id = req.params.id;
    checkId(id);

    await dbconnect();
    //ends the code if document does not exist
    let isADocument = await doesItExist(id);
    if (!isADocument) {
        res.status(404).json({"response": "game not found!"});
        return;
    }

    let objectPatch = req.body;
    let objectClean = sanitizeObjectPatch(objectPatch);

    const patchQuery = {_id: ObjectId(id)};
    const patchObject = { $set: objectClean };
    const patchOptions = { upsert: false }
    const patchingObject = await charactersRM.findOneAndUpdate(patchQuery, patchObject, patchOptions);
    const patchedObject = await charactersRM.findOne(patchQuery);

    await dbclose();

    patchingObject.lastErrorObject.updatedExisting ? res.json(patchedObject) : res.status(500).json({"error": "failed to patch. try again later."});
});

module.exports = router;