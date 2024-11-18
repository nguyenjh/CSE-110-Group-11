import { useContext } from "react";
import { IngredientsContext } from "../../context/IngredientsContext";

function IngredientsList() {
  const { ingredients, setIngredients } = useContext(IngredientsContext);

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index:number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };
  return (
    <div id="ingredients">
      <div>
        <h2>Ingredients</h2>
        <div id="ingredients-list">
          {ingredients.map((input, index) => (
            <div key={index}>
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  const newIngredients = [...ingredients];
                  newIngredients[index] = e.target.value;
                  setIngredients(newIngredients);
                }}
              />
              <button type="button" onClick={() => removeIngredient(index)}>
                x
              </button>
            </div>
          ))}
        </div>
      </div>
      <button type="button" className="recipe-button" onClick={addIngredient}>
        Add Ingredient
      </button>
    </div>
  );
}

export default IngredientsList;
