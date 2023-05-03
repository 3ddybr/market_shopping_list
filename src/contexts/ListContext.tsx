import { createContext, useState, ReactNode, useEffect } from "react";
import { api } from "../services/api/api";
import { marketListTypes } from "../@types/marketList";

// type ListContextData = {
//   listData: marketListTypes[];
// };

type ContextDefaultValues = {
  dataContext: marketListTypes[];
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

  const getList = async () => {
    try {
      const res = await api.get(`list`);
      const data = res.data;

      setListContextValue(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <ListContext.Provider value={{ dataContext: listContextValue }}>
      {children}
    </ListContext.Provider>
  );
}
