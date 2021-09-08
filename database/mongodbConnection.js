const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

const client = new MongoClient(uri, options);

const charactersRM = client
  .db(process.env.DB_NAME)
  .collection(process.env.COLLECTION);

async function dbconnect() {
  try {
    await client.connect();
    console.log(
      `Connection to MongoDB successful. Using database: ${process.env.DB_NAME}`
    );
  } catch (err) {
    console.log(`Connection failed. Error: ${err}`);
  }
}

/* async function dbclose() {
    try {
        await client.close(); 
        console.log('Connection to MongoDB succesfully closed.');
    } catch(err) {
        await client.close(true, () => console.log(`Connection to MongoDB forcefully closed. Error: ${err}`));
    }
}
*/

async function dbclose() {
  await client.close(false, () =>
    console.log("connection to MongoDB-mongodbdriver closed")
  );
}

module.exports = {
  client,
  charactersRM,
  dbconnect,
  dbclose,
  ObjectId,
};
