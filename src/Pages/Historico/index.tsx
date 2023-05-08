import { useContext } from "react";

import moment from "moment";
import { Link } from "react-router-dom";
import { HistoricContainer, HistoricContent } from "./styles";
import { ListContext } from "../../contexts/ListContext";

export const Historic = () => {
  // const [list, setList] = useState<marketListTypes[]>([]);

  const { dataListContext } = useContext(ListContext);

  // const getList = async () => {
  //   try {
  //     const res = await api.get(`list`);
  //     const data = res.data;

  //     setList(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getList();
  // }, []);

  const convert = (date: number) => {
    const dateFormat = moment(date).format("DD/MM/YYYY");
    return dateFormat;
  };

  const orderMarketList = dataListContext.sort(function (a, b) {
    if (a.create_at > b.create_at) {
      return -1;
    } else {
      return +1;
    }
  });

  return (
    <HistoricContainer>
      <HistoricContent>
        <h1>Histórico</h1>
        {orderMarketList.map((list, index) => (
          <Link to={`/${list.id}`}>
            <p key={list.id}>{index + 1} - Criada em</p>
            <span> {convert(list.create_at)}</span>
          </Link>
        ))}
      </HistoricContent>
    </HistoricContainer>
  );
};
