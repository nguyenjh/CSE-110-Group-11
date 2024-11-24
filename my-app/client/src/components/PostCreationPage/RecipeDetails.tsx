import React, { useContext, useState } from "react";
import { recipeContext } from "../../context/RecipeContext";
import { suggestTag } from "../../constants/constants";

function RecipeDetails() {
  const context = useContext(recipeContext);
  if (!context) {
    throw new Error("Component must be used within a RecipeProvider");
  }
  const { recipeForm, setRecipeForm } = context;

  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTags = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setRecipeForm({ ...recipeForm, tags: selectedTags });
  };

  // State and handlers of units to display an empty string by default and 
  // this requires users to choose a valid unit (hours or minutes)
  const [selectedPrepUnit, setSelectedPrepUnit] = useState("");
  
  const handlePrepUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setRecipeForm({...recipeForm, prep_time_unit: event.target.value});
      setSelectedPrepUnit(event.target.value);
  }

  const [selectedTotalUnit, setSelectedTotalUnit] = useState("");

  const handleTotalUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setRecipeForm({...recipeForm, estimated_total_time_unit: event.target.value});
      setSelectedTotalUnit(event.target.value);
  }

  return (
    <div id="recipe-details">
      {/* Cost input */}
      <div id="recipe-cost">
        <h2>Cost ($):</h2>
      </div>
      <div id="recipe-cost-input">
        <input
          type="number"
          name="cost-ranges"
          id="cost"
          onChange={(e) =>
            setRecipeForm({ ...recipeForm, cost: Number(e.target.value) })
          }
          required
        />
      </div>

      {/* Tags input */}
      <div id="recipe-tags">
        <h2>Tags:</h2>
        <span>CTRL+click to select multiple</span>
      </div>
      
      <div id="tag-selection" className="large-input-field">
        <select
          name="tags"
          className="multiple-selector"
          onChange={handleTagChange}
          multiple
        >
          {suggestTag.map((item, index) => (
            <option data-testid={`tag-${index}`} key={index} label={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      
      {/* Calories input */}
      <div>
        <label htmlFor="calories">Calories (kcal):</label>
        <input
          type="number"
          id="calories"
          value={recipeForm.calories === 0 ? "" : recipeForm.calories}
          onChange={(e) =>
            setRecipeForm({ ...recipeForm, calories: Number(e.target.value) })
          }
          required
        />
      </div>
      
      {/* Prep Time input */}
      <div>
        <label htmlFor="prep-time">Prep Time:</label>
        <input
          type="number"
          id="prep-time"
          value={recipeForm.prep_time === 0 ? "" : recipeForm.prep_time}
          onChange={(e) =>
            setRecipeForm({ ...recipeForm, prep_time: Number(e.target.value) })
          }
          required
        />
        {/* Prep time units */}
        <select
          name="time-unit-input"
          className="time-unit-input"
          onChange={handlePrepUnitChange}
          value={selectedPrepUnit}
          required
        >
          <option value="" disabled>--Select an option--</option>
          <option value="Hours">Hours</option>
          <option value="Minutes">Minutes</option>
        </select>
      </div>
      
      {/* Serving size input */}
      <div>
        <label htmlFor="servings">Servings (#):</label>
        <input
          type="number"
          id="servings"
          value={recipeForm.serving === 0 ? "" : recipeForm.serving}
          onChange={(e) =>
            setRecipeForm({ ...recipeForm, serving: Number(e.target.value) })
          }
          required
          />
      </div>

      {/* Total time input */}
      <div>
        <label htmlFor="total-time">Total Time:</label>
        <input
          type="number"
          id="total-time"
          value={
            recipeForm.estimated_total_time === 0
            ? ""
            : recipeForm.estimated_total_time
          }
          onChange={(e) =>
            setRecipeForm({
              ...recipeForm,
              estimated_total_time: Number(e.target.value),
            })
          }
          required
        />
        {/* Total time units */}
        <select
          name="time-unit-input"
          className="time-unit-input"
          value={selectedTotalUnit}
          onChange={handleTotalUnitChange}
          required
        >
          <option value="" disabled>--Select an option--</option>
          <option value="Hours">Hours</option>
          <option value="Minutes">Minutes</option>
        </select>
      </div>
    </div>
  );
}

export default RecipeDetails;
