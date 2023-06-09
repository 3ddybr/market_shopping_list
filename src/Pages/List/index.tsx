import { FormEvent, useContext, useEffect, useState } from "react";

import ItemProduct from "../../Components/ItemProduct";
// import { api } from "../../services/api/api";
import { useParams } from "react-router-dom";
import { marketListTypes } from "../../@types/marketList";
import { ItemProductTypes } from "../../@types/itemProduct";

import moment from "moment";
import Select from "react-select";

import { HomeContainer, HomeContent, HomeQuestionLastProduct } from "./styles";
import { ListContext } from "../../contexts/ListContext";
import ReactModal from "react-modal";
import { ModalProduct } from "../../Components/ModalProduct";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { dbFirebase } from "../../services/api/apiFirebase";
import { Spinier } from "../../utils/spinier";

type selectItemType = {
  value: string | undefined;
  label: string | undefined;
};

ReactModal.setAppElement("#root");

export function List() {
  const { id: idParams } = useParams();
  const { dataProductContext, dataListContext } = useContext(ListContext);
  const [list, setList] = useState<marketListTypes>();
  const [product, setProduct] = useState<ItemProductTypes[]>([]);
  const [selectedProd, setSelectedPro] = useState<selectItemType>();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const docRef = doc(dbFirebase, `list/${idParams}`);
  const getList = async () => {
    setLoading(true);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = { ...docSnap.data(), id: docSnap.id };
      const dataConvert = data as marketListTypes;
      setList(dataConvert);
      setProduct(dataConvert.products);
    }
    setLoading(false);

    //------------------chamada a fake api via axios------------------
    // const res = await api.get(`list/${idParams}`);
    // const data: marketListTypes = res.data;
    // setList(data);
    // setProduct(data.products);
  };
  const dateListCurrent = list?.create_at as number;
  const deleteNewerList = dataListContext.filter(
    (item) => item.create_at < dateListCurrent
  );

  const orderMarketList = deleteNewerList.sort(function (a, b) {
    if (a.create_at > b.create_at) {
      return -1;
    } else {
      return +1;
    }
  });
  function lastValueProd(prodId: string) {
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

  //funcao que pergunta se quer trazer os produtos da lista anterior
  const getProductsLastList = async () => {
    if (dataListContext.length > 1) {
      const ultima = orderMarketList.find(
        (item) => item.create_at < dateListCurrent
      );
      ultima === undefined ? setProduct([]) : setProduct(ultima.products);
      await updateDoc(docRef, {
        products: ultima?.products,
      });
    } else {
      alert("Não existe lista anterior");
    }
  };

  useEffect(() => {
    getList();
    setSelectedPro({
      value: "",
      label: "",
    });
  }, [idParams]);

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let newItemList = [...product];
    let existNewList = newItemList.filter(
      (item) => item.id === selectedProd?.value
    );
    let existeTabProd = dataProductContext.filter(
      (item) => item.id === selectedProd?.value
    );

    if (existNewList.length > 0) {
      alert("Lista já possui este produto");
      existNewList = [];
      existeTabProd = [];
      setSelectedPro({
        value: "",
        label: "",
      });
      setLoading(false);
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
      existNewList = [];
      setSelectedPro({
        value: "",
        label: "",
      });

      setLoading(false);

      getList();
      return;
    } else {
      isOpen();
      alert(`Por favor cadastre o produto!`);
      setLoading(false);
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

  function checkArrays(a1: ItemProductTypes[], a2: ItemProductTypes[]) {
    return JSON.stringify(a1) === JSON.stringify(a2);
  }

  const handleUpdateValue = async (idProd: string, valueProd: number) => {
    const updatedProduct = product.map((item) =>
      item.id === idProd && valueProd
        ? {
            ...item,
            currentValue: valueProd,
          }
        : item
    );
    if (!checkArrays(product, updatedProduct)) {
      try {
        await updateDoc(docRef, {
          products: updatedProduct,
        });
      } catch (error) {
        console.log(error);
      }
      setProduct(updatedProduct);
    } else {
      return;
    }

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

  const convertToFormatDate = (date: number) => {
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
  const dateList = list?.create_at as number;

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
          {loading ? <Spinier /> : <button type="submit">Adicionar</button>}
        </form>
        <main>
          <h3>Market List, criada em {convertToFormatDate(dateList)}</h3>
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
          {product.length > 0 ? (
            <>
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
            </>
          ) : loading ? (
            <Spinier />
          ) : (
            <HomeQuestionLastProduct>
              <p>
                Deseja trazer os produtos da ultima lista ? Se não adicione 1
                produto.
              </p>
              <button onClick={getProductsLastList}>Sim</button>
            </HomeQuestionLastProduct>
          )}

          <ModalProduct isOpen={modalIsOpen} onRequestClose={onRequestClose} />
        </main>
      </HomeContent>
    </HomeContainer>
  );
}
