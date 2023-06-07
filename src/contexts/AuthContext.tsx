import { ReactNode, createContext, useEffect, useState } from "react";
// import { api } from "../services/api/api";
import { dbFirebase } from "../services/api/apiFirebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

interface AuthProviderProps {
  children: ReactNode;
}

interface UserProps {
  id?: string;
  name?: string;
  image?: string;
  token?: string;
}

interface AuthContextProps extends UserProps {
  user: UserProps | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  authenticated: (user: UserProps) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps | null>();
  const userCollectionRef = collection(dbFirebase, "user");

  useEffect(() => {
    const user = getUserLocalStorage();
    if (user) {
      setUser(user);
    }
    console.log("renderizou");
  }, []);

  function setUserLocalStorage(user: UserProps | null) {
    localStorage.setItem("MarketListU", JSON.stringify(user));
  }

  // Função para autenticar o usuário
  //verificar se exite user se nao cadastrar ou atualiza
  async function LoginRequest(user: UserProps) {
    try {
      await setDoc(doc(userCollectionRef, user.id), {
        // id: user.id,
        name: user.name,
        image: user.image,
        token: user.token,
      });
      return user;
    } catch (error) {
      console.log(error);
    }

    //------------------chamada a fake api via axios------------------
    // try {
    // const request = await api.post("user", user);
    //   return request.data;
    // } catch (err) {
    //   console.log(err);
    // }
  }

  //Funcao para autenticar o usuario
  async function authenticated(user: UserProps) {
    try {
      const response = await getDocs(userCollectionRef);
      const data: UserProps[] = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const exist = data.find((doc) => doc.id === user.id);

      // console.log(exist);

      //------------------chamada a fake api via axios--------------
      // const response = await api.get("user");
      // const data: UserProps[] = response.data;
      // const exist = data.find((item) => item.id === user.id);

      if (exist) {
        const payload = {
          id: exist.id,
          name: exist.name,
          image: exist.image,
          token: exist.token,
        };

        setUser(payload);
        setUserLocalStorage(payload);
      } else {
        const response = await LoginRequest(user);

        const payload = {
          id: response?.id,
          name: response?.name,
          image: response?.image,
          token: response?.token,
        };

        setUser(payload);
        setUserLocalStorage(payload);
      }
    } catch (err) {
      console.log(err);
    }
  }
  function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }

  function getUserLocalStorage() {
    const json = localStorage.getItem("MarketListU");

    if (!json) {
      return null;
    }

    const user = JSON.parse(json);
    return user ?? null;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, authenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
