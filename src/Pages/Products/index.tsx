import { FormEvent, useContext, useEffect, useState } from "react";
import { ProductContainer, ProductContent } from "./styled";
import { api } from "../../services/api/api";
import { v4 as uuidv4 } from "uuid";
import { ListContext } from "../../contexts/ListContext";

export const Products = () => {
  const { dataProductContext } = useContext(ListContext);
  const [inputText, setInputText] = useState("");
  const [searchProduct, setSearchProduct] = useState(dataProductContext);

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault;
    const include = dataProductContext.filter(
      (product) => product.nameProduct === inputText
    );
    if (include.length !== 0) {
      alert("Lista de produtos ja possuí esse item");
      setSearchProduct(dataProductContext);
    } else {
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
    }
  };

  const handleSearch = () => {
    if (inputText !== "") {
      const dataFilter = dataProductContext.filter((product) =>
        product.nameProduct.includes(inputText)
      );
      setSearchProduct(dataFilter);
    } else {
      setSearchProduct(dataProductContext);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [inputText]);

  console.log("search ", searchProduct, "data context", dataProductContext);

  return (
    <ProductContainer>
      <ProductContent>
        <h1>Cadastrar Produtos</h1>

        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            value={inputText}
            placeholder="Insira nome do Produto"
            onChange={(event) => setInputText(event.target.value.toUpperCase())}
          />
          <button type="submit">Adicionar</button>
        </form>
        <div>
          {searchProduct.map((item) => (
            <p key={item.id}>{item.nameProduct}</p>
          ))}
        </div>
      </ProductContent>
    </ProductContainer>
  );
};
