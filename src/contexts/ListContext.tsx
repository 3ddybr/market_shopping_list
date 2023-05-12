import { createContext, useState, ReactNode, useEffect } from "react";
import { api } from "../services/api/api";
import { marketListTypes } from "../@types/marketList";
import { useAuth } from "./useAuth";

type ProductType = {
  id: string;
  nameProduct: string;
};

type ContextDefaultValues = {
  dataListContext: marketListTypes[];
  dataProductContext: ProductType[];
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
      const res = await api.get(`list?idUser=${idUser}`);
      const data: marketListTypes[] = res.data;
      setListContextValue(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getProduct = async () => {
    try {
      const res = await api.get(`products`);
      const data = res.data;

      setProductContext(data);
    } catch (err) {
      console.log(err);
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
      }}
    >
      {children}
    </ListContext.Provider>
  );
}
