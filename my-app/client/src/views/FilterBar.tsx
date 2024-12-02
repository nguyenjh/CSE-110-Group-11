import { useState, useContext, useEffect } from 'react';
import '../css/FilterBar.css';
import { suggestTag } from '../constants/constants';
import { filterContext } from "../context/FilterContext";
import { searchContext } from "../context/SearchContext";
import SearchIcon from "../assets/search_icon.svg";

export default function FilterBar() {
  const filterContextContent = useContext(filterContext);
  const searchContextContent = useContext(searchContext);

  if (!filterContextContent) {
    throw new Error('Component must be used within a RecipeProvider');
  }
  const { filterForm, setFilterForm } = filterContextContent;
  const { setSearch } = searchContextContent;

  const [selectedFilters, setSelectedFilters] = useState({
    cost: 'Cost',
    calories: 'Calories',
    time: 'Time',
    sortBy: 'Sort By',
  });

  // This useEffect will log the updated filterForm each time it changes
  useEffect(() => {
    console.log("Updated filterForm:", filterForm); // Log the updated filterForm here
  }, [filterForm]); // Only run when filterForm changes

  const updateFilterFormString = (factor: string, value: string) => {
    switch (factor) {
      case "cost":
        setSelectedFilters(prev => ({ ...prev, cost: value }));
        setFilterForm(prev => ({ ...prev, cost: value }));
        break;
      case "calories":
        setSelectedFilters(prev => ({ ...prev, calories: value }));
        setFilterForm(prev => ({ ...prev, calories: value }));
        break;
      case "time":
        setSelectedFilters(prev => ({ ...prev, time: value }));
        setFilterForm(prev => ({ ...prev, time: value }));
        break;
      case "sortBy":
        setSelectedFilters(prev => ({ ...prev, sortBy: value }));
        setFilterForm(prev => ({ ...prev, sortBy: value }));
        break;
      default:
        break;
    }
  };

  const [isOpen, setIsOpen] = useState(false); // handle the hidden menu
  const [isClicked, setIsClicked] = useState<string[]>([]); // handle the clicked tags

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const toggleClick = (clickedTag: string) => {
    if (isClicked.includes(clickedTag)) {
      setIsClicked(prevClicked => prevClicked.filter((f) => f !== clickedTag));
    } else {
      setIsClicked(prevClicked => [...prevClicked, clickedTag]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedFilters({
      cost: 'Cost',
      calories: 'Calories',
      time: 'Time',
      sortBy: 'Sort By',
    });
    setFilterForm({
      cost: '',
      calories: '',
      time: '',
      sortBy: '',
      tags: [],  // Reset tags to an empty array
    });
    setIsClicked([]);  // Clear the selected tags
  };
  
  return (
    <div className="d-flex" id="wholebar">

      <aside className={`sidebar p-0 ${isOpen ? 'active' : ''}`}>
        <ul className="sidebar-nav p-0">
          <li className="sidebar-header">Filter Search Results</li>

          {/* Cost Filter */}
          <li className="sidebar-item dropdown">
            <a className="btn btn-secondary dropdown-toggle" id="costDropdown" role="button" data-bs-toggle="dropdown" data-bs-display="static">
              {selectedFilters.cost}
            </a>
            <ul className="dropdown-menu" aria-labelledby="costDropdown">
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("cost", "< $5")}>&lt; $5</a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("cost", "$5-$15")}>$5-$15</a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("cost", "$16-$30")}>$16-$30</a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("cost", "> $30")}>&gt; $30</a>
              </li>
            </ul>
          </li>

          {/* Calories Filter */}
          <li className="sidebar-item dropdown">
            <a className="btn btn-secondary dropdown-toggle" id="caloDropdown" role="button" data-bs-toggle="dropdown" data-bs-display="static">
              {selectedFilters.calories}
            </a>
            <ul className="dropdown-menu" aria-labelledby="caloDropdown">
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("calories", "< 50 Calo")}>&lt; 50 Calo</a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("calories", "50-150 Calo")}>50-150 Calo</a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("calories", "> 150 Calo")}>&gt; 150 Calo</a>
              </li>
            </ul>
          </li>

          {/* Time Filter */}
          <li className="sidebar-item dropdown">
            <a className="btn btn-secondary dropdown-toggle" id="timeDropdown" role="button" data-bs-toggle="dropdown" data-bs-display="static">
              {selectedFilters.time}
            </a>
            <ul className="dropdown-menu" aria-labelledby="timeDropdown">
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("time", "< 10 mins")}>&lt; 10 mins</a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("time", "10-30 mins")}>10-30 mins</a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("time", "> 30 mins")}>&gt; 30 mins</a>
              </li>
            </ul>
          </li>

          {/* SortBy Filter */}
          <li className="sidebar-item dropdown">
            <a className="btn btn-secondary dropdown-toggle" id="sortDropdown" role="button" data-bs-toggle="dropdown" data-bs-display="static">
              {selectedFilters.sortBy}
            </a>
            <ul className="dropdown-menu" aria-labelledby="sortDropdown">
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("sortBy", "Newest")}>Newest</a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("sortBy", "Most Popular")}>Most Popular</a>
              </li>
            </ul>
          </li>

          {/* Tags Filter */}
          <li className="filter-item">
            {suggestTag.map(item => (
              <button 
                key={item} 
                className={`tag ${isClicked.includes(item) ? "active" : ""}`}
                onClick={() => toggleClick(item)}
              >
                {item}
              </button>
            ))}
          </li>
        </ul>

        {/* Clear Filters Button */}
        <button className="btn btn-danger clear-filters-btn" onClick={clearFilters}>
          Clear Filters
        </button>        
      </aside>
            
      {/* Top Navbar with Recipes Title */}
      <div className="searchBar-hamMenu">
        {/* Hamburger Menu */}
        <div className={`hamburger-menu ${isOpen ? 'active' : ''}`} onClick={handleOpen}>
          <span></span><span></span><span></span>
        </div>

        {/* Recipes Title */}
        <div className='title-container'> 
          <h1 className="topbar-title" >Recipes</h1>
        </div>

        <div className = "search-bar-container">
          <div className='search-bar-with-icon'>
            <div className='searchingInput'>
              <input type ='text' placeholder="Enter a recipe name" onChange= {(e) => setSearch(e.target.value)} />
              
              <div className='icon'>
                <img src = {SearchIcon} id="searchIcon"/>
              </div>
            </div>
          </div>
        </div>   
      </div>
    </div>
  );
}
