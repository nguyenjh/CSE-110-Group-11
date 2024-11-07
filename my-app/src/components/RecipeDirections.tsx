import { useContext } from "react";
import { DirectionsContext } from "../context/DirectionsContext";

function RecipeDirections() {
  const { directions, setDirections } = useContext(DirectionsContext);

  const addDirection = () => {
    setDirections([...directions, ""]);
  };

  const removeDirection = (index:number) => {
    setDirections(directions.filter((_, i) => i !== index));
  };

  return (
    <div id="directions">
      <div>
        <h2>Directions</h2>
        <div id="directions-list">
          <ol>
            {directions.map((input, index) => (
              <li key={index}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => {
                    const newDirections = [...directions];
                    newDirections[index] = e.target.value;
                    setDirections(newDirections);
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
    </div>
  );
}

export default RecipeDirections;
