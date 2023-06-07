import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Historic } from "../Pages/Historico";
import { List } from "../Pages/List/index.js";
import { Products } from "../Pages/Products";
import App from "../App";
import ProtectedRoutes from "./privateRoutes.js";

const Rostering = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* <Route path="/login" element={<LoginPage />} /> */}
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Historic />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/:id"
            element={
              <ProtectedRoutes>
                <List />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoutes>
                <Products />
              </ProtectedRoutes>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Rostering;

// const Routering = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <LoginPage />,
//       },
//       {
//         path: "/historic",
//         element: {
//        (   <ProtectedRoutes>
//             <Historic />

//           </ProtectedRoutes>)
//       },
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
