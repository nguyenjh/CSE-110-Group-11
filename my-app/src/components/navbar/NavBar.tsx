import React, {useState} from 'react';
import '../navbar/NavBar.css';
import { suggestTag } from '../../constants/constants';
import NewPostButton from '../post/NewPostButton';

function NavBar() {

    const [isOpen, setIsOpen] = useState(false);
    const [isClicked, setIsClicked] = useState<string[]>([]);

    const handleOpen = () => {
      setIsOpen(!isOpen);
    };  

    const toggleClick = (clickedTag: string) => {

      if(isClicked.includes(clickedTag)){
        setIsClicked((prevClicked)=> (prevClicked.filter((f)=>f!==clickedTag)))
      } else{
        setIsClicked((prevClicked)=>[...prevClicked, clickedTag])
      };
      
      
    };
    
    
    return (
      <div className="d-flex" id="wholebar">
        <aside className={`sidebar p-0 ${isOpen ? 'active' : ''}`}> 
          <ul className="sidebar-nav p-0">
            <li className="sidebar-header">
                Filter Search Results
            </li>

            <li className="sidebar-item dropdown">
              <a className="btn btn-secondary dropdown-toggle" id="costDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Cost
              </a>
              <ul className="dropdown-menu" aria-labelledby="costDropdown">
                <li><a className="dropdown-item" href="#">Under $5</a></li>
                <li><a className="dropdown-item" href="#">$5-$15</a></li>
                <li><a className="dropdown-item" href="#">$15-$30</a></li>
                <li><a className="dropdown-item" href="#">Over $30</a></li>
              </ul>
            </li>

            <li className="sidebar-item dropdown">
              <a className="btn btn-secondary dropdown-toggle" id="caloDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Calories
              </a>
              <ul className="dropdown-menu" aria-labelledby="caloDropdown">
                <li><a className="dropdown-item" href="#">Under 50Calo</a></li>
                <li><a className="dropdown-item" href="#">50-150 Calo</a></li>
                <li><a className="dropdown-item" href="#">Over 150 Calo</a></li>
              </ul>
            </li>

            <li className="sidebar-item dropdown">
              <a className="btn btn-secondary dropdown-toggle" id="timeDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Time
              </a>
              <ul className="dropdown-menu" aria-labelledby="timeDropdown">
                <li><a className="dropdown-item" href="#">Under 10 mins</a></li>
                <li><a className="dropdown-item" href="#">10-30mins</a></li>
                <li><a className="dropdown-item" href="#">Over 30mins</a></li>
              </ul>
            </li>

            <li className="sidebar-item dropdown">
              <a className="btn btn-secondary dropdown-toggle" id="sortDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sort By
              </a>
              <ul className="dropdown-menu" aria-labelledby="sidebarDropdown">
                <li><a className="dropdown-item" href="#">Something</a></li>
              </ul>
            </li>

            <li className ="filter-item">
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
        
        <nav className="navbar navbar-expand border-bottom" id="topbar">
            <div className={`hamburger-menu ${isOpen ? 'active' : ''}`} 
                              onClick={() => handleOpen()}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className='topbar-item'>
              <ul>
                <li><a className='Account' href="#">Account</a></li>
                <li><a className='Favorite' href="#">Favorite</a></li>
                <li><a className='Setting' href="#">Setting</a></li>
                <li><a className='SignOut' href="#">Sign Out</a></li>
              </ul>
            </div>

        </nav>

        <aside className="newPostButton">
          <NewPostButton />
        </aside>
            

      </div>
    
    );
  }
  
  export default NavBar;