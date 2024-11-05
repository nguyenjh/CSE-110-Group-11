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