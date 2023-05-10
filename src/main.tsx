import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";

import { Historic } from "./Pages/Historico";
import List from "./Pages/List";

import { ListProvider } from "./contexts/ListContext";
import { Products } from "./Pages/Products";
import Login from "./Pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage/>,
    children: [
      {
        path: "/historic",
        element: <Historic />,
      },
      {
        path: "/:id",
        element: <List />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ListProvider>
      <RouterProvider router={router} />
    </ListProvider>
  </React.StrictMode>
);
