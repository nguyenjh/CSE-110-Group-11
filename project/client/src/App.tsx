////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// App.tsx
// Code is modified from MongoDB MERN tutorial
//
// App function made out of the Navbar component and Outlet (from children of routes defined in main.tsx
// depending on the current address).
//
// Assembled by Alex Paz.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

import './App.css'

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
    return (
    <MantineProvider>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </MantineProvider>
  );
}
