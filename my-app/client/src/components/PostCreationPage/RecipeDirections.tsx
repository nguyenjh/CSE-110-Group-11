import { useContext } from "react";
import { recipeContext } from "../../context/RecipeContext";
import { recipeFormErrorContext } from "../../context/RecipeFormErrorsContext";

function RecipeDirections() {
  // Recipe context for db post
  const context = useContext(recipeContext);
  if (!context) {
    throw new Error('Component must be used within a RecipeProvider');
  }
  const { recipeForm, setRecipeForm } = context;
  // Recipe error context from parent wrapper
  const errorContext = useContext(recipeFormErrorContext);
  if (!errorContext) {
    throw new Error('Component must be used within a RecipeProvider');
  }
  const { recipeFormError } = errorContext;

  const addDirection = () => {
    setRecipeForm({...recipeForm, directions: [...(recipeForm.directions ?? []), ""]});
  };

  const removeDirection = (index:number) => {
    setRecipeForm({...recipeForm, directions: (recipeForm.directions ?? []).filter((_, i) => i !== index)});
  };

  return (
    <div id="directions">
      <div>
        <h2>Directions*</h2>
        <div id="directions-list">
          <ol>
            {(recipeForm.directions ?? []).map((input, index) => (
              <li key={index}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => {
                    const newDirections = [...(recipeForm.directions ?? [])];
                    newDirections[index] = e.target.value;
                    setRecipeForm({...recipeForm, directions: newDirections});
                  }}
                />
                <button type="button" onClick={() => removeDirection(index)}>x</button>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <button type="button" className="recipe-button" onClick={addDirection}>
        Add Step
      </button>
      {recipeFormError.directions && <span className="error">{recipeFormError.directions}</span>}
    </div>
  );
}

export default RecipeDirections;
