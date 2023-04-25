import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";

import { Historic } from "./Pages/Historico";
import List from "./Pages/List";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Historic />,
      },
      {
        path: "/:id",
        element: <List />,
      },
      // {
      //   path: '/movie/:id',
      //   element: <Movie />,
      // },
      // {
      //   path: '/search',
      //   element: <Search />,
      // },
      // {
      //   path: '/atualizados',
      //   element: <Atualizados />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
