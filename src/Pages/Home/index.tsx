import { useState } from "react";
import { HomeContainer, HomeContent } from "./styles";

import { RiDeleteBin6Line } from "react-icons/ri";
import { ItemProductTypes } from "../../@types/itemProduct";
import ItemProduct from "../../Components/ItemProduct";

export default function Home() {
  const [itemList, setItemList] = useState<ItemProductTypes[]>([
    {
      id: 1,
      nameProduct: "Feijão 1k",
      lastValue: 5.5,
      currentValue: 6,
      done: false,
    },
    {
      id: 2,
      nameProduct: "Arroz 5k",
      lastValue: 18.5,
      currentValue: 19,
      done: false,
    },
    {
      id: 3,
      nameProduct: "Sabão em pó 5k",
      lastValue: 12.9,
      currentValue: 14,
      done: true,
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

          {itemList.map((item, index) => (
            <>
              <ItemProduct
                key={item.id}
                id={index + 1}
                nameProduct={item.nameProduct}
                lastValue={item.lastValue}
                currentValue={item.currentValue}
                done={item.done}
              />
              {/* <section>
                <p>{index + 1} -</p>
                <p>{item.nameProduct} </p>
                <input
                  type="text"
                  value={item.lastValue.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                />
                <input
                  type="text"
                  value={item.currentValue.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                />
                <input type="checkbox" checked={item.done} />
                <RiDeleteBin6Line size={24} color="red" />
              </section> */}
            </>
          ))}
        </main>
      </HomeContent>
    </HomeContainer>
  );
}
