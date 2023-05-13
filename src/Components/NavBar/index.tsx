import { Link, useNavigate } from "react-router-dom";
import { NavBarButton, NavBarContainer, NavBarContent } from "./styles";
import { api } from "../../services/api/api";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../contexts/useAuth";

export default function NavBar() {
  const navigate = useNavigate();

  const { id, token, logout } = useAuth();
  const idUser = id;

  const createList = async () => {
    try {
      const idList = uuidv4();
      api.post(`/list`, {
        id: idList,
        userId: idUser,
        create_at: new Date().getTime(),
        products: [],
      });

      navigate(`/${idList}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <NavBarContainer>
      <NavBarContent>
        {token ? (
          <>
            <ul>
              <Link to="/">
                <li>Histórico</li>
              </Link>
              <Link to="/products">
                <li>Produtos</li>
              </Link>
            </ul>
            <NavBarButton onClick={createList}>Nova Lista</NavBarButton>
            <NavBarButton onClick={logout}>Sair</NavBarButton>
          </>
        ) : null}
      </NavBarContent>
    </NavBarContainer>
  );
}
