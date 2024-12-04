import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Post.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
  const [favoriteRecipes, setFavoriteRecipes] = useState<recipe_content[]>([]);

  const userString = localStorage.getItem('user');
  let user: { _id: string; token: string } | null = null; // Explicitly define the type
  let userId: string | null = null;
  let token: string | null = null;
    
    // Parse the JSON string into an object
  if (userString) {
      user = JSON.parse(userString);
      if (user && typeof user._id === 'string' && typeof user.token === 'string') {
          userId = user._id.toString();
          token = String(user.token);
          console.log('User ID:', userId);
      } else {
          console.warn('Invalid user data in localStorage');
      }
  }

    

  useEffect(() => {
    const fetchRecipes = async () => {
      const url = `http://localhost:5050/recipe/`;
      console.log("Fetching recipes with URL:", url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch recipes: ${response.statusText}`);
      }

      const foundRecipes = await response.json() as recipe_content[];
      console.log("Fetched recipes:", foundRecipes);

      setRecipes(foundRecipes);
      console.log("generated recipes");
    }

  const fetchFavorites = async () => {
    try {
        const response = await fetch(`http://localhost:5050/api/me/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
  
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch ratings');
        }
  
        const data = await response.json();
        console.log('Fetched user favorites:', data.favorites);
  
        // Check if any rating matches the recipeID
        const favorites = data.favorites;
        setFavoriteList(favorites);
        console.log("generated favorite list");
    }

    catch (error) {
      console.error('Error getting favorites:', error);
      throw error;
    }
    
  };

  fetchRecipes();
  fetchFavorites();
}, []);

  useEffect(() => {
    const favoriteRecipesList: recipe_content[] = recipes.filter((recipe) =>
      favoriteList.includes(recipe._id)
    );
    console.log("favorites?", favoriteRecipesList);
    setFavoriteRecipes(favoriteRecipesList);
    console.log("Generated new favorite recipes", favoriteRecipes);
  }, [recipes, favoriteList]);


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