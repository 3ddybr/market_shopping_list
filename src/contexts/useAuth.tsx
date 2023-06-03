import { useContext, useState } from "react";
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
  const { authenticated, logout } = useContext(AuthContext);
  const [user, setUser] = useState<UserProps | null>();

  const auth = getAuth();

  async function signInGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const userResult = {
          id: result.user.uid,
          name: result.user.displayName,
          image: result.user.photoURL,
          token: token,
        };

        authenticated(userResult as UserProps);
        setUser(userResult as UserProps);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log("oAuth credential", credential);
        console.log("oAuth result", result);
        //credencial retorna = accessToken, idToken
        //result.user = { id: "uid", name: "displayName", image: "photoURL", email: "email" };
        return user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        // ...
      });
  }

  return { signInGoogle, user, logout };
};
