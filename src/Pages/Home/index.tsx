import { FormEvent, useState } from "react";
import { HomeContainer, HomeContent } from "./styles";

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
  const [inputText, setInputText] = useState("");

  const handleAddProduct = (e: FormEvent) => {
    e.preventDefault();
    let newItemList = [...itemList];
    newItemList.push({
      id: newItemList.length + 1,
      nameProduct: inputText,
      lastValue: 0,
      currentValue: 0,
      done: false,
    });
    setItemList(newItemList);
    setInputText("");
  };

  const handleUpdateValue = (id: number, currentValue: number) => {
    const newArray = itemList.filter((item) => item.id === id);
    newArray[0].currentValue = currentValue;
    // const array = [...itemList, newArray];
    // setItemList(array);

    // console.log(newArray);
  };

  const handleDelete = (id: number) => {
    const newArray = itemList.filter((item) => item.id !== id);
    setItemList(newArray);
  };

  console.log(itemList);
  return (
    <HomeContainer>
      <HomeContent>
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            placeholder="Insira novo item"
            defaultValue={inputText}
            onChange={(event) => setInputText(event.target.value)}
          />
          <button type="submit">Adicionar</button>
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
                onUpdate={() => (item.id, item.currentValue)}
                onDelete={() => handleDelete(item.id)}
              />
            </>
          ))}
        </main>
      </HomeContent>
    </HomeContainer>
  );
}
