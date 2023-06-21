import styled from "styled-components";

export const HistoricContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;

export const HistoricContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem 2rem;

  line-height: 2rem;

  position: relative;

  width: 100%;
  max-width: 73.6rem;
  font-size: 1.4rem;

  height: 100%;
  min-height: 30rem;

  gap: 2rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    gap: 2rem;
  }

  h3 {
    color: ${({ theme }) => theme.danger};
  }
`;
