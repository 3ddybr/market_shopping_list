import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  background: ${({ theme }) => theme.gray_400};
`;

export const HomeContent = styled.div`
  display: flex;
  align-items: self-start;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  max-width: 110rem;

  border: 1px solid yellow;
  height: 100vh;
`;
