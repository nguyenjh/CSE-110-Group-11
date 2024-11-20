import { useState, useContext, useEffect } from 'react';
import '../css/NavBar.css';
import { suggestTag } from '../constants/constants';
import { NavLink } from "react-router-dom";
import { filterContext } from "../context/FilterContext";

export default function FilterBar() {
  const context = useContext(filterContext);
  if (!context) {
    throw new Error('Component must be used within a RecipeProvider');
  }
  const { filterForm, setFilterForm } = context;

  // This useEffect will log the updated filterForm each time it changes
  useEffect(() => {
    console.log("Updated filterForm:", filterForm); // Log the updated filterForm here
  }, [filterForm]); // Only run when filterForm changes

  const updateFilterFormString = (factor: string, value: string) => {
    switch(factor) {
      case "cost":
        setFilterForm(prev => ({ ...prev, cost: value }));
        break;
      case "calories":
        setFilterForm(prev => ({ ...prev, calories: value }));
        break;
      case "time":
        setFilterForm(prev => ({ ...prev, time: value }));
        break;
      case "sortBy":
        setFilterForm(prev => ({ ...prev, sortBy: value }));
        break;
      default:
        break;
    }
  };

  const [isOpen, setIsOpen] = useState(false); // handle the hidden menu
  const [isClicked, setIsClicked] = useState<string[]>([]);  // handle the clicked tags

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

  return (
    <div className="d-flex" id="wholebar">
      <aside className={`sidebar p-0 ${isOpen ? 'active' : ''}`}>
        <ul className="sidebar-nav p-0">
          <li className="sidebar-header">Filter Search Results</li>

          {/* Cost Filter */}
          <li className="sidebar-item dropdown">
            <a className="btn btn-secondary dropdown-toggle" id="costDropdown" role="button" data-bs-toggle="dropdown" data-bs-display="static">
              Cost
            </a>
            <ul className="dropdown-menu" aria-labelledby="costDropdown">
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("cost", "Under $5")}>Under $5</a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("cost", "$5-$15")}>$5-$15</a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("cost", "$15-$30")}>$15-$30</a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("cost", "Over $30")}>Over $30</a>
              </li>
            </ul>
          </li>

          {/* Calories Filter */}
          <li className="sidebar-item dropdown">
            <a className="btn btn-secondary dropdown-toggle" id="caloDropdown" role="button" data-bs-toggle="dropdown" data-bs-display="static">
              Calories
            </a>
            <ul className="dropdown-menu" aria-labelledby="caloDropdown">
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("calories", "Under 50 Calo")}>Under 50 Calo</a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("calories", "50-150 Calo")}>50-150 Calo</a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("calories", "Over 150 Calo")}>Over 150 Calo</a>
              </li>
            </ul>
          </li>

          {/* Time Filter */}
          <li className="sidebar-item dropdown">
            <a className="btn btn-secondary dropdown-toggle" id="timeDropdown" role="button" data-bs-toggle="dropdown" data-bs-display="static">
              Time
            </a>
            <ul className="dropdown-menu" aria-labelledby="timeDropdown">
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("time", "Under 10 mins")}>Under 10 mins</a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("time", "10-30 mins")}>10-30 mins</a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("time", "Over 30 mins")}>Over 30 mins</a>
              </li>
            </ul>
          </li>

          {/* SortBy Filter */}
          <li className="sidebar-item dropdown">
            <a className="btn btn-secondary dropdown-toggle" id="sortDropdown" role="button" data-bs-toggle="dropdown" data-bs-display="static">
              Sort By
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
      </aside>
      
      {/* Top Navbar */}
      <nav className="navbar navbar-expand border-bottom" id="topbar">
        <div className={`hamburger-menu ${isOpen ? 'active' : ''}`} onClick={handleOpen}>
          <span></span><span></span><span></span>
        </div>
        <div className='topbar-item'>
          <ul>
            <li><NavLink to="/create">Create</NavLink></li>
            <li><NavLink to="/account" className='Account'>Account</NavLink></li>
            <li><a className='Favorite' href="#">Favorite</a></li>
            <li><a className='Setting' href="#">Setting</a></li>
            <li><a className='SignOut' href="#">Sign Out</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}