import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [menuVisible, setHamMenuVisible] = useState(false);
  const toggleHamMenu = () => {
    setHamMenuVisible(!menuVisible);
  }

  return (
    <div id ="navbar">
      <div className="hamburger-menu" onClick={toggleHamMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div>
        <ul>
          <li>Account</li>
          <li>Favorites</li>
          <li>Setting</li>
          <li>Sign Out</li>
        </ul>
      </div>
      {menuVisible && (
      <div className="off-screen-menu" >
        <ul>
          <li>Cost</li>
          <li>Calories</li>
          <li>Time</li>
          <li>Sort By</li>
        </ul>
      </div>
      )}  
    </div>
  );
}

export default App;
