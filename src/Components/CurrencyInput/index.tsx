// import { NumericFormat } from "react-number-format";

// interface Props {
//   value: number;
// }

// export const CurrencyInput: React.FC<Props> = ({ value }) => {
//   return (
//     <NumericFormat
//       value={value}
//       displayType={"input"}
//       thousandSeparator={"."}
//       decimalSeparator={","}
//       decimalScale={2}
//       fixedDecimalScale={true}
//       prefix={"R$ "}
//     />
//   );
// };

// import React, { InputHTMLAttributes } from "react";
// import PropTypes from "prop-types";

// interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
//   currencyMask?: boolean;
// }

// // Input.propTypes = {
// //   currencyMask: PropTypes.bool,
// //   ...InputHTMLAttributes.propTypes,
// // };
// export const CurrencyInput: React.FC<InputProps> = ({
//   currencyMask,
//   ...props
// }) => {
//   const formatCurrency = (value: string) => {
//     return value
//       .replace(/\D/g, "")
//       .replace(/(\d{1,2})$/, ",$1")
//       .replace(/(\d+)(\d{3},\d{2})$/g, "$1.$2")
//       .replace(/(\d+)(\d{3})(\d{3},\d{2})$/g, "$1.$2.$3")
//       .replace(/(\d+)(\d{3})(\d{3})(\d{3},\d{2})$/g, "$1.$2.$3.$4")
//       .replace(/^(0{1,})(\d)/g, "$2");
//   };

//   const handleCurrencyMask = (event: React.FormEvent<HTMLInputElement>) => {
//     if (currencyMask) {
//       event.currentTarget.value = formatCurrency(event.currentTarget.value);
//     }
//   };

//   return (
//     <input
//       {...props}
//       onKeyUp={handleCurrencyMask}
//       onBlur={handleCurrencyMask}
//     />
//   );
// };

import React, { InputHTMLAttributes, useCallback } from "react";

import { cep, currency, cpf } from "./masks";

import "./styles.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask: "cep" | "currency" | "cpf";
  prefix?: string;
}

const Input: React.FC<InputProps> = ({ mask, prefix, ...props }) => {
  const handleKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (mask === "cep") {
        cep(e);
      }
      if (mask === "currency") {
        currency(e);
      }
      if (mask === "cpf") {
        cpf(e);
      }
    },
    [mask]
  );

  return (
    <div className="input-group prefix">
      {prefix && <span className="prefix-span">{prefix}</span>}
      <input {...props} onKeyUp={handleKeyUp} />
    </div>
  );
};

export default Input;
