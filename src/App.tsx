import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "./styles/global";

import { Outlet } from "react-router-dom";
import Navbar from "./Components/NavBar";
import Banner from "./Components/Banner";

import { ListProvider } from "./contexts/ListContext";
import Login from "./Pages/Login";
import { useAuth } from "./contexts/useAuth";

// import { Footer } from "./Components/Footer";
function App() {
  const { token } = useAuth();
  return (
    <ListProvider>
      <Navbar />
      <Banner />
      <GlobalStyle />
      <Outlet />
      {!token ? <Login /> : null}

      {/* <Footer /> */}
    </ListProvider>
  );
}

export default App;
