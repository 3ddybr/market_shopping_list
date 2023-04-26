import { Link, useNavigate } from "react-router-dom";
import { NavBarButton, NavBarContainer, NavBarContent } from "./styles";
import { api } from "../../services/api/api";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [list, setList] = useState([]);

  const navigate = useNavigate();

  const getList = async () => {
    try {
      const res = await api.get(`list`);
      const data = res.data;

      setList(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const createList = async () => {
    try {
      const idList = list.length + 1;
      api.post(`/list`, {
        id: idList,
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
          <li>Produtos</li>
        </ul>
        <NavBarButton onClick={createList}>Nova Lista</NavBarButton>
      </NavBarContent>
    </NavBarContainer>
  );
}
