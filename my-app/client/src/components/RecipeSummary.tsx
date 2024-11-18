import {useContext} from "react";
import { recipeContext } from "../context/RecipeContext";

function RecipeSummary() {
  const context = useContext(recipeContext);
  if (!context) {
    throw new Error('Component must be used within a RecipeProvider');
  }
  const { recipeForm, setRecipeForm } = context;

  return (
    <div id="recipe-summary">
      <div id="recipe-title">
        <h2>Title:</h2>
      </div>
      <div id='recipe-title-input' className="large-input-field">
        <input type="text" 
        required
        value = {recipeForm.name}
        onChange = {(e) => setRecipeForm({...recipeForm, name: e.target.value})}/>
      </div>
      <div id="recipe-tags">
        <h2>Tags:</h2>
      </div>
      <div id="tag-selection" className="large-input-field">
        <select name="tags" multiple>
          <option value="apple">Apple</option>
          <option value="orange">Orange</option>
          <option value="banana">Banana</option>
          <option value="grape">Grape</option>
        </select>
      </div>
      <div>
        <label htmlFor="calories">Calories:</label>
        <input type="number" 
        required
        value = {recipeForm.calories === 0 ? '' : recipeForm.calories}
        onChange = {(e) => setRecipeForm({...recipeForm, calories: Number(e.target.value)})}/>
      </div>
      <div>
        <label htmlFor="prep-time">Prep Time:</label>
        <input type="number" 
        required
        value = {recipeForm.prep_time === 0 ? '' : recipeForm.prep_time}
        onChange = {(e) => setRecipeForm({...recipeForm, prep_time: Number(e.target.value)})}/>
      </div>
      <div>
        <label htmlFor="servings">Servings:</label>
        <input type="number" 
        required
        value = {recipeForm.serving === 0 ? '' : recipeForm.serving}
        onChange = {(e) => setRecipeForm({...recipeForm, serving: Number(e.target.value)})}/>
      </div>
      <div>
        <label htmlFor="total-time">Total Time:</label>
        <input type="number" 
        required
        value = {recipeForm.estimated_total_time === 0 ? '' : recipeForm.estimated_total_time}
        onChange = {(e) => setRecipeForm({...recipeForm, estimated_total_time: Number(e.target.value)})}/>
      </div>
    </div>
  );
}

export default RecipeSummary;
