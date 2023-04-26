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
  const [create_at, setCreateAt] = useState(Number);

  const getList = async () => {
    const res = await api.get(`list/${id}`);
    const data: marketListTypes = res.data;

    // console.log("console data", data);
    setList(res.data);
    setProduct(data.products);
    setCreateAt(data.create_at);
  };

  useEffect(() => {
    getList();
  }, []);

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();
    let newItemList = [...product];
    newItemList.push({
      id: newItemList.length + 1,
      nameProduct: inputText,
      currentValue: 0,
      done: false,
    });
    setProduct(newItemList);
    setInputText("");

    try {
      await api.patch(`/list/${id}`, {
        id: id,
        products: newItemList,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (idProduct: number) => {
    // let newList = list;
    // // let create_atList = newList.map((i) => i.create_at);

    // newList?.map((list) =>
    //   list.products.filter((item) => item.id !== idProduct)
    // );
    // console.log(newList);
    // ______________________
    try {
      await api.put(`/list/${id}`, {
        id: id,
        create_at: create_at,
        products: [...product.filter((item) => item.id !== idProduct)],
      });
    } catch (e) {
      console.log(e);
    }
    getList();
  };

  return (
    <HomeContainer>
      <HomeContent>
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            placeholder="Insira novo item"
            // defaultValue={inputText}
            onChange={(event) => setInputText(event.target.value)}
          />
          <button type="submit">Adicionar</button>
        </form>
        <main>
          <header>
            <p>
              Total de Itens: <span>{product.length}</span>
            </p>
            <p>
              Concluídos <span>1 / {product.length}</span>
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
