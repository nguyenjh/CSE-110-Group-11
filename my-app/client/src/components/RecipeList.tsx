////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RecipeList.tsx
// Code is modified from MongoDB MERN tutorial
//
// Component to create a recipe list from recipes in the database. This component defines the delete function 
// and button as the edit button.
//
// Assembled by Alex Paz.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import {suggestTag} from "../constants/constants";
import "../css/Post.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";


interface recipe_content {
  name: string;
  rating: number;
  likes: number;
  summary: string;
  prep_time: number;
  prep_time_unit: string;
  estimated_total_time: number;
  estimated_total_time_unit: string;
  serving: number;
  calories: number;
  cost: number;
  tags: string[];
  ingredients: string[];
  directions: string[];
  _id: number;
}

interface recipe_props {
  recipe: recipe_content;
}

// Recipe component called to create the recipeList using the recipes in the database.
const Recipe: React.FC<recipe_props> = ({recipe}) => (
  <Link to={`/recipe/${recipe._id}`} style={{ color: 'inherit', textDecoration: 'none'}}>
    <li className = "list-group-item d-flex flex-column justify-content-between mb-5 p-5 align-items-left border rounded">
      <div className="mb-2" style = {{fontSize: "20px", fontWeight:"bold"}}>{recipe.name}</div>
      <div className="mb-2">4.2R - 12 likes - Sept 12</div>
      <div className="tags-container p-2 mt-2" >
          {suggestTag.map((tag) => (
              <span key={tag} className="badge me-2" style = {{ backgroundColor: "lightblue", color: "black", fontSize: "15px"}}>{tag}</span>
          ))}
      </div>
    </li>
  </Link>
  
);


export default function RecipeList() {
  const [recipes, setRecipes] = useState<recipe_content[]>([]);

  // This method fetches the recipes from the database once on initialization and anytime the recipe length changes.
  useEffect(() => {
    async function getRecipes() {
      const response = await fetch(`http://localhost:5050/recipe/`);

      // Error checking
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }

      // response is typed check with our recipe_content interface and then parsed.
      const foundRecipes = await response.json() as recipe_content[];
      setRecipes(foundRecipes);
    }
    getRecipes();
    return;
  }, [recipes.length]);

  // This following section will display the table with the recipes of individuals.
  return (
    <div className="row mt-3" style={{ display: "flex", flexWrap: "wrap" }}>
      {recipes.map((recipe) => (
          <div className="col-sm-4" key={recipe._id}> {/* 3 columns for each post using booststrap*/}
              <Recipe
                  recipe={recipe}
                  key={recipe._id}
              />
          </div>
      ))}
    </div>
  );
}