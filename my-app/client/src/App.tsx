////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// App.tsx
// Code is modified from MongoDB MERN tutorial
//
// App function made out of the Navbar component and Outlet (from children of routes defined in main.tsx
// depending on the current address).
//
// Assembled by Alex Paz.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

import "./App.css";

// Bootstrap framework
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import { Outlet } from "react-router-dom";
import Navbar from "./views/NavBar";

import { FilterContextProvider } from "./context/FilterContext";

export default function App() {
    return (
    <MantineProvider>
      <div>
        
        <div className="viewNavBar" >
          <FilterContextProvider>
            <Navbar />
          </FilterContextProvider>
          
        </div>

        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </MantineProvider>
  );
}
