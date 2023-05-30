import { FormEvent, useContext, useEffect, useState } from "react";

import ItemProduct from "../../Components/ItemProduct";
// import { api } from "../../services/api/api";
import { useParams } from "react-router-dom";
import { marketListTypes } from "../../@types/marketList";
import { ItemProductTypes } from "../../@types/itemProduct";

import moment from "moment";
import Select from "react-select";

import { HomeContainer, HomeContent } from "./styles";
import { ListContext } from "../../contexts/ListContext";
import ReactModal from "react-modal";
import { ModalProduct } from "../../Components/ModalProduct";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { dbFirebase } from "../../services/api/apiFirebase";

type selectItemType = {
  value: string | undefined;
  label: string | undefined;
};

ReactModal.setAppElement("#root");

export default function List() {
  const { id: idParams } = useParams();
  const { dataProductContext, dataListContext } = useContext(ListContext);

  const [list, setList] = useState<marketListTypes>();
  const [product, setProduct] = useState<ItemProductTypes[]>([]);
  const [selectedProd, setSelectedPro] = useState<selectItemType>();
  const [modalIsOpen, setIsOpen] = useState(false);

  function lastValueProd(prodId: string) {
    const dataListAtual = list?.create_at as number;

    const deleteNewerLists = dataListContext.filter(
      (item) => item.create_at < dataListAtual
    );
    const orderMarketList = deleteNewerLists.sort(function (a, b) {
      if (a.create_at > b.create_at) {
        return -1;
      } else {
        return +1;
      }
    });

    const findFirstList = orderMarketList.find((item) =>
      item.products.find((item) => item.id === prodId)
    );

    if (!findFirstList) {
      return 1;
    } else {
      const result = findFirstList?.products.find((item) => item.id === prodId);
      return result?.currentValue as number;
    }
  }

  function isOpen() {
    setIsOpen(true);
  }

  function onRequestClose() {
    setIsOpen(false);
  }
  const docRef = doc(dbFirebase, `list/${idParams}`);
  const getList = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = { ...docSnap.data(), id: docSnap.id };
      const dataConvert = data as marketListTypes;
      setList(dataConvert);
      setProduct(dataConvert.products);
    }

    //------------------chamada a fake api via axios------------------
    // const res = await api.get(`list/${idParams}`);
    // const data: marketListTypes = res.data;
    // setList(data);
    // setProduct(data.products);
  };

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
        await updateDoc(docRef, {
          products: newItemList,
        });

        //------------------chamada a fake api via axios------------------
        // await api.patch(`/list/${idParams}`, {
        //   id: idParams,
        //   products: newItemList,
        // });
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
      isOpen();
      //abrir modal de cadastro
      alert(`Por favor cadastre o produto!`);
    }
  };

  const handleDelete = async (idProduct: string) => {
    const newProductFilter = product.filter((item) => item.id !== idProduct);
    try {
      await updateDoc(docRef, {
        products: newProductFilter,
      });
    } catch (e) {
      console.log(e);
    }

    setProduct(newProductFilter);

    //------------------chamada a fake api via axios------------------
    // try {
    //   await api.put(`/list/${idParams}`, {
    //     id: idParams,
    //     create_at: list?.create_at,
    //     idUser: list?.idUser,
    //     products: [...product.filter((item) => item.id !== idProduct)],
    //   });
    // } catch (e) {
    //   console.log(e);
    // }
    // getList();
  };

  const handleUpdateValue = async (idProd: string, valueProd: number) => {
    const updatedProduct = product.map((item) =>
      item.id === idProd
        ? {
            ...item,
            currentValue: valueProd,
          }
        : item
    );
    try {
      await updateDoc(docRef, {
        products: updatedProduct,
      });
    } catch (error) {
      console.log(error);
    }
    setProduct(updatedProduct);

    //------------------chamada a fake api via axios------------------
    // try {
    //   await api.patch(`/list/${idParams}`, {
    //     id: idParams,
    //     products: [
    //       ...product.map((item) =>
    //         item.id === idProd
    //           ? {
    //               ...item,
    //               currentValue: valueProd,
    //             }
    //           : item
    //       ),
    //     ],
    //   });
    // } catch (e) {
    //   console.log(e);
    // }
    // getList();
  };

  const handleUpdateDone = async (idProd: string, doneProd: boolean) => {
    const updatedProduct = product.map((item) =>
      item.id === idProd
        ? {
            ...item,
            done: doneProd,
          }
        : item
    );
    try {
      await updateDoc(docRef, {
        products: updatedProduct,
      });
    } catch (error) {
      console.log(error);
    }
    setProduct(updatedProduct);

    //------------------chamada a fake api via axios------------------
    //   try {
    //     await api.patch(`/list/${idParams}`, {
    //       id: idParams,
    //       products: [
    //         ...product.map((item) =>
    //           item.id === idProd
    //             ? {
    //                 ...item,
    //                 done: doneProd,
    //               }
    //             : item
    //         ),
    //       ],
    //     });
    //   } catch (e) {
    //     console.log(e);
    //   }
    //   getList();
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

  const orderProd = product.sort(function (a, b) {
    if (a.nameProduct < b.nameProduct) {
      return -1;
    } else {
      return +1;
    }
  });
  const dataList = list?.create_at as number;

  console.log("dentro de list produt", orderProd);

  const counterDone = product.filter((item) => item.done === true);
  return (
    <HomeContainer>
      <HomeContent>
        <form onSubmit={handleAddProduct}>
          <Select
            escapeClearsValue={true}
            placeholder="Insira novo item"
            defaultInputValue={selectedProduct?.value}
            options={productsOptions}
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
                {counterDone.length} / {product.length}
              </span>
            </p>
          </header>
          {orderProd?.map((productItem, index) => (
            <ItemProduct
              key={productItem.id}
              index={index + 1}
              id={productItem.id}
              nameProduct={productItem.nameProduct}
              lastValue={lastValueProd(productItem.id)}
              currentValue={productItem.currentValue}
              done={productItem.done}
              onUpdateDone={handleUpdateDone}
              onUpdateValue={(idProd, valueProd) =>
                handleUpdateValue(idProd, valueProd)
              }
              onDelete={() => handleDelete(productItem.id)}
            />
          ))}
          <ModalProduct isOpen={modalIsOpen} onRequestClose={onRequestClose} />
        </main>
      </HomeContent>
    </HomeContainer>
  );
}

// {
/* <input
            type="text"
            placeholder="Insira novo item"
            value={inputText}
            defaultValue={""}
            alt="Adicionar um produto a lista"
            onChange={(event) => setInputText(event.target.value.toUpperCase())}
          /> */
// }

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
