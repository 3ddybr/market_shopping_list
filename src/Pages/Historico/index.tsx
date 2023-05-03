import { useContext, useEffect, useState } from "react";

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

  return (
    <HistoricContainer>
      <HistoricContent>
        <h1>Histórico</h1>
        {dataListContext.map((list, index) => (
          <div>
            <Link to={`/${list.id}`}>
              <p key={list.id}>Cod. Lista {index + 1}</p>
              <span>Data da {convert(list.create_at)}</span>
            </Link>
          </div>
        ))}
      </HistoricContent>
    </HistoricContainer>
  );
};
