import { useContext } from "react";
import { recipeContext } from "../../context/RecipeContext";
import { recipeFormErrorContext } from "../../context/RecipeFormErrorsContext";

function IngredientsList() {
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

  const addIngredient = () => {
    setRecipeForm({...recipeForm, ingredients: [...(recipeForm.ingredients ?? []), ""]});
  };

  const removeIngredient = (index:number) => {
    setRecipeForm({...recipeForm, ingredients: (recipeForm.ingredients ?? []).filter((_, i) => i !== index)});
  };

  
  return (
    <div id="ingredients">
      <div>
        <h2>Ingredients</h2>
        <div id="ingredients-list">
        <ol>
            {(recipeForm.ingredients ?? []).map((input, index) => (
              <li key={index}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => {
                    const newIngredients = [...(recipeForm.ingredients ?? [])];
                    newIngredients[index] = e.target.value;
                    setRecipeForm({...recipeForm, ingredients: newIngredients});
                  }}
                />
                <button type="button" onClick={() => removeIngredient(index)}>x</button>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <button type="button" className="recipe-button" onClick={addIngredient}>
        Add Ingredient
      </button>
      {recipeFormError.ingredients && <span className="error">{recipeFormError.ingredients}</span>}
    </div>
  );
}

export default IngredientsList;
