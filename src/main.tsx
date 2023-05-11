import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import PrivateRoutes from "./routes/privateRoutes";
import PublicRoutes from "./routes/publicRoutes";

// const routes = token ? PublicRoutes : PublicRoutes;

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     // errorElement: <ErrorPage/>,
//     children: [
//       {
//         path: "/historic",
//         element: <Historic />,
//       },
//       {
//         path: "/:id",
//         element: <List />,
//       },
//       {
//         path: "/products",
//         element: <Products />,
//       },
//       {
//         path: "/",
//         element: <Login />,
//       },
//     ],
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <RouterProvider router={PrivateRoutes} />
    {/* <App /> */}
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
{
}
