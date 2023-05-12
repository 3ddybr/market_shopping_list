import React from "react";
import ReactDOM from "react-dom/client";

import { AuthProvider } from "./contexts/AuthContext";
import Rostering from "./routes/routes";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <Rostering />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

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

// const routa = authenticated.length ? <PrivateRoutes /> : <PublicRoutes />;
