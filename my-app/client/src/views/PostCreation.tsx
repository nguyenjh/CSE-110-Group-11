import React, { useContext, useState } from "react";
import RecipeBanner from "../components/PostCreationPage/RecipeBanner";
import RecipeDetails from "../components/PostCreationPage/RecipeDetails";
import RecipeAdditionalPhoto from "../components/PostCreationPage/RecipeAdditionalPhoto";
import RecipeDirections from "../components/PostCreationPage/RecipeDirections";
import IngredientsList from "../components/PostCreationPage/IngredientsList";
import { recipeContext } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";
import "../css/PostCreation.css";
import RecipeMain from "../components/PostCreationPage/RecipeMain";
import { recipeFormErrorContext } from "../context/RecipeFormErrorsContext";

function PostCreation() {
  const navigate = useNavigate();

  // Context provided for the actual recipe contents that will eventually get posted to db
  const context = useContext(recipeContext);
  if (!context) {
    throw new Error('Component must be used within a RecipeProvider');
  }
  const { recipeForm, setRecipeForm } = context;

  // Context for the error messages associated with the child components
  const recipeError = useContext(recipeFormErrorContext);
  if (!recipeError) {
    throw new Error('Component must be used within a RecipeProvider');
  }
  const { recipeFormError, setRecipeFormError } = recipeError;

  /* 
   * Checks form is filled in expected format for each field
  */
  const validateForm = () => {
    let isValid = true;
    let validationErrors = {
      title: '',
      summary: '',
      cost: '',
      tags: '',
      calories: '',
      prep_time: '',
      servings: '',
      total_time: '',
      ingredients: '',
      directions: '',
      form: ''
    };

    if (recipeForm.name.length < 4) {
      validationErrors.title = 'Please enter a title.';
      console.log('Please enter a title.')
      isValid = false;
    }

    if (recipeForm.summary.length > 300) {
      validationErrors.summary = 'Summary must be less than 300 characters.';
      isValid = false;
    }

    if (recipeForm.cost <= 0) {
      validationErrors.cost = 'Please enter a valid cost.';
      isValid = false;
    }
    if (recipeForm.tags.length > 4) {
      validationErrors.tags = 'Please select 4 or less tags.';
      isValid = false;
    }
    if (recipeForm.calories <= 0) {
      validationErrors.calories = 'Please enter a valid calorie count.';
      isValid = false;
    }
    if (recipeForm.prep_time <= 0) {
      validationErrors.prep_time = 'Please enter a valid cost.';
      isValid = false;
    }
    if (recipeForm.serving <= 0) {
      validationErrors.servings = 'Please enter a valid number of servings.';
      isValid = false;
    }
    if (recipeForm.estimated_total_time <= 0) {
      validationErrors.total_time = 'Please enter the expected total time.';
      isValid = false;
    }
    if (recipeForm.ingredients.length < 1) {
      validationErrors.ingredients = 'Ingredients list cannot be empty.';
      isValid = false;
    }
    if (recipeForm.ingredients.includes("")) {
      validationErrors.ingredients = 'Ingredient cannot be empty.';
      isValid = false;
    }
    if (recipeForm.ingredients.includes("")) {
      validationErrors.ingredients = 'Ingredient cannot be empty.';
      isValid = false;
    }
    if (recipeForm.directions.includes("")) {
      validationErrors.directions = 'Directions step cannot be empty.';
      isValid = false;
    }
    if (recipeForm.directions.length < 1) {
      validationErrors.directions = 'List of directions cannot be empty.'
      isValid = false;
    }

    if (!isValid) {
      validationErrors.form = '*Please check the fields above';
    } 
    setRecipeFormError(validationErrors);
    return isValid;
  };

  /*
   * Validates form fields to make sure all are in the expected format before sending
   * post request to db to upload an entry with all the associated recipe values 
   */
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('hello')
    const isValid = validateForm();
    if(!isValid) return;

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
          prep_time_unit: "minutes",
          estimated_total_time: post.estimated_total_time,
          estimated_total_time_unit: "minutes",
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
      <span>
        <button type="submit" className="recipe-button">
          <b>Submit</b>
        </button >
        {recipeFormError.form && <span className="error">{recipeFormError.form}</span>}
      </span>
      </div>
    </form>
  );
}

export default PostCreation;
