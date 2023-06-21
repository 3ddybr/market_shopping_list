import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { provider } from "../services/api/apiFirebase";

interface UserProps {
  id?: string;
  name?: string;
  image?: string;
  token?: string;
}
export const useAuth = () => {
  const { authenticated, setUser } = useContext(AuthContext);
  const auth = getAuth();

  async function signInGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const userResult = {
          id: result.user.uid,
          name: result.user.displayName,
          image: result.user.photoURL,
          token: token,
        };
        authenticated(userResult as UserProps);
        setUser(userResult as UserProps);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return { signInGoogle };
};
