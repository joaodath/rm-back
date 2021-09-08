const router = require('express').Router();
const dotenv = require('dotenv').config();
const { client, charactersRM, dbconnect, dbclose } = require('../database/mongodbConnection');

//GET /characters, returns all characters
router.get('/', async (req, res) => {
    
    await dbconnect();

    const charactersCursor = await charactersRM.find({});
    const charactersArr = await charactersCursor.toArray();

    await dbclose()

    charactersArr ? res.send(charactersArr) : res.json({"response": "it works but the database has no data."})
});

module.exports = router;