import { ItemProductTypes } from "./itemProduct";

export type marketListTypes = {
  id: number;
  idUser?: number;
  create_at: number;
  products: ItemProductTypes[];
};
