////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// main.tsx
// Code is modified from MongoDB MERN tutorial
//
// Here we create routes for react_router_dom to make our single-page application. We create paths and depending on
// whats on those paths, when we call <App/>, <App/> will display and <Outlet/> will as well if called, 
// and <Outlet/> will be the children components laid out. We also render our router generated by our routes
// starting on "/" as the root.
//
// Assembled by Alex Paz.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import App from "./App";
import { RecipeContextProvider } from "./context/RecipeContext";
import { AccountContextProvider } from "./context/AccountContext";
import { FilterContextProvider } from "./context/FilterContext";
import "./index.css";
import RecipeList from "./views/RecipeList";
import PostCreation from "./views/PostCreation";
import RecipeContent from "./views/RecipeContent";
import AccountPage from "./views/AccountPage";
import HomePage from "./views/HomePage";


const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />, 
    children: [
      {
        path: "/",
        element:  <HomePage/>
      },
    ],
  },
  {
    path: "/create",
    element: <App />,
    children: [
      {
        path: "/create",
        element:  <RecipeContextProvider>                 
                    <PostCreation />
                  </RecipeContextProvider>,
      },
    ],
  },
  {
    path: "/recipe/:id",
    element: <App />,
    children: [
      {
        path: "/recipe/:id",
        element: <RecipeContent />,
      },
    ],
  },
  {
    path: "/account",
    element: <App />,
    children: [
      {
        path: "/account",
        element: <AccountContextProvider><AccountPage /></AccountContextProvider>
      },
    ],
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);