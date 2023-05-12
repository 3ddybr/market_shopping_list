import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api/api";

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
  authenticated: (user: UserProps) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps | null>();

  useEffect(() => {
    const user = getUserLocalStorage();
    if (user) {
      setUser(user);
    }
  }, []);

  function setUserLocalStorage(user: UserProps | null) {
    localStorage.setItem("MarketListU", JSON.stringify(user));
  }

  async function LoginRequest(user: UserProps) {
    try {
      const request = await api.post("user", user);
      return request.data;
    } catch (err) {
      console.log(err);
    }
  }

  async function authenticated(user: UserProps) {
    const response = await LoginRequest(user);

    const payload = {
      id: response.id,
      name: response.name,
      image: response.image,
      token: response.token,
    };

    setUser(payload);
    setUserLocalStorage(payload);
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
    <AuthContext.Provider value={{ ...user, authenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
