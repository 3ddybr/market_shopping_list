import styled from "styled-components";

export const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;

export const ProductContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
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

  form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 1rem;

    gap: 0.8rem;

    input {
      width: 100%;
      height: 5.4rem;
      font-size: 1.4rem;
      padding: 1.6rem;
      border-radius: 8px;

      border: 1px solid ${({ theme }) => theme.gray_700};
      background: ${({ theme }) => theme.gray_500};
      color: ${({ theme }) => theme.white};
    }
    button {
      width: 100%;
      max-width: 9rem;
      height: 100%;
      max-height: 5.4rem;
      padding: 1.6rem;
      font-size: 1.4rem;
      border-radius: 8px;

      background: ${({ theme }) => theme.blue_dark};
      color: ${({ theme }) => theme.white};
    }
  }

  @media (max-width: 500px) {
    font-size: 1.2rem;

    form {
      input {
        width: 100%;
        height: 3rem;

        font-size: 1.2rem;
      }
      button {
        height: 3rem;
        padding: 0.4rem;
      }
    }
  }
`;

export const ProductLis = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 1rem;
`;
