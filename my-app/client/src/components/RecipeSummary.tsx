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
        <input type="text" id="calories"/>
      </div>
      <div>
        <label htmlFor="prep-time">Prep Time:</label>
        <input type="text" id="prep-time"/>
      </div>
      <div>
        <label htmlFor="servings">Servings:</label>
        <input type="text" id="servings"/>
      </div>
      <div>
        <label htmlFor="total-time">Total Time:</label>
        <input type="text" id="total-time"/>
      </div>
    </div>
  );
}

export default RecipeSummary;
