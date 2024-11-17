import {useState} from 'react';
import '../css/NavBar.css';
import { suggestTag } from '../constants/constants';
import {NavLink} from "react-router-dom";

export default function NavBar() {

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

            <li className="sidebar-item dropdown"> {/* code for the hidden bar*/} {/* data-bs-display="static" this part force the dropdown to always droppdown, */}
              <a className="btn btn-secondary dropdown-toggle" id="costDropdown" role="button" data-bs-toggle="dropdown" data-bs-display="static" >
                Cost
              </a>
              <ul className="dropdown-menu" aria-labelledby="costDropdown">
                <li><a className="dropdown-item" href="#">Under $5</a></li>
                <li><a className="dropdown-item" href="#">$5-$15</a></li>
                <li><a className="dropdown-item" href="#">$15-$30</a></li>
                <li><a className="dropdown-item" href="#">Over $30</a></li>
              </ul>
            </li>

            <li className="sidebar-item dropdown"> {/*role="button": act as button, data-bs-toggle="dropdown" is dropdown type */}
              <a className="btn btn-secondary dropdown-toggle" id="caloDropdown" role="button" data-bs-toggle="dropdown" data-bs-display="static" >
                Calories
              </a>
              <ul className="dropdown-menu" aria-labelledby="caloDropdown">
                <li><a className="dropdown-item" href="#">Under 50 Calo</a></li>
                <li><a className="dropdown-item" href="#">50-150 Calo</a></li>
                <li><a className="dropdown-item" href="#">Over 150 Calo</a></li>
              </ul>
            </li>

            <li className="sidebar-item dropdown">
              <a className="btn btn-secondary dropdown-toggle" id="timeDropdown" role="button" data-bs-toggle="dropdown" data-bs-display="static">
                Time
              </a>
              <ul className="dropdown-menu" aria-labelledby="timeDropdown">
                <li><a className="dropdown-item" href="#">Under 10 mins</a></li>
                <li><a className="dropdown-item" href="#">10-30mins</a></li>
                <li><a className="dropdown-item" href="#">Over 30mins</a></li>
              </ul>
            </li>

            <li className="sidebar-item dropdown">
              <a className="btn btn-secondary dropdown-toggle" id="sortDropdown" role="button" data-bs-toggle="dropdown" data-bs-display="static">
                Sort By
              </a>
              <ul className="dropdown-menu" aria-labelledby="sidebarDropdown">
                <li><a className="dropdown-item" href="#">Something</a></li>
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
                <li><a className='Account' href="#">Account</a></li>
                <li><a className='Favorite' href="#">Favorite</a></li>
                <li><a className='Setting' href="#">Setting</a></li>
                <li><a className='SignOut' href="#">Sign Out</a></li>
              </ul>
            </div>
        </nav>
      </div>
    
    );
  }
