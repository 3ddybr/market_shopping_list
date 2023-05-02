import { useEffect, useState } from "react";
import { api } from "../../services/api/api";
import { marketListTypes } from "../../@types/marketList";

import moment from "moment";
import { Link } from "react-router-dom";
import { HistoricContainer, HistoricContent } from "./styles";

export const Historic = () => {
  const [list, setList] = useState<marketListTypes[]>([]);

  const getList = async () => {
    try {
      const res = await api.get(`list`);
      const data = res.data;

      setList(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const convert = (date: number) => {
    const dateFormat = moment(date).format("DD/MM/YYYY");
    return dateFormat;
  };

  return (
    <HistoricContainer>
      <HistoricContent>
        <h1>Histórico</h1>
        {list?.map((list) => (
          <div>
            <Link to={`/${list.id}`}>
              <p key={list.id}>Cod. Lista {list.id}</p>
              <span>Data da {convert(list.create_at)}</span>
            </Link>
          </div>
        ))}
      </HistoricContent>
    </HistoricContainer>
  );
};
