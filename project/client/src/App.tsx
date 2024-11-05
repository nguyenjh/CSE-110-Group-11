
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
