import {useContext} from "react";
import { recipeContext } from "../../context/RecipeContext";
import { priceRanges, suggestTag } from "../../constants/constants";

function RecipeDetails() {
  const context = useContext(recipeContext);
  if (!context) {
    throw new Error('Component must be used within a RecipeProvider');
  }
  const { recipeForm, setRecipeForm } = context;

  return (
    <div id="recipe-details">
      <div id="recipe-cost">
        <h2>Cost:</h2>
      </div>
      <div id="recipe-cost-input">
        <select name="tags" className="multiple-selector" multiple>
            {priceRanges.map((item, index) => (
              <option data-testid={`price-option-${index}`} key={index} label={item}>{item}</option>
          ))}
        </select>
      </div>
      <div id="recipe-tags">
        <h2>Tags:</h2>
      </div>
      <div id="tag-selection" className="large-input-field">
        <select name="tags" className="multiple-selector" multiple>
          {suggestTag.map((item, index) => (
            <option data-testid={`tag-${index}`} key={index} label={item}>{item}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="calories">Calories:</label>
        <input type="number" 
        id="calories"
        required
        value = {recipeForm.calories === 0 ? '' : recipeForm.calories}
        onChange = {(e) => setRecipeForm({...recipeForm, calories: Number(e.target.value)})}/>
      </div>
      <div>
        <label htmlFor="prep-time">Prep Time:</label>
        <input type="number" 
        id="prep-time"
        required
        value = {recipeForm.prep_time === 0 ? '' : recipeForm.prep_time}
        onChange = {(e) => setRecipeForm({...recipeForm, prep_time: Number(e.target.value)})}/>
      </div>
      <div>
        <label htmlFor="servings">Servings:</label>
        <input type="number"
        id="servings" 
        required
        value = {recipeForm.serving === 0 ? '' : recipeForm.serving}
        onChange = {(e) => setRecipeForm({...recipeForm, serving: Number(e.target.value)})}/>
      </div>
      <div>
        <label htmlFor="total-time">Total Time:</label>
        <input type="number" 
        id="total-time"
        required
        value = {recipeForm.estimated_total_time === 0 ? '' : recipeForm.estimated_total_time}
        onChange = {(e) => setRecipeForm({...recipeForm, estimated_total_time: Number(e.target.value)})}/>
      </div>
    </div>
  );
}

export default RecipeDetails;
