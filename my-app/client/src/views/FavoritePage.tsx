import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Post.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { suggestTag } from "../constants/constants";
import { IPost } from "../../../PostInterface";


interface recipe_content extends IPost {
 _id: string;
}


interface recipe_props {
 recipe: recipe_content;
}


const Recipe: React.FC<recipe_props> = ({ recipe }) => (
 <Link to={`/recipe/${recipe._id}`} style={{ color: "inherit", textDecoration: "none" }}>
   <li className="list-group-item d-flex flex-column justify-content-between mb-5 p-5 align-items-left border rounded">
     <div className="mb-2" style={{ fontSize: "20px", fontWeight: "bold" }}>{recipe.name}</div>
     <div className="mb-2">4.2R - 12 likes - Sept 12</div>
     <div className="tags-container p-2 mt-2">
       {suggestTag.map((tag) => (
         <span
           key={tag}
           className="badge me-2"
           style={{ backgroundColor: "lightblue", color: "black", fontSize: "15px" }}
         >
           {tag}
         </span>
       ))}
     </div>
   </li>
 </Link>
);


export default function FavoritePage() {
 const [recipes, setRecipes] = useState<recipe_content[]>([]);
 const [favoriteList, setFavoriteList] = useState<string[]>([]);


 useEffect(() => {
   async function getRecipes() {
     const response = await fetch(`http://localhost:5050/recipe?`);
     if (!response.ok) {
       console.error(`An error occurred: ${response.statusText}`);
       return;
     }
     const foundRecipes = (await response.json()) as recipe_content[];
     setRecipes(foundRecipes);
   }


   // Fetch the favorite list from localStorage
   const savedFavorites = localStorage.getItem("favoriteList");
   if (savedFavorites) {
     setFavoriteList(JSON.parse(savedFavorites));
   }


   getRecipes();
 }, []);


 const favoriteRecipes = recipes.filter((recipe) => favoriteList.includes(recipe._id));


 return (
   <div className="row mt-3" style={{ display: "flex", flexWrap: "wrap" }}>
     {favoriteRecipes.length > 0 ? (
       favoriteRecipes.map((recipe) => (
         <div className="col-sm-4" key={recipe._id}>
           <Recipe recipe={recipe} />
         </div>
       ))
     ) : (
       <div className="col-12">
         <p>No favorite recipes yet. Start bookmarking your favorites!</p>
       </div>
     )}
   </div>
 );
}