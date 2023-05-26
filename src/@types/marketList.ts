import { ItemProductTypes } from "./itemProduct";

export type marketListTypes = {
  id: string;
  idUser?: string;
  create_at: number;
  products: ItemProductTypes[];
};
