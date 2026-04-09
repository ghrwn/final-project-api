const { MongoClient } = require("mongodb");
require("dotenv").config();

let database;

async function connectToDb() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  database = client.db("finalProjectDb");
}

function getDb() {
  return database;
}

module.exports = { connectToDb, getDb };