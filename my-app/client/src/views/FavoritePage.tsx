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

// Recipe component to display individual recipes
const Recipe: React.FC<recipe_props> = ({ recipe }) => {
  const [likes, setLikes] = useState(() => {
    const storedLikes = localStorage.getItem(`likes_${recipe._id}`);
    return storedLikes ? parseInt(storedLikes, 10) : recipe.likes;
  });

  useEffect(() => {
    const storedLikes = localStorage.getItem(`likes_${recipe._id}`);
    if (storedLikes && parseInt(storedLikes, 10) !== likes) {
      setLikes(parseInt(storedLikes, 10));
    }
  }, [recipe._id, likes]);

  return (
    <div className="recipe-list">
      <div className="topbar-title">Favorites</div>
      <Link
        to={`/recipe/${recipe._id}`}
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <li className="recipe-card">
          <div className="recipe-name">{recipe.name}</div>
          <div className="recipe-info">
            {recipe.rating}R - {likes} likes - {recipe.estimated_total_time} min
          </div>
          <div className="tags-container">
            {recipe.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </li>
      </Link>
    </div>
  );
};


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