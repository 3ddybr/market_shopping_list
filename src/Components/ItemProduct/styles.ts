import { css } from "styled-components";
import styled from "styled-components";

type ContainerItemProductProps = {
  done: boolean;
};

export const ContainerItemProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;

export const ContentItemProduct = styled.section(
  ({ done }: ContainerItemProductProps) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 1.4rem;

    width: 100%;
    max-width: 73.6rem;
    max-height: 5.2rem;

    padding: 0.6rem 1rem;
    gap: 0.8rem;

    border-bottom: 1px solid ${({ theme }) => theme.blue};

    p:nth-child(1) {
      width: 100%;
      max-width: 2.5rem;

      color: ${({ theme }) => theme.blue};
    }

    p:nth-child(3) {
      width: 55%;
      overflow: hidden;
      text-overflow: ellipsis;
      text-decoration: ${done ? "line-through" : "initial"};
    }

    /* p + p {
      width: 45%;
      text-decoration: ${done ? "line-through" : "initial"};
    } */

    input[type="text"] {
      width: 100%;
      max-width: 9rem;
      background: ${({ theme }) => theme.gray_500};

      color: ${({ theme }) => theme.white};
      font-size: 1.4rem;
      padding: 0.8rem;

      border-radius: 5%;
    }

    @media (max-width: 500px) {
      p:nth-child(1) {
        width: 100%;
        max-width: 1rem;

        color: ${({ theme }) => theme.blue};
      }

      font-size: 1.2rem;

      input[type="text"] {
        width: 100%;
        max-width: 7.5rem;

        font-size: 1.2rem;
        padding: 0.4rem;

        /* color: red; */
      }
    }
    @media (max-width: 400px) {
      font-size: 1rem;

      input[type="text"] {
        width: 100%;
        max-width: 5.5rem;

        font-size: 1rem;
        padding: 0.2rem;

        /* color: red; */
      }
    }
  `
);

// max-width: 7.5rem;

// font-size: 1.2rem;
