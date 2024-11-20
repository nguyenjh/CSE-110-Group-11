import { useState, useContext, useEffect } from 'react';
import '../css/NavBar.css';
import { suggestTag } from '../constants/constants';
import { NavLink } from "react-router-dom";

export default function NavBar() {

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
