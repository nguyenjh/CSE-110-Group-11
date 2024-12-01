import React, { useEffect, useState, useContext } from "react";
import { suggestTag } from "../constants/constants";
import "../css/Post.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { IPost } from "../../../PostInterface";
import { filterContext } from "../context/FilterContext";
import { searchContext } from "../context/SearchContext";
import "../css/Pagination.css";

interface recipe_content extends IPost {
  _id: string;
}

interface recipe_props {
  recipe: recipe_content;
}

// Recipe component to display individual recipes
const Recipe: React.FC<recipe_props> = ({ recipe }) => (
  <Link to={`/recipe/${recipe._id}`} style={{ color: "inherit", textDecoration: "none" }}>
    <li className="list-group-item d-flex flex-column justify-content-between mb-5 p-5 align-items-left border rounded">
      <div className="mb-2" style={{ fontSize: "20px", fontWeight: "bold" }}>{recipe.name}</div>
      <div className="mb-2">4.2R - 12 likes - Sept 12</div>
      <div className="tags-container p-2 mt-2">
        {recipe.tags.map((tag) => (
          <span key={tag} className="badge me-2" style={{ backgroundColor: "lightblue", color: "black", fontSize: "15px" }}>{tag}</span>
        ))}
      </div>
    </li>
  </Link>
);

export default function RecipeList() {
  const filterContextContent = useContext(filterContext);
  const searchContextContent = useContext(searchContext);

  if (!filterContextContent) {
    throw new Error("Component must be used within a RecipeProvider");
  }

  const { filterForm } = filterContextContent;
  const { search } = searchContextContent;
  const [recipes, setRecipes] = useState<recipe_content[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [postSearchRecipes, setPostSearchRecipes] = useState<recipe_content[]>(recipes);

  const [currentPage, setCurrentPage] = useState(1);
  // INCREASE RECIPES PER PAGE FROM 3 TO 18
  const resultsPerPage = 18;
  // INCREASE RECIPES PER PAGE FROM 3 TO 18

  // Change the postSearchRecipes whenever search changes.
  useEffect (() => {
    setPostSearchRecipes(recipes.filter((recipe) => {
      return search.toLowerCase() === '' ? recipe : recipe.name.toLowerCase().includes(search.toLowerCase())}));}
    , [search, recipes]
  );

  useEffect(() => {
    setCurrentPage(1);}, [search]
  );



  // Pagination logic
  const maxVisiblePages = 3; // Max number of page buttons to display
  const totalPages = Math.ceil(postSearchRecipes.length / resultsPerPage);
  const indexOfLastRecipe = currentPage * resultsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - resultsPerPage;
  const currentRecipes = postSearchRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust startPage if at the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const pageNumbers = getPageNumbers();

  // Handle page change
  const goToPage = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };




  useEffect(() => {

    async function fetchRecipes() {

      try {
        // Log the filter form for debugging
        console.log("Applying filters:", filterForm);

        const params = new URLSearchParams();
        if (filterForm.cost) params.append("cost", filterForm.cost);
        if (filterForm.calories) params.append("calories", filterForm.calories);
        if (filterForm.time) params.append("time", filterForm.time);
        if (filterForm.sortBy) params.append("sortBy", filterForm.sortBy);

        const url = `http://localhost:5050/recipe?${params.toString()}`;
        console.log("Fetching recipes with URL:", url);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch recipes: ${response.statusText}`);
        }

        const foundRecipes = await response.json() as recipe_content[];
        console.log("Fetched recipes:", foundRecipes);

        setRecipes(foundRecipes);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Error fetching recipes:", err);
          setError("Failed to fetch recipes. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, [filterForm]); // Re-run effect whenever filterForm changes

  return (
    <div>
      <div className="row mt-3" style={{ display: "flex", flexWrap: "wrap" }}>
        {loading && <div className="text-center w-100">Loading recipes...</div>}
        {error && <div className="text-danger text-center w-100">{error}</div>}
        {!loading && !error && postSearchRecipes.length === 0 && (
          <div className="text-center w-100">No recipes match your criteria.</div>
        )}

        {/* Displaying the list of recipes */}
        {currentRecipes.filter((recipe) => {
          return search.toLowerCase() === '' ? recipe : recipe.name.toLowerCase().includes(search.toLowerCase()); })
          .map((recipe) => (
          <div className="col-sm-4" key={recipe._id}>
            <Recipe recipe={recipe} />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {!loading && !error && postSearchRecipes.length !== 0 && (
      <div id="pagination">
        
        <button 
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
        > 
          {"<<"} 
        </button>
        <button 
          onClick={()=> goToPage(currentPage-1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => goToPage(currentPage+1)}
          disabled={currentPage === totalPages}
        > 
          {">"} 
        </button>
        <button 
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          {">>"}
        </button>
      </div>)}
    </div>
  );
};
