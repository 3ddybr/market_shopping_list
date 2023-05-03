import { FormEvent, useContext, useEffect, useState } from "react";

import ItemProduct from "../../Components/ItemProduct";
import { api } from "../../services/api/api";
import { useParams } from "react-router-dom";
import { marketListTypes } from "../../@types/marketList";
import { ItemProductTypes } from "../../@types/itemProduct";

import moment from "moment";
import { v4 as uuidv4 } from "uuid";

import { HomeContainer, HomeContent } from "./styles";
import { ListContext } from "../../contexts/ListContext";

export default function List() {
  const { id } = useParams();
  const { dataListContext: dataContext } = useContext(ListContext);

  const [list, setList] = useState<marketListTypes>();
  const [listSecondary, setListSecondary] = useState<marketListTypes>();
  const [product, setProduct] = useState<ItemProductTypes[]>([]);
  const [inputText, setInputText] = useState("");

  console.log(dataContext);
  const getList = async () => {
    const res = await api.get(`list/${id}`);
    const data: marketListTypes = res.data;
    setList(data);
    setProduct(data.products);
  };

  // const getListSecondary = async () => {
  //   const idAnterior = id;
  //   const res = await api.get(`list/${idAnterior}`);
  //   const data: marketListTypes = res.data;
  //   // setListSecondary(data);
  //   // setProduct(data.products);
  //   // setCreateAt(data.create_at);
  // };

  // const newData =
  // const format2 = (valor: number) => {
  //   valor.toLocaleString("pt-BR", {
  //     style: "currency",
  //     currency: "BRL",
  //   });
  // };

  // const formmat = (valor: number) => {
  //   new Intl.NumberFormat("pt-BR", {
  //     style: "currency",
  //     currency: "BRL",
  //   });
  //   valor;
  // };

  useEffect(() => {
    getList();
    setInputText("");
  }, []);

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();
    let newItemList = [...product];

    if (inputText) {
      newItemList.push({
        id: newItemList.length + 1,
        nameProduct: inputText,
        currentValue: 1,
        done: false,
      });

      try {
        await api.patch(`/list/${id}`, {
          id: id,
          products: newItemList,
        });
      } catch (e) {
        console.log(e);
      }
      setInputText("");
      setProduct(newItemList);
      getList();
    } else alert("Por favor insira um produto!");
  };

  const handleDelete = async (idProduct: number) => {
    try {
      await api.put(`/list/${id}`, {
        id: id,
        create_at: list?.create_at,
        products: [...product.filter((item) => item.id !== idProduct)],
      });
    } catch (e) {
      console.log(e);
    }
    getList();
  };

  const handleUpdateValue = async (idProd: number, valueProd: number) => {
    try {
      await api.patch(`/list/${id}`, {
        id: id,
        products: [
          ...product.map((item) =>
            item.id === idProd
              ? {
                  ...item,
                  currentValue: valueProd,
                }
              : item
          ),
        ],
      });
    } catch (e) {
      console.log(e);
    }
    getList();
  };

  const handleUpdateDone = async (idProd: number, doneProd: boolean) => {
    try {
      await api.patch(`/list/${id}`, {
        id: id,
        products: [
          ...product.map((item) =>
            item.id === idProd
              ? {
                  ...item,
                  done: doneProd,
                }
              : item
          ),
        ],
      });
    } catch (e) {
      console.log(e);
    }
    getList();
  };

  const convert = (date: number) => {
    const dateFormat = moment(date).format("DD/MM/YYYY");
    return dateFormat;
  };

  const dataList = list?.create_at as number;

  return (
    <HomeContainer>
      <HomeContent>
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            placeholder="Insira novo item"
            value={inputText}
            defaultValue={""}
            alt="Adicionar um produto a lista"
            onChange={(event) => setInputText(event.target.value.toUpperCase())}
          />
          <button type="submit">Adicionar</button>
        </form>
        <main>
          <h3>Market List, criada em {convert(dataList)}</h3>
          <header>
            <p>
              Total de Itens: <span>{product.length}</span>
            </p>
            <p>
              Concluídos{" "}
              <span>
                {1} / {product.length}
              </span>
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
                // onUpdateDone={(idProd, doneProd) =>
                //   handleUpdateDone(idProd, doneProd)
                // }
                onUpdateDone={handleUpdateDone}
                onUpdateValue={(idProd, valueProd) =>
                  handleUpdateValue(idProd, valueProd)
                }
                onDelete={() => handleDelete(productItem.id)}
              />
            </>
          ))}
        </main>
      </HomeContent>
    </HomeContainer>
  );
}
