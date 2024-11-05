import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface recipe_content {
  name: string;
  summary: string;
  instructions: string;
  _id: string;
}

interface recipe_props {
  recipe: recipe_content;
  deleteRecipe: (id: string) => void;
}

const Recipe: React.FC<recipe_props> = ({recipe, deleteRecipe}) => (
  <tr >
    <td >
      {recipe.name}
    </td>
    <td >
      {recipe.summary}
    </td>
    <td >
      {recipe.instructions}
    </td>
    <td >
      <div >
        <Link to={`/edit/${recipe._id}`}
        >
          Edit
        </Link>
        <button
          color="red"
          type="button"
          onClick={() => {
            deleteRecipe(recipe._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function RecipeList() {
  const [recipes, setRecipes] = useState<recipe_content[]>([]);

  // This method fetches the recipes from the database.
  useEffect(() => {
    async function getRecipes() {
      const response = await fetch(`http://localhost:5050/recipe/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const foundRecipes = await response.json() as recipe_content[];
      setRecipes(foundRecipes);
    }
    getRecipes();
    return;
  }, [recipes.length]);

  // This method will delete a recipe
  async function deleteRecipe(id: string) {
    await fetch(`http://localhost:5050/recipe/${id}`, {
      method: "DELETE",
    });
    const newRecipes = recipes.filter((el) => el._id !== id);
    setRecipes(newRecipes);
  }

  // This method will map out the recipe on the table
  function recipeList() {
    return recipes.map((recipe) => {
      return (
        <Recipe
          recipe={recipe}
          deleteRecipe={deleteRecipe}
          key={recipe._id}
        />
      );
    });
  }

  // This following section will display the table with the recipes of individuals.
  return (
    <>
      <h3>User Recipes</h3>
      <div>
        <div>
          <table>
            <thead>
              <tr>
                <th>
                  Name
                </th>
                <th>
                  Summary
                </th>
                <th>
                  Instructions
                </th>
                <th>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {recipeList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}