import { NavBarContainer, NavBarContent } from "./styles";

export default function NavBar() {
  return (
    <NavBarContainer>
      <NavBarContent>
        <ul>
          <li>Home</li>
          <li>Produtos</li>
          <li>Histórico</li>
        </ul>
        <button>Nova Lista</button>
      </NavBarContent>
    </NavBarContainer>
  );
}
