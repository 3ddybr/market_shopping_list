import { useRef, useState } from "react";
import { ContainerItemProduct } from "./styles";

import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";

import * as CurrencyFormat from "react-currency-format";
interface itemProductProps {
  id: number;
  nameProduct: string;
  lastValue: number;
  currentValue: number;
  done: boolean;
  onUpdateValue: (idProd: number, valueProd: number) => void;
  onUpdateDone: (idProd: number, doneProd: boolean) => void;
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
  onUpdateValue,
  onUpdateDone,
}: itemProductProps) {
  // const [isCheck, setIsCheck] = useState(done);
  // const [isLastValue, setIsLastValue] = useState(lastValue);
  const [isCurrentValue, setIsCurrentValue] = useState(currentValue);

  return (
    <ContainerItemProduct done={done}>
      <p>{id} -</p>
      <p>{nameProduct} </p>

      <CurrencyFormat
        thousandSeparator={"."}
        thousandSpacing={"3"}
        isNumericString={true}
        fixedDecimalScale
        decimalScale={2}
        decimalSeparator=","
        prefix="R$"
        value={lastValue}
        // onValueChange={(e) => setIsLastValue(e.floatValue)}
        disabled={true}
      />

      <CurrencyFormat
        defaultValue={currentValue}
        thousandSeparator={"."}
        thousandSpacing={"3"}
        isNumericString={true}
        fixedDecimalScale
        decimalScale={2}
        decimalSeparator=","
        prefix="R$"
        value={isCurrentValue}
        onValueChange={(e) => setIsCurrentValue(e.floatValue)}
      />

      <input
        type="checkbox"
        checked={done}
        onChange={(e) => onUpdateDone(id, e.target.checked)}
        title="Marcar quando ja estiver no carrinho"
      />

      <FaCheck
        size={24}
        color="green"
        cursor="pointer"
        onClick={() => onUpdateValue(id, isCurrentValue)}
        title="Atualizar o preço"
      />

      <RiDeleteBin6Line
        size={24}
        color="red"
        cursor="pointer"
        onClick={onDelete}
        title="Remover"
      />
    </ContainerItemProduct>
  );
}
