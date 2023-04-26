import { ItemProductTypes } from "../../@types/itemProduct";
import { useEffect, useState } from "react";
import { ContainerItemProduct } from "./styles";

import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";

interface itemProductProps {
  id: number;
  nameProduct: string;
  lastValue: number;
  currentValue: number;
  done: boolean;
  onUpdate: (id: number, currentValue: number) => void;
  onDelete: () => void;
}

// const formmat = new Intl.NumberFormat("pt-BR", {
//   style: "currency",
//   currency: "BRL",
// });

// const currencyLocal = (valor: number) => {
//   let newV = new Intl.NumberFormat("pt-BR", {
//     style: "currency",
//     currency: "BRL",
//   });
//   // let newValue = valor.toLocaleString("pt-BR", {
//   //   style: "currency",
//   //   currency: "BRL",
//   // });
//   return newV.format(valor);
// };

export default function ItemProduct({
  id,
  currentValue,
  done,
  lastValue,
  nameProduct,
  onDelete,
  onUpdate,
}: itemProductProps) {
  const [isCheck, setIsCheck] = useState(done);
  const [isLastValue, setIsLastValue] = useState(lastValue);
  const [isCurrentValue, setIsCurrentValue] = useState(currentValue);

  // useEffect(() => {
  //   setIsCurrentValue(isCurrentValue);
  //   console.log("novo preco ", isCurrentValue);
  // }, [isCurrentValue]);

  return (
    <ContainerItemProduct done={isCheck}>
      <p>{id} -</p>
      <p>{nameProduct} </p>
      <input
        type="text"
        defaultValue={isLastValue}
        onChange={(e) => setIsLastValue(parseFloat(e.target.value))}
      />
      <input
        type="number"
        // value={isCurrentValue}
        defaultValue={isCurrentValue}
        onChange={(e) => setIsCurrentValue(parseFloat(e.target.value))}
      />

      <input
        type="checkbox"
        checked={isCheck}
        onChange={(e) => setIsCheck(e.target.checked)}
      />
      <FaCheck
        size={24}
        color="green"
        cursor="pointer"
        onClick={() => onUpdate(id, isCurrentValue)}
      />

      <RiDeleteBin6Line
        size={24}
        color="red"
        cursor="pointer"
        onClick={onDelete}
      />
    </ContainerItemProduct>
  );
}
