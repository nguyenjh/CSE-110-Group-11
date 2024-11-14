////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// connection.js
// Code is modified from MongoDB MERN tutorial
// 
// This code handles the initial connection of our MongoDB client to our MongoDB Atlas server and database
// and exports the "recipes" database.
// Assembled by Alex Paz 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { MongoClient, ServerApiVersion } from "mongodb";

// Grab the URI from config.env and use it to connect to our MongoClient. 
const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect our MongoClient to MongoDB.
try {
  await client.connect();
  // Confirm the client was successfully connected to MongoDB by pinging "admin".
  await client.db("admin").command({ping:1});
  console.log(
    "Connected to MongoDB"
  );
}
catch(err) {
  console.error(err);
}

// Grab the "recipes" database from our Atlas account.
let recipesDB = client.db("recipes");

export default recipesDB;