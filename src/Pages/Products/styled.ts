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

    gap: 0.8rem;

    /* border: 1px solid red; */
    input {
      width: 100%;
      height: 5.4rem;
      font-size: 1.4rem;
      padding: 1.6rem;
      gap: 0.8rem;
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
  div {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* border: 1px solid red; */
  }
`;
