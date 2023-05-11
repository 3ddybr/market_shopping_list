import { Link, useNavigate } from "react-router-dom";
import { NavBarButton, NavBarContainer, NavBarContent } from "./styles";
import { api } from "../../services/api/api";
import { v4 as uuidv4 } from "uuid";

export default function NavBar() {
  const navigate = useNavigate();

  const createList = async () => {
    try {
      const idList = uuidv4();
      api.post(`/list`, {
        id: idList,
        userId: 1,
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
        <ul>
          <Link to="/">
            <li>Histórico</li>
          </Link>
          <Link to="/products">
            <li>Produtos</li>
          </Link>
        </ul>
        <NavBarButton onClick={createList}>Nova Lista</NavBarButton>
      </NavBarContent>
    </NavBarContainer>
  );
}
