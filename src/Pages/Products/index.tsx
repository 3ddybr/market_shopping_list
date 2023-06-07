import {
  FormEvent,
  useContext,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import { ProductContainer, ProductContent } from "./styled";
import { ListContext } from "../../contexts/ListContext";

export const Products = () => {
  const { addProduct, dataProductContext } = useContext(ListContext);
  const [inputText, setInputText] = useState("");
  const [searchProduct, setSearchProduct] = useState(dataProductContext);

  const deferredSearch = useDeferredValue(searchProduct);

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();
    const include = dataProductContext.filter(
      (product) => product.nameProduct === inputText
    );
    if (include.length !== 0) {
      alert("Lista de produtos ja possuí esse item");
      setInputText("");
    } else if (inputText) {
      try {
        await addProduct(inputText);
        setInputText("");
      } catch (e) {
        console.log(e);
      }
    } else alert("Insira um produto");
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

  const orderProd = deferredSearch.sort(function (a, b) {
    if (a.nameProduct < b.nameProduct) {
      return -1;
    } else {
      return +1;
    }
  });

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
          {orderProd.map((item) => (
            <p key={item.id}>{item.nameProduct}</p>
          ))}
        </div>
      </ProductContent>
    </ProductContainer>
  );
};
