import React, { useEffect, useState, useContext } from "react";
import "../css/Post.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { IPost } from "../../../PostInterface";
import { filterContext } from "../context/FilterContext";
import { searchContext } from "../context/SearchContext";
import "../css/Pagination.css";
import "../css/RecipeList.css";
interface recipe_content extends IPost {
  _id: string;
}

interface recipe_props {
  recipe: recipe_content;
}

// Recipe component to display individual recipes
const Recipe: React.FC<recipe_props> = ({ recipe }) => {
  const [likes, setLikes] = useState(() => {
    const storedLikes = localStorage.getItem(`likes_${recipe._id}`);
    return storedLikes ? parseInt(storedLikes, 10) : recipe.likes;
  });

  useEffect(() => {
    const storedLikes = localStorage.getItem(`likes_${recipe._id}`);
    if (storedLikes && parseInt(storedLikes, 10) !== likes) {
      setLikes(parseInt(storedLikes, 10));
    }
  }, [recipe._id, likes]);

  // Runtime rating calculation
  const isValidNumRating = (recipe?.numOfRatings === undefined || recipe?.numOfRatings < 1);
  let rating = isValidNumRating ? "-" : (recipe?.ratingsTotal / recipe?.numOfRatings).toFixed(1); // Shows placeholder value for rating if there isnt a valid numRatings in db
  rating = rating.replace(/[.,]0$/, ""); // Format rating value to show decimal values only if they are nonzero
  
  return (
    <div className="recipe-list">
      <Link
        to={`/recipe/${recipe._id}`}
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <li className="recipe-card">
          <div className="recipe-name">{recipe.name}</div>
          <div className="recipe-info">
            {rating === '-' ? 'Unrated' : `${rating}✭`} - {likes} likes - {recipe.estimated_total_time} min
          </div>
          <div className="tags-container">
            {recipe.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </li>
      </Link>
    </div>
  );
};

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
        if (filterForm.tags && filterForm.tags.length > 0) {
          params.append("tags", filterForm.tags.join(","));
      }

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