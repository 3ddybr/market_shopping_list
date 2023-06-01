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
  const { authenticated } = useContext(AuthContext);

  const auth = getAuth();

  async function signInGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = {
          id: result.user.uid,
          name: result.user.displayName,
          image: result.user.photoURL,
          token: token,
        };

        authenticated(user as UserProps);
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

  return signInGoogle;
};
