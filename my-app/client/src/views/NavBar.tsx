import { useState, useContext } from 'react';
import '../css/NavBar.css';
import { suggestTag } from '../constants/constants';
import {NavLink} from "react-router-dom";
import { filterContext } from "../context/FilterContext";

export default function NavBar() {

  const context = useContext(filterContext);
  if (!context) {
    throw new Error('Component must be used within a RecipeProvider');
  }
  const { filterForm, setFilterForm } = context;

  const updateFilterFormString = (factor: string, value: string) => {
    switch(factor) {
      case "cost":
        setFilterForm(prev => ({...prev, cost: value}));
        console.log("clicked");
        console.log(filterForm);
        break;
      case "calories":
        setFilterForm(prev => ({...prev, calories: value}));
        console.log("clicked");
        console.log(filterForm);
        break;
      case "time":
        setFilterForm(prev => ({...prev, time: value}));
        console.log("clicked");
        console.log(filterForm);
        break;
      case "sortBy":
        setFilterForm(prev => ({...prev, sortBy: value}));
        console.log("clicked");
        console.log(filterForm);
        break;
    }
  }

    const [isOpen, setIsOpen] = useState(false); //handle the hidden menu
    const [isClicked, setIsClicked] = useState<string[]>([]);  

    const handleOpen = () => {
      setIsOpen(!isOpen);
    };  

    const toggleClick = (clickedTag: string) => { {/* handle the tag filter, basically everything in labs*/}

      if(isClicked.includes(clickedTag)){
        setIsClicked((prevClicked)=> (prevClicked.filter((f)=>f!==clickedTag)))
      } else{
        setIsClicked((prevClicked)=>[...prevClicked, clickedTag])
      };
      
      
    };
    
    
    return (
      <div className="d-flex" id="wholebar">  {/* code for side bar, top bar and right bar*/}
        <aside className={`sidebar p-0 ${isOpen ? 'active' : ''}`}> 
          <ul className="sidebar-nav p-0">
            <li className="sidebar-header">
                Filter Search Results
            </li>

          <li className="sidebar-item dropdown">
            <a className="btn btn-secondary dropdown-toggle" id="costDropdown" role="button" data-bs-toggle="dropdown" data-bs-display="static">
              Cost
            </a>
            <ul className="dropdown-menu" aria-labelledby="costDropdown">
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("cost","Under $5")}>Under $5</a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={() =>updateFilterFormString("cost","$5-$15")}>$5-$15</a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("cost","$15-$30")}>$15-$30</a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={() => updateFilterFormString("cost","Over $30")}>Over $30</a>
              </li>
            </ul>
          </li>

            <li className="sidebar-item dropdown"> {/*role="button": act as button, data-bs-toggle="dropdown" is dropdown type */}
              <a className="btn btn-secondary dropdown-toggle" id="caloDropdown" role="button" data-bs-toggle="dropdown" data-bs-display="static" >
                Calories
              </a>
              <ul className="dropdown-menu" aria-labelledby="caloDropdown">
                <li><a className="dropdown-item" href="#" onClick={() => updateFilterFormString("calories", "Under 50 Calo")}>Under 50 Calo</a></li>
                <li><a className="dropdown-item" href="#" onClick={() => updateFilterFormString("calories", "50-150 Calo")}>50-150 Calo</a></li>
                <li><a className="dropdown-item" href="#" onClick={() => updateFilterFormString("calories", "Over 150 Calo")}>Over 150 Calo</a></li>
              </ul>
            </li>

            <li className="sidebar-item dropdown">
              <a className="btn btn-secondary dropdown-toggle" id="timeDropdown" role="button" data-bs-toggle="dropdown" data-bs-display="static">
                Time
              </a>
              <ul className="dropdown-menu" aria-labelledby="timeDropdown">
                <li><a className="dropdown-item" href="#" onClick = {() => updateFilterFormString("time", "Under 10 mins")}>Under 10 mins</a></li>
                <li><a className="dropdown-item" href="#" onClick = {() => updateFilterFormString("time", "10-30mins")}>10-30mins</a></li>
                <li><a className="dropdown-item" href="#" onClick = {() => updateFilterFormString("time", "Over 30mins")}>Over 30mins</a></li>
              </ul>
            </li>

            <li className="sidebar-item dropdown">
              <a className="btn btn-secondary dropdown-toggle" id="sortDropdown" role="button" data-bs-toggle="dropdown" data-bs-display="static">
                Sort By
              </a>
              <ul className="dropdown-menu" aria-labelledby="sidebarDropdown">
                <li><a className="dropdown-item" href="#" onClick = {() => updateFilterFormString("sortBy", "Something")}>Something</a></li>
              </ul>
            </li>

            <li className ="filter-item">  {/* code for the tags*/}
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
        
        <nav className="navbar navbar-expand border-bottom" id="topbar">  {/* create another 'hidden' navbar so that the + button always at the bottom right of the screen*/}
            <div className={`hamburger-menu ${isOpen ? 'active' : ''}`} 
                              onClick={() => handleOpen()}>
                <span></span>
                <span></span>
                <span></span>
            </div>
              {/*code for the top nav bar*/} 
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
