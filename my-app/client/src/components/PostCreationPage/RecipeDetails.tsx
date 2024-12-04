import React, { useContext, useState } from "react";
import { recipeContext } from "../../context/RecipeContext";
import { recipeFormErrorContext } from "../../context/RecipeFormErrorsContext";
import { suggestTag } from "../../constants/constants";

function RecipeDetails() {
  const context = useContext(recipeContext);
  if (!context) {
    throw new Error("Component must be used within a RecipeProvider");
  }
  const { recipeForm, setRecipeForm } = context;

  const recipeError = useContext(recipeFormErrorContext);
  if (!recipeError) {
    throw new Error('Component must be used within a RecipeProvider');
  }
  const { recipeFormError } = recipeError;

  const [disabledTags, setDisabledTags] = useState<Record<string, boolean>>({});

  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTagsIndices = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    if (selectedTagsIndices.length > 3) {
      const newDisabledTags: Record<string, boolean> = {};
      Array.from(event.target.options).forEach((option) => {
        if (!selectedTagsIndices.includes(option.value)) {
          newDisabledTags[option.value] = true; // Disable unselected options
        }
      });
      setDisabledTags(newDisabledTags);
    } else {
      setDisabledTags({}); // Reset disabled state when fewer than 3 are selected
    }
    const selectedTags = selectedTagsIndices.map(index => suggestTag[parseInt(index)]);
    setRecipeForm({ ...recipeForm, tags: selectedTags });
  };

  return (
    <div id="recipe-details">
      {/* Cost input */}
      <div id="recipe-cost">
        <h2>Cost ($):*</h2>
      </div>
      <div id="recipe-cost-input">
        <input
          type="number"
          name="cost-ranges"
          id="cost"
          onChange={(e) =>
            setRecipeForm({ ...recipeForm, cost: Number(e.target.value) })
          }
        />
        {recipeFormError.cost && <span className="error">{recipeFormError.cost}</span>}
      </div>

      {/* Tags input */}
      <div id="recipe-tags">
        <h2>Tags:</h2>
        <span>CTRL+click to select multiple</span><br/>
        <span><i>(4 tags max)</i></span>
      </div>

      <div id="tag-selection" className="large-input-field">
        <select
          name="tags"
          className="multiple-selector"
          onChange={handleTagChange}
          multiple
        >
          {suggestTag.map((item, index) => (
            <option
              data-testid={`tag-${index}`}
              value={index}
              key={index}
              label={item}
              disabled={disabledTags[index.toString()]}
            >
              {item}
            </option>
          ))}
        </select>
        {recipeFormError.tags && <span className="error">{recipeFormError.tags}</span>}
      </div>

      {/* Calories input */}
      <div>
        <label htmlFor="calories">Calories (kcal):*</label>
        <input
          type="number"
          id="calories"
          value={recipeForm.calories === 0 ? "" : recipeForm.calories}
          onChange={(e) =>
            setRecipeForm({ ...recipeForm, calories: Number(e.target.value) })
          }
        />
        {recipeFormError.calories && <span className="error">{recipeFormError.calories}</span>}
      </div>

      {/* Prep Time input */}
      <div>
        <label htmlFor="prep-time">Prep Time (minutes):*</label>
        <input
          type="number"
          id="prep-time"
          value={recipeForm.prep_time === 0 ? "" : recipeForm.prep_time}
          onChange={(e) =>
            setRecipeForm({ ...recipeForm, prep_time: Number(e.target.value) })
          }
        />
        {recipeFormError.prep_time && <span className="error">{recipeFormError.prep_time}</span>}
      </div>

      {/* Serving size input */}
      <div>
        <label htmlFor="servings">Servings (#):*</label>
        <input
          type="number"
          id="servings"
          value={recipeForm.serving === 0 ? "" : recipeForm.serving}
          onChange={(e) =>
            setRecipeForm({ ...recipeForm, serving: Number(e.target.value) })
          }
        />
        {recipeFormError.servings && <span className="error">{recipeFormError.servings}</span>}
      </div>

      {/* Total time input */}
      <div>
        <label htmlFor="total-time">Total Time (minutes):*</label>
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
        />
        {recipeFormError.total_time && <span className="error">{recipeFormError.total_time}</span>}
      </div>
    </div>
  );
}

export default RecipeDetails;
