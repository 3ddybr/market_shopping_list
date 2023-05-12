import { Outlet } from "react-router-dom";
import { GlobalStyle } from "../../styles/global";
import Banner from "../../Components/Banner";
import Navbar from "../../Components/NavBar";

export function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <GlobalStyle />
      <Outlet />
    </>
  );
}
