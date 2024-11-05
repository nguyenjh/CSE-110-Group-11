import express from "express"
import db from "../db/connection.js"
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("recipe");
  let results = await collection.find({}).toArray();
  res.send(results).status;
});

router.get("/:id", async (req, res) => {
  let collection = await db.collection("recipe");
  let query = {_id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if(!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      summary: req.body.summary,
      instructions: req.body.instructions,
    }
    let collection = await db.collection("recipe");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  }

  catch(err) {
    console.error(err);
    res.status(500).send("Error adding recipe");
  }
});

router.patch("/:id", async(req,res) => {
  try {
    const query = { _id: new ObjectId(req.params.id)};
    const updates = {
      $set: {
        name: req.body.name,
        summary: req.body.summary,
        instructions: req.body.instructions,
      },};

    let collection = await db.collection("recipe");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  }

  catch{
    console.error(err);
    res.status(500).send("Error updating recipe");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id)};
    const collection = db.collection("recipe");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  }

  catch(err){
    console.error(err);
    res.status(500).send("Error deleting recipe");
  }
});

export default router;