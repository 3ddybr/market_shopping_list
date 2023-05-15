import { createContext, useState, ReactNode, useEffect } from "react";
import { api } from "../services/api/api";
import { marketListTypes } from "../@types/marketList";
import { useAuth } from "./useAuth";
import { addDoc, collection, getDocs } from "firebase/firestore";
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

  const getList = async () => {
    try {
      const res = await api.get("list", {
        params: { idUser },
      });
      const data: marketListTypes[] = res.data;
      setListContextValue(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getProduct = async () => {
    const productsCollectionRef = collection(dbFirebase, "products");
    try {
      const res = await getDocs(productsCollectionRef);
      const filteredData = res.docs.map((doc) => ({
        id: doc.id as string,
        ...doc.data(),
      }));

      setProductContext(filteredData as ProductType[]);
    } catch (err) {
      console.log(err);
    }
  };

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
    getList();
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
