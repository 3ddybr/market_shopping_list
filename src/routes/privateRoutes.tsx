import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoutes = ({ children }: { children: JSX.Element }) => {
  const { user } = useContext(AuthContext);

  if (!user?.token) {
    return null;
  }
  return children;
};

export default ProtectedRoutes;
