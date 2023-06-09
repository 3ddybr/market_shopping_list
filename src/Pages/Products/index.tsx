import {
  FormEvent,
  useContext,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import { ProductContainer, ProductContent, ProductLis } from "./styled";
import { ListContext } from "../../contexts/ListContext";
import { Spinier } from "../../utils/spinier";

export const Products = () => {
  const { addProduct, dataProductContext } = useContext(ListContext);
  const [inputText, setInputText] = useState("");
  const [searchProduct, setSearchProduct] = useState(dataProductContext);
  const [loading, setLoading] = useState(false);

  const deferredSearch = useDeferredValue(searchProduct);

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const include = dataProductContext.filter(
      (product) => product.nameProduct === inputText
    );
    if (include.length !== 0) {
      alert("Lista de produtos ja possuí esse item");
      setInputText("");
      setLoading(false);
    } else if (inputText) {
      try {
        await addProduct(inputText);
        setInputText("");
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    } else alert("Insira um produto");
    setLoading(false);
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
          {loading ? <Spinier /> : <button type="submit">Adicionar</button>}
        </form>
        <ProductLis>
          {orderProd.map((item) => (
            <p key={item.id}>{item.nameProduct}</p>
          ))}
        </ProductLis>
      </ProductContent>
    </ProductContainer>
  );
};
