////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RecipeList.tsx
// Code is modified from MongoDB MERN tutorial
//
// Component to create a recipe list from recipes in the database. This component defines the delete function 
// and button as the edit button.
//
// Assembled by Alex Paz.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState, useContext } from "react";
import {suggestTag} from "../constants/constants";
import "../css/Post.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { IPost } from "../../../PostInterface";
import { filterContext } from "../context/FilterContext";


interface recipe_content extends IPost {
  _id: string;
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
  const context = useContext(filterContext);
  if (!context) {
    throw new Error('Component must be used within a RecipeProvider');
  }
  const { filterForm, setFilterForm } = context;
  const [recipes, setRecipes] = useState<recipe_content[]>([]);

  useEffect(() => {
    console.log("ran query");
    console.log(filterForm);
    async function filterQuery(){
      const params = new URLSearchParams();
      if(filterForm.cost != ""){
        params.append('cost', filterForm.cost);
      }
      if(filterForm.calories != ""){
        params.append('calories', filterForm.calories);
      }
      if(filterForm.time != ""){
        params.append('time', filterForm.time);
      }
      if(filterForm.sortBy != ""){
        params.append('sortBy', filterForm.sortBy);
      }
  
      const url = `http://localhost:5050/recipe/filter?${params.toString()}`;
      const response = await fetch(url);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }

      const foundRecipes = await response.json() as recipe_content[];
      setRecipes(foundRecipes);
    }
    filterQuery();
  }, [filterForm]);

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