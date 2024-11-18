import React, { useContext} from "react";
import RecipeBanner from "../components/PostCreationPage/RecipeBanner";
import RecipeSummary from "../components/PostCreationPage/RecipeSummary";
import RecipeAdditionalPhoto from "../components/PostCreationPage/RecipeAdditionalPhoto";
import RecipeDirections from "../components/PostCreationPage/RecipeDirections";
import IngredientsList from "../components/PostCreationPage/IngredientsList";
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
  
      response = await fetch("http://localhost:5050/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
      setRecipeForm({...recipeForm, name: "", summary: [], instructions:[]});
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
