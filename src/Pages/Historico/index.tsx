import { useContext, useState } from "react";

import moment from "moment";
import { Link } from "react-router-dom";
import { HistoricContainer, HistoricContent } from "./styles";
import { ListContext } from "../../contexts/ListContext";
import { AuthContext } from "../../contexts/AuthContext";

export const Historic = () => {
  const { user } = useContext(AuthContext);

  const { dataListContext } = useContext(ListContext);
  const ListFilterPerUser = dataListContext.filter(
    (list) => list.idUser === user?.id
  );

  const convertToFormatDate = (date: number) => {
    const dateFormat = moment(date).format("DD/MM/YYYY");
    return dateFormat;
  };

  const orderMarketList = ListFilterPerUser.sort(function (a, b) {
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
        {dataListContext.length > 0 ? (
          orderMarketList.map((list, index) => (
            <Link key={list.id} to={`/${list.id}`}>
              <p key={list.id}>{index + 1} - Criada em</p>
              <span> {convertToFormatDate(list.create_at)}</span>
            </Link>
          ))
        ) : (
          <>
            <h3>Crie sua primeira lista, clicando no botão "Nova Lista" </h3>
            <h3>no menu acima</h3>
          </>
        )}
      </HistoricContent>
    </HistoricContainer>
  );
};
