import { FormEvent, useContext, useEffect, useState } from "react";

import ItemProduct from "../../Components/ItemProduct";
import { api } from "../../services/api/api";
import { useParams } from "react-router-dom";
import { marketListTypes } from "../../@types/marketList";
import { ItemProductTypes } from "../../@types/itemProduct";

import moment from "moment";
import Select, { InputActionMeta } from "react-select";

import { HomeContainer, HomeContent } from "./styles";
import { ListContext } from "../../contexts/ListContext";

type selectItemType = {
  value: string | undefined;
  label: string | undefined;
};

export default function List() {
  const { id } = useParams();
  const { dataProductContext } = useContext(ListContext);

  const [list, setList] = useState<marketListTypes>();
  const [product, setProduct] = useState<ItemProductTypes[]>([]);
  const [selectedProd, setSelectedPro] = useState<selectItemType>();
  // const [inputText, setInputText] = useState("");

  // const [listSecondary, setListSecondary] = useState<marketListTypes>();
  // console.log(dataContext);
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
    setSelectedPro({
      value: "",
      label: "",
    });
  }, []);

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();
    let newItemList = [...product];
    //verificar se ja existe produto na lista
    let existeNewList = newItemList.filter(
      (item) => item.id === selectedProd?.value
    );
    let existeTabProd = dataProductContext.filter(
      (item) => item.id === selectedProd?.value
    );

    if (existeNewList.length > 0) {
      //tem na tab prod e na lista
      alert("Lista já possui este produto");
      existeNewList = [];
      existeTabProd = [];
      setSelectedPro({
        value: "",
        label: "",
      });
      return;
    } else if (existeTabProd.length > 0) {
      newItemList.push({
        id: selectedProd?.value as string,
        nameProduct: selectedProd?.label as string,
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
      setSelectedPro({
        value: "",
        label: "",
      });
      setProduct(newItemList);

      existeTabProd = [];
      existeNewList = [];
      setSelectedPro({
        value: "",
        label: "",
      });

      getList();
      return;
    } else {
      alert(`Por favor insira um produto cadastrado!`);
    }
  };

  const handleDelete = async (idProduct: string) => {
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

  const handleUpdateValue = async (idProd: string, valueProd: number) => {
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

  const handleUpdateDone = async (idProd: string, doneProd: boolean) => {
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

  let productsOptions = dataProductContext.map((prod) => ({
    value: prod.id,
    label: prod.nameProduct.toLocaleUpperCase(),
  }));

  let selectedProduct = productsOptions.find(
    (e) => e.value === selectedProd?.value
  );

  const dataList = list?.create_at as number;

  return (
    <HomeContainer>
      <HomeContent>
        <form onSubmit={handleAddProduct}>
          <Select
            escapeClearsValue={true}
            placeholder="Insira novo item"
            defaultInputValue={selectedProduct?.value}
            options={productsOptions}
            // inputValue={inputText}
            // onInputChange={(e) => setInputText(e)}
            onChange={(event) =>
              setSelectedPro({
                value: event?.value,
                label: event?.label.toLocaleUpperCase(),
              })
            }
            isClearable={true}
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
            <ItemProduct
              key={productItem.id}
              index={index + 1}
              id={productItem.id}
              nameProduct={productItem.nameProduct}
              lastValue={1}
              currentValue={productItem.currentValue}
              done={productItem.done}
              onUpdateDone={handleUpdateDone}
              onUpdateValue={(idProd, valueProd) =>
                handleUpdateValue(idProd, valueProd)
              }
              onDelete={() => handleDelete(productItem.id)}
            />
          ))}
        </main>
      </HomeContent>
    </HomeContainer>
  );
}

{
  /* <input
            type="text"
            placeholder="Insira novo item"
            value={inputText}
            defaultValue={""}
            alt="Adicionar um produto a lista"
            onChange={(event) => setInputText(event.target.value.toUpperCase())}
          /> */
}

// onUpdateDone={(idProd, doneProd) =>
//   handleUpdateDone(idProd, doneProd)
// }

// const idProd = dataProductContext.find((e) =>
//   e.id ? e.nameProduct === inputText : e.id
// );

// if (inputText) {
//   newItemList.push({
//     id: inputText.value as string,
//     nameProduct: inputText.label as string,
//     currentValue: 1,
//     done: false,
//   });

//   try {
//     await api.patch(`/list/${id}`, {
//       id: id,
//       products: newItemList,
//     });
//   } catch (e) {
//     console.log(e);
//   }
//   setInputText({
//     value: "",
//     label: "",
//   });
//   setProduct(newItemList);
//   getList();
// } else alert("Por favor insira um produto!");
