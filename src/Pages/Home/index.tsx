import { useState } from "react";
import { HomeContainer, HomeContent } from "./styles";

import { RiDeleteBin6Line } from "react-icons/ri";

export default function Home() {
  const [itemList, setItemList] = useState([
    {
      lastValue: 5.5,
      currentValue: 6,
      done: false,
    },
  ]);
  return (
    <HomeContainer>
      <HomeContent>
        <form>
          <input type="text" placeholder="Insira novo item" />
          <button>Adicionar</button>
        </form>
        <main>
          <header>
            <p>
              Total de Itens: <span>5</span>
            </p>
            <p>
              Concluídos <span>1 / 5</span>
            </p>
          </header>

          <section>
            <p>1</p>
            <input type="text" value="R$ 5,50" />
            <input type="text" value="R$ 5,50" />
            <input type="checkbox" />
            <RiDeleteBin6Line />
          </section>
        </main>
      </HomeContent>
    </HomeContainer>
  );
}
