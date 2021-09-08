const express = require('express');
const dotenv = require('dotenv').config();

//Initializes the server
const app = express();
const port = process.env.PORT || 7000;

app.use(express.json());

//enabling CORS
var cors = require("cors");
app.use(cors());
app.options("*", cors());


//imports the routes
const deleteCharacter = require('./routes/deleteCharacter');
const getAllCharacters = require('./routes/getAllCharacters');
const getCharacter = require('./routes/getCharacter');
const postCharacter = require('./routes/postCharacter');
const putCharacter = require('./routes/putCharacter');

//consumes the routes
app.use("/characters", getAllCharacters);
app.use(getCharacter);
app.use(postCharacter);
app.use(putCharacter);
app.use(deleteCharacter);

//error middlewares
const endpointNotFound = require('./middlewares/err404');
app.use(endpointNotFound);
// const error500 = require('./middlewares/err500');
// app.use(error500);

app.listen(port, () => {
    console.log(
    `Server running on port ${port}`
    );
})