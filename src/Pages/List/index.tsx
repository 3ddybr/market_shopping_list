import { FormEvent, useEffect, useState } from "react";
import { HomeContainer, HomeContent } from "./styles";

import ItemProduct from "../../Components/ItemProduct";
import { api } from "../../services/api/api";
import { useParams } from "react-router-dom";
import { marketListTypes } from "../../@types/marketList";
import { ItemProductTypes } from "../../@types/itemProduct";

export default function List() {
  const { id } = useParams();

  const [list, setList] = useState<marketListTypes[]>([]);
  const [product, setProduct] = useState<ItemProductTypes[]>([]);
  const [inputText, setInputText] = useState("");
  // const [newList, setNewList] = useState([]);

  const getList = async () => {
    const res = await api.get(`list/${id}`);
    const data: marketListTypes = res.data;

    console.log("console data", data);
    setList(res.data);
    setProduct(data.products);
  };

  useEffect(() => {
    getList();
  }, []);

  // const handleAddProduct = async (e: FormEvent) => {
  //   e.preventDefault()

  //   let newList = [...list]
  //   newList.push({
  //     products: [
  //       id: product.length + 1
  //     ]
  //   });
  // }

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();
    let newItemList = [...product];
    newItemList.push({
      id: newItemList.length + 1,
      nameProduct: inputText,
      currentValue: 0,
      done: false,
    });

    // let newList = [...list]
    // newList.push({
    //   id: list.
    // })
    try {
      await api.patch(`/list/${id}`, {
        id: id,
        products: newItemList,
      });
    } catch (e) {
      console.log(e);
    }
    setProduct(newItemList);
    setInputText("");
  };

  // useEffect(() => {

  // },[])

  const handleDelete = (id: number) => {
    const newArray = list.filter((item) => item.id !== id);
    setList(newArray);
  };

  // console.log(list);
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

          {product?.map((productItem, index) => (
            <>
              <ItemProduct
                key={productItem.id}
                id={index + 1}
                nameProduct={productItem.nameProduct}
                lastValue={1}
                currentValue={productItem.currentValue}
                done={productItem.done}
                onUpdate={() => (productItem.id, productItem.currentValue)}
                onDelete={() => handleDelete(productItem.id)}
              />
            </>
          ))}
        </main>
      </HomeContent>
    </HomeContainer>
  );
}
