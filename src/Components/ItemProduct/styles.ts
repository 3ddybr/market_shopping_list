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

    padding: 0.6rem 0;
    gap: 0.8rem;

    border-bottom: 1px solid ${({ theme }) => theme.blue};

    p:nth-child(2) {
      width: 45%;
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

      font-size: 1.4rem;
      padding: 0.8rem;
    }

    @media (max-width: 500px) {
      font-size: 1.2rem;

      input[type="text"] {
        width: 100%;
        max-width: 7.5rem;

        font-size: 1.2rem;
        padding: 0.4rem;

        /* color: red; */
      }
    }
    @media (max-width: 360px) {
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
