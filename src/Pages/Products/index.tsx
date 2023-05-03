import { FormEvent, useState } from "react";
import { ProductContainer, ProductContent } from "./styled";
import { api } from "../../services/api/api";
import { v4 as uuidv4 } from "uuid";

export const Products = () => {
  const [inputText, setInputText] = useState("");

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault;

    if (inputText) {
      try {
        await api.post(`products`, {
          id: uuidv4(),
          nameProduct: inputText,
        });
      } catch (e) {
        console.log(e);
      }
    } else alert("Insira um produto");

    // alert(`Produto ${inputText} cadastrado`);
  };

  return (
    <ProductContainer>
      <ProductContent>
        <h1>Cadastrar Produtos</h1>

        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            value={inputText}
            // defaultValue={""}
            placeholder="Insira nome do Produto"
            onChange={(event) => setInputText(event.target.value.toUpperCase())}
          />
          <button type="submit">Adicionar</button>
        </form>
      </ProductContent>
    </ProductContainer>
  );
};
