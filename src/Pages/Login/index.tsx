import {
  LoginButtonFacebook,
  LoginButtonGoogle,
  LoginContainer,
  LoginContent,
} from "./styles";

import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

import ImgHistoric from "../../assets/historic.png";
import ImgList from "../../assets/list.png";

export default function Login() {
  return (
    <LoginContainer>
      <LoginContent>
        <h3>Faça seu login para acessar suas listas de compras.</h3>
        <p>
          Tenha acesso a todas suas listas de compras com até 2 anos on-line e
          possa comparar quanto pagou por aquele mesmo item na compra anterior
          automaticamente.
        </p>
        <LoginButtonGoogle>
          <span>
            <FcGoogle size={24} />
          </span>
          Login com Google
        </LoginButtonGoogle>
        <LoginButtonFacebook>
          <BsFacebook size={24} />
          Login com Facebook
        </LoginButtonFacebook>

        <section>
          <img src={ImgHistoric} />
          <img src={ImgList} />
        </section>
      </LoginContent>
    </LoginContainer>
  );
}