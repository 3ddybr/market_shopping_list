import { Link, useNavigate } from "react-router-dom";
import { NavBarButton, NavBarContainer, NavBarContent } from "./styles";

import { addDoc, collection } from "firebase/firestore";
import { dbFirebase } from "../../services/api/apiFirebase";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function NavBar() {
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);
  const idUser = user?.id;
  const token = user?.token;

  const createList = async () => {
    const listCollectionRef = collection(dbFirebase, "list");
    try {
      const newList = await addDoc(listCollectionRef, {
        idUser: idUser,
        create_at: new Date().getTime(),
        products: [],
      });

      navigate(`/${newList.id}`);

      //-------------------- chamada a fake api via axios----------------
      // const idList = uuidv4();
      // api.post(`/list`, {
      //   id: idList,
      //   idUser: idUser,
      //   create_at: new Date().getTime(),
      //   products: [],
      // });
      // navigate(`/${idList}`);
      //------------------------------------------------------
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
