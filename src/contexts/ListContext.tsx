import { createContext, useState, ReactNode, useEffect } from "react";
import { marketListTypes } from "../@types/marketList";
import { useAuth } from "./useAuth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { dbFirebase } from "../services/api/apiFirebase";

type ProductType = {
  id: string;
  nameProduct: string;
};

type ContextDefaultValues = {
  dataListContext: marketListTypes[];
  dataProductContext: ProductType[];
  addProduct: (nameProduct: string) => Promise<void>;
};

interface ListProviderProps {
  children: ReactNode;
}

export const ListContext = createContext<ContextDefaultValues>(
  {} as ContextDefaultValues
);

export function ListProvider({ children }: ListProviderProps) {
  const [listContextValue, setListContextValue] = useState<marketListTypes[]>(
    []
  );
  const [productContext, setProductContext] = useState<ProductType[]>([]);
  const { id: idUser } = useAuth();

  useEffect(() => {
    setListContextValue([]);
    const getList = async () => {
      const listCollectionRef = collection(dbFirebase, "list");

      try {
        const q = query(listCollectionRef, where("idUser", "==", idUser));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          doc.id;
          const data = doc.data();
          const res = { id: doc.id, ...data };

          setListContextValue((prev) => [...prev, res as marketListTypes]);
        });

        //------------------chamada a fake api via axios------------------
        // const res = await api.get("list", {
        //   params: { idUser },
        // });
        // const data: marketListTypes[] = filteredData.
        //------------------------------------------------------
      } catch (err) {
        console.log(err);
      }
    };
    getList();
  }, [idUser]);

  console.log(listContextValue);

  //Funçao que pega os produtos
  const getProduct = async () => {
    const productsCollectionRef = collection(dbFirebase, "products");
    try {
      const res = await getDocs(productsCollectionRef);
      const filteredData = res.docs.map((doc) => ({
        id: doc.id as string,
        ...doc.data(),
      }));

      // console.log(filteredData);
      setProductContext(filteredData as ProductType[]);
    } catch (err) {
      console.log(err);
    }
  };

  //Função para adicionar produtos no array ja chamado no context
  const addProduct = async (nameProduct: string) => {
    try {
      const productsRef = collection(dbFirebase, "products");
      const refDoc = await addDoc(productsRef, {
        nameProduct: nameProduct,
      });
      const newProduct = { id: refDoc.id, nameProduct };

      setProductContext((prev) => [...prev, newProduct]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <ListContext.Provider
      value={{
        dataListContext: listContextValue,
        dataProductContext: productContext,
        addProduct,
      }}
    >
      {children}
    </ListContext.Provider>
  );
}
