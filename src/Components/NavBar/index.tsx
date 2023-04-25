import { Link } from "react-router-dom";
import { NavBarContainer, NavBarContent } from "./styles";

export default function NavBar() {
  return (
    <NavBarContainer>
      <NavBarContent>
        <ul>
          <Link to="/">
            <li>Histórico</li>
          </Link>
          <li>Produtos</li>
        </ul>
        <button>Nova Lista</button>
      </NavBarContent>
    </NavBarContainer>
  );
}
