////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// server.js
// Code is modified from MongoDB MERN tutorial'
//
// Connects all parts of our server and runs it on port 5050 from config.env
// Assembled by Alex Paz
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

import express from "express";
import cors from "cors";
import recipes from "./routes/recipe_route.js"

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/recipe", recipes);

app.listen(PORT, () => {
  console.log('Server on ${PORT}');
});