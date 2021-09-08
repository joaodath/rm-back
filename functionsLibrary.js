//Function to sanitize the input
function sanitizeObjectInput(input) {
    const objectClean = {
    'nome': input.nome,
    'imagemUrl': input.imagemUrl
    };
    return objectClean;
};

//Function to sanitize the input from patch
//This way, only the data allowed will be updated. The user won't be able to 
//update the id or send new fields.
function sanitizeObjectPatch(input) {
    const output = {};
    if (input.nome) {
        output.nome = (input.nome).toString();
    }
    if (input.imagemUrl) {
        output.imagemUrl = (input.imagemUrl).toString();
    }
    return output;
};

//Checks the json object (input) for empty fields
function checkEmptyInput(input, res) {
    if (!input || !input.nome || !input.imagemUrl) {
        res.status(400).json({error: `All fields are required! Refer to documentation`});
        return;
    }
}

//Checks if the id passed is valid on MongoDB
function checkId(id, res) {
    const { ObjectId } = require('mongodb');
    if(!ObjectId.isValid(id)){
        res.status(422).json({error: 'ID is invalid'});
        return;
    }
}

async function doesItExist(id) {
    //Checks if the object with given id exists and returns the object if found or else returns and error
    const { charactersRM, ObjectId } = require('./database/mongodbConnection');
    
    const objectReturn = await charactersRM.findOne({ _id: ObjectId(id) });

    return objectReturn; 
}

function testFunction() {
    console.log('I\'m okay!');
}

module.exports = {
    sanitizeObjectInput,
    sanitizeObjectPatch,
    checkEmptyInput,
    checkId,
    doesItExist,
    testFunction
};

// async function doesItPatch(id, res) {
//     //Checks if the object with given id exists and returns the object if found or else returns and error
//     const { charactersRM, ObjectId } = require('./database/mongodbConnection');
    
//     const gameReturn = await charactersRM.findOne({ _id: ObjectId(id) });

   
//     if (!gameReturn) {
//         res.status(404).json({"response": "game not found!"});
//         return;
//     }

// }


/*
async function doesItExist(id, res, patch) {
    //Checks if the object with given id exists and returns the object if found or else returns and error
    const dotenv = require('dotenv').config();
    const { client, ObjectId } = require('./database/mongodbdriver');
    
    const gameReturn = await client.db(process.env.DB_NAME).collection(process.env.COLLECTION).findOne({ _id: ObjectId(id) });

    if (!patch) {
        let createResponse = [
            {'status': 200}, 
            {'response': gameReturn}];

        if (gameReturn) {
            createResponse
        } else {
            createResponse.status(404);
            createResponse.response("game not found!");
    } else {} if (!gameReturn) {
            res.status(404).json({"response": "game not found!"});
            return;
        }
    }
    
}
*/