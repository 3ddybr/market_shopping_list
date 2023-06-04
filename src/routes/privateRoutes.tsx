import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoutes = ({ children }: { children: JSX.Element }) => {
  const { user } = useContext(AuthContext);

  if (!user?.token) {
    return <Navigate to="" replace={true} />;
  }

  return children;
};

export default ProtectedRoutes;

// import * as React from 'react'
// import { createBrowserRouter } from "react-router-dom";
// import { Historic } from "../Pages/Historico";
// import List from "../Pages/List/index.js";
// import { Products } from "../Pages/Products";
// import App from "../App";

// const PrivateRoutes = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
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
//     ],
//   },
// ]);

// export default PrivateRoutes;

// import UserServices from "../Services/UserService";
