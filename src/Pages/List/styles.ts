import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  /* background: ${({ theme }) => theme.gray_700}; */
`;

export const HomeContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 0 2rem;

  position: relative;

  width: 100%;
  max-width: 73.6rem;
  font-size: 1.4rem;

  /* border: 1px solid yellow; */
  height: 100%;
  min-height: 30rem;

  form {
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: -2.5rem;

    gap: 0.8rem;
    padding: 0 2rem;

    width: 100%;
    max-width: 73.6rem;

    /* border: 1px solid yellow; */

    // css especifico do do input select >>>
    .css-b62m3t-container {
      width: 100%;
      height: 100%;
      color: black;
    }
    // css especifico do do input select >>>

    select {
      width: 100%;
      height: 5.4rem;
      font-size: 1.4rem;
      padding: 1.6rem;
      gap: 0.8rem;
      border-radius: 8px;

      border: 1px solid ${({ theme }) => theme.gray_700};
      background: ${({ theme }) => theme.gray_500};
      color: ${({ theme }) => theme.blue};
    }

    button {
      width: 100%;
      max-width: 9rem;
      height: 100%;
      max-height: 5.4rem;
      padding: 1rem;
      font-size: 1.4rem;
      border-radius: 8px;

      background: ${({ theme }) => theme.blue_dark};
      color: ${({ theme }) => theme.white};
    }
  }

  main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    width: 100%;
    padding: 9rem 0;

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      width: 100%;
      padding: 1.2rem 0;

      p {
        color: ${({ theme }) => theme.blue};
      }

      p + p {
        color: ${({ theme }) => theme.purple};

        /* span {
          color: ${({ theme }) => theme.danger};
        } */
      }

      span {
        color: ${({ theme }) => theme.white};
        background: ${({ theme }) => theme.gray_400};
        border-radius: 50%;
        gap: 1rem;
        padding: 0.2rem 0.8rem;
      }
    }
  }
`;
