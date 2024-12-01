////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// recipe_route.js
// Code is modified from MongoDB MERN tutorial
//
// Our express router file that will define the behavior between frontend requests(GET, POST, etc.) 
// and backend responses(relaying requests back to MongoDB Atlas). 
// Assembled by Alex Paz
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

import express from "express"
import { getPost, addPost, getFilteredPosts} from "../controllers/postController";
import { protect } from "../middleware/auth"

const router = express.Router();

// GET Request for All Recipes: If the route is homepage and a default request was made, send full recipe database.
router.get("/", getFilteredPosts);

// GET Request for Specific Recipe: If the route is homepage/:id and a default request is made, send the single 
// recipe with matching id to the database.
router.get("/:id", getPost);

// POST Request to add recipe to database.
router.post("/", protect, addPost);
// Patch Request to Update a Specific Recipe: When on homepage/:id page, compile the form data 
// from req and update the recipe found from the id param. 

/*router.patch("/:id", async(req,res) => {
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

// DELETE Request to Delete a Specific Recipe: When on homepage/:id, get the recipe through 
// the id param and delete the query from the collection.
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
});*/

export default router;