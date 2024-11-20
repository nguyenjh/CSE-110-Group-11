import React, { useEffect, useState } from "react";
import { suggestTag } from "../constants/constants";
import "../css/Post.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { IPost } from "../../../PostInterface";

interface recipe_content extends IPost {
  _id: string;
}

interface recipe_props {
  recipe: recipe_content;
}

const Recipe: React.FC<recipe_props> = ({ recipe }) => (
  <Link to={`/recipe/${recipe._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
    <li className="list-group-item d-flex flex-column justify-content-between mb-5 p-5 align-items-left border rounded">
      <div className="mb-2" style={{ fontSize: "20px", fontWeight: "bold" }}>{recipe.name}</div>
      <div className="mb-2">4.2R - 12 likes - Sept 12</div>
      <div className="tags-container p-2 mt-2">
        {suggestTag.map((tag) => (
          <span key={tag} className="badge me-2" style={{ backgroundColor: "lightblue", color: "black", fontSize: "15px" }}>{tag}</span>
        ))}
      </div>
    </li>
  </Link>
);

export default function RecipeList() {
  const [recipes, setRecipes] = useState<recipe_content[]>([]);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getRecipes() {
      setLoading(true); // Start loading

      // Construct the query string based on selected filters
      let query = `http://localhost:5050/recipe?`;
      Object.keys(filters).forEach((key, index) => {
        query += `${key}=${filters[key]}${index < Object.keys(filters).length - 1 ? '&' : ''}`;
      });

      const response = await fetch(query);
      
      if (!response.ok) {
        console.error(`An error occurred: ${response.statusText}`);
        setLoading(false); // Stop loading
        return;
      }

      const foundRecipes = await response.json() as recipe_content[];
      setRecipes(foundRecipes);
      setLoading(false); // Stop loading after data is fetched
    }

    getRecipes(); // Fetch recipes, even if no filters are set

  }, [filters]); // Only re-fetch when filters change

  const handleDropdownChange = (filterType: string, value: string) => {
    const updatedFilters = { ...filters, [filterType]: value };
    setFilters(updatedFilters);
    console.log(`Updated Filters: `, updatedFilters); // Log the selected filters
  };

  return (
    <div className="container mt-5">
      <h1>Recipes</h1>

      {/* Dropdown filters */}
      <div className="mb-3">
        {/* Cost dropdown filter */}
        <div className="dropdown d-inline-block me-2">
          <button className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Cost
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" onClick={() => handleDropdownChange("cost", "Under $5")}>Under $5</a></li>
            <li><a className="dropdown-item" onClick={() => handleDropdownChange("cost", "$5-$15")}>$5-$15</a></li>
            <li><a className="dropdown-item" onClick={() => handleDropdownChange("cost", "$15-$30")}>$15-$30</a></li>
            <li><a className="dropdown-item" onClick={() => handleDropdownChange("cost", "Over $30")}>Over $30</a></li>
          </ul>
        </div>

        {/* Calories dropdown filter */}
        <div className="dropdown d-inline-block me-2">
          <button className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Calories
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" onClick={() => handleDropdownChange("calories", "Under 50 Calo")}>Under 50 Calo</a></li>
            <li><a className="dropdown-item" onClick={() => handleDropdownChange("calories", "50-150 Calo")}>50-150 Calo</a></li>
            <li><a className="dropdown-item" onClick={() => handleDropdownChange("calories", "Over 150 Calo")}>Over 150 Calo</a></li>
          </ul>
        </div>

        {/* Time dropdown filter */}
        <div className="dropdown d-inline-block me-2">
          <button className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Time
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" onClick={() => handleDropdownChange("time", "Under 10 mins")}>Under 10 mins</a></li>
            <li><a className="dropdown-item" onClick={() => handleDropdownChange("time", "10-30 mins")}>10-30 mins</a></li>
            <li><a className="dropdown-item" onClick={() => handleDropdownChange("time", "Over 30 mins")}>Over 30 mins</a></li>
          </ul>
        </div>

        {/* Sort By dropdown */}
        <div className="dropdown d-inline-block me-2">
          <button className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Sort By
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" onClick={() => handleDropdownChange("sortBy", "name")}>Name</a></li>
          </ul>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div>Loading recipes...</div> // Show loading message or spinner
      ) : (
        <div className="row">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div className="col-sm-4" key={recipe._id}>
                <Recipe recipe={recipe} />
              </div>
            ))
          ) : (
            <div>No recipes found</div> // Show message if no recipes match the filters
          )}
        </div>
      )}
    </div>
  );
}
