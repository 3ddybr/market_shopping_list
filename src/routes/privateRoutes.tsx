// import * as React from 'react'
import { createBrowserRouter } from "react-router-dom";
import { Historic } from "../Pages/Historico/index.js";
import List from "../Pages/List/index.js";
import { Products } from "../Pages/Products/index.js";
import App from "../App";

const PrivateRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
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
    ],
  },
]);

export default PrivateRoutes;
