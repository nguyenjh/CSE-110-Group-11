////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Navbar.tsx
// Code is modified from MongoDB MERN tutorial
//
//  Basic Navbar with a create recipe button linked to /create. Navbar is from "react-router-dom"
//
// Assembled by Alex Paz.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { NavLink } from "react-router-dom";

export default function Navbar(){
  return (
    <div>
      <nav>
        <NavLink to="/create">
          Create Recipe
        </NavLink>
      </nav>
    </div>
  );
}