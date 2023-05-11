import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

import {
  BrowserRouter,
  Outlet,
  RouterProvider,
  // Routes,
} from "react-router-dom";
import Navbar from "./Components/NavBar";
import Banner from "./Components/Banner";

import { useAuth } from "./contexts/useAuth";
import { AuthProvider } from "./contexts/AuthContext";
import { ListProvider } from "./contexts/ListContext";
import PrivateRoutes from "./routes/privateRoutes";
// import { Footer } from "./Components/Footer";
function App() {
  const { token } = useAuth();
  console.log(token);
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <ListProvider>
          <Navbar />
          <Banner />
          <GlobalStyle />
          <Outlet />
        </ListProvider>
        {/* <Footer /> */}
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
