import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "./styles/global";

import { Outlet } from "react-router-dom";
import Navbar from "./Components/NavBar";
import Banner from "./Components/Banner";

import { ListProvider } from "./contexts/ListContext";
import Login from "./Pages/Login";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

// import { Footer } from "./Components/Footer";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <ListProvider>
      <Navbar />
      <Banner />
      <GlobalStyle />
      <Outlet />
      {!user?.token ? <Login /> : null}

      {/* <Footer /> */}
    </ListProvider>
  );
}

export default App;
