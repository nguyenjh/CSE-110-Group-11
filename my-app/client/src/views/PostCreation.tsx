import React, { useContext} from "react";
import RecipeBanner from "../components/RecipeBanner";
import RecipeSummary from "../components/RecipeSummary";
import RecipeAdditionalPhoto from "../components/RecipeAdditionalPhoto";
import RecipeDirections from "../components/RecipeDirections";
import IngredientsList from "../components/IngredientsList";
import { recipeContext } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";
import "../css/PostCreation.css";

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
  
      response = await fetch(`http://localhost:5050/recipe/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: post.name,
          rating: 5,
          likes: 10,
          summary: "A delicious recipe.",
          prep_time: post.prep_time,
          prep_time_unit: "minutes",
          estimated_total_time: post.estimated_total_time,
          estimated_total_time_unit: "minutes",
          serving: post.serving,
          calories: post.calories,
          cost: post.cost,
          tags: ["easy", "healthy"],
          ingredients: ["ingredient 1", "ingredient 2"],
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
          <RecipeSummary />
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
