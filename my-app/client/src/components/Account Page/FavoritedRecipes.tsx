import React, { useState } from "react";

const FavoritedRecipes = () => {
  const allFavoritedRecipes = [
    "Apple Pie",
    "Banana Bread",
    "Carrot Cake",
    "Donut",
    "Egg Salad",
    "French Toast",
    "Grape Juice",
    "Hot Dog",
    "Ice Cream",
    "Jelly Beans",
    "Kale Chips",
    "Lemonade",
    "Muffins",
    "Nachos",
    "Oatmeal",
    "Pancakes",
    "Quiche",
    "Raspberry Tart",
    "Smoothie",
    "Tacos",
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 4;

  // Pagination logic
  const totalPages = Math.ceil(allFavoritedRecipes.length / resultsPerPage);
  const indexOfLastRecipe = currentPage * resultsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - resultsPerPage;
  const currentRecipes = allFavoritedRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Handle page change
  const goToPage = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {/* Displaying the list of favorited recipes */}
      <div id="favorites-container">
        {currentRecipes.map((recipe, index) => (
          <div key={index} className="result-item">
            {recipe}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div id="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FavoritedRecipes;
