import { RiDeleteBin6Line } from "react-icons/ri";
import { ItemProductTypes } from "../../@types/itemProduct";
import { useState } from "react";
import { ContainerItemProduct } from "./styles";

export default function ItemProduct({
  id,
  currentValue,
  done,
  lastValue,
  nameProduct,
}: ItemProductTypes) {
  const [isCheck, setIsCheck] = useState(done);
  return (
    <ContainerItemProduct done={isCheck}>
      <p>{id} -</p>
      <p>{nameProduct} </p>
      <input
        type="text"
        defaultValue={lastValue.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      />
      <input
        type="text"
        defaultValue={currentValue.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      />
      <input
        type="checkbox"
        checked={isCheck}
        onChange={(e) => setIsCheck(e.target.checked)}
      />
      <RiDeleteBin6Line size={24} color="red" />
    </ContainerItemProduct>
  );
}
