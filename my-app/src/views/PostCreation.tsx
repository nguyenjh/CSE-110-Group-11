import React from "react";
import RecipeBanner from "../components/RecipeBanner";
import RecipeSummary from "../components/RecipeSummary";
import RecipeAdditionalPhoto from "../components/RecipeAdditionalPhoto";
import RecipeDirections from "../components/RecipeDirections";
import IngredientsList from "../components/IngredientsList";
import { IngredientsProvider } from "../context/IngredientsContext";
import { DirectionsProvider } from "../context/DirectionsContext";

function PostCreation() {
  return (
    <form>
      <div id="create-recipe">
        <RecipeBanner />
        <RecipeSummary />
        <IngredientsProvider>
          <IngredientsList />
        </IngredientsProvider>
        <RecipeAdditionalPhoto />
        <DirectionsProvider>
          <RecipeDirections />
        </DirectionsProvider>
        <button type="submit" className="recipe-button">
          <b>Submit</b>
        </button>
      </div>
    </form>
  );
}

export default PostCreation;
