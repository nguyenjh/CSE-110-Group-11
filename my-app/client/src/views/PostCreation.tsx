import React, { useContext} from "react";
import RecipeBanner from "../components/PostCreationPage/RecipeBanner";
import RecipeDetails from "../components/PostCreationPage/RecipeDetails";
import RecipeAdditionalPhoto from "../components/PostCreationPage/RecipeAdditionalPhoto";
import RecipeDirections from "../components/PostCreationPage/RecipeDirections";
import IngredientsList from "../components/PostCreationPage/IngredientsList";
import { recipeContext } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";
import "../css/PostCreation.css";
import RecipeMain from "../components/PostCreationPage/RecipeMain";

function PostCreation() {
  const navigate = useNavigate();

  const context = useContext(recipeContext);
  if (!context) {
    throw new Error('Component must be used within a RecipeProvider');
  }
  const { recipeForm, setRecipeForm } = context;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const post = { ...recipeForm };
    try {
      let response;
  
      // Here we add a recipe to the database, however we have a few values that aren't from post, 
      // which we will either change later or remain default. 
      response = await fetch(`http://localhost:5050/recipe/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: post.name,
          rating: 5,
          likes: 10,
          summary: post.summary,
          prep_time: post.prep_time,
          prep_time_unit: post.prep_time_unit,
          estimated_total_time: post.estimated_total_time,
          estimated_total_time_unit: post.estimated_total_time_unit,
          serving: post.serving,
          calories: post.calories,
          cost: 5,
          tags: post.tags,
          ingredients: post.ingredients,
          directions: post.directions
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
      setRecipeForm({...recipeForm, name: "", summary: "", directions:[]});
      navigate("/");
    }
  }

  return (
    <form onSubmit = {onSubmit}>
      <div id="create-recipe">
          <RecipeBanner />
          <RecipeMain />
          <RecipeDetails />
          <IngredientsList />
          <RecipeAdditionalPhoto />
          <RecipeDirections />
        <button type="submit" className="recipe-button">
          <b>Submit</b>
        </button>
      </div>
    </form>
  );
}

export default PostCreation;
