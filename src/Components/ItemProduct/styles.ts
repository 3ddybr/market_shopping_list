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

    padding: 0.6rem 1rem;
    gap: 0.8rem;

    border-bottom: 1px solid ${({ theme }) => theme.blue};

    div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      gap: 0.8rem;

      p:nth-child(1) {
        width: 100%;
        max-width: 2.5rem;

        color: ${({ theme }) => theme.blue};
      }
      p:nth-child(3) {
        overflow: hidden;
        text-overflow: ellipsis;
        text-decoration: ${done ? "line-through" : "initial"};
      }
    }

    p:nth-child(4) {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 4.5rem;
      color: ${({ theme }) => theme.blue};
    }

    div + div {
      justify-content: flex-end;
    }

    input[type="text"] {
      width: 100%;
      max-width: 8rem;
      background: ${({ theme }) => theme.gray_500};

      color: ${({ theme }) => theme.white};
      font-size: 1.4rem;
      padding: 0.8rem;

      border-radius: 5%;
    }

    @media (max-width: 500px) {
      padding: 0.6rem 0;
      flex-direction: column;

      div {
        justify-content: flex-start;

        p:nth-child(1) {
          width: 100%;
          max-width: 2rem;

          color: ${({ theme }) => theme.blue};
        }
      }

      font-size: 1.2rem;

      div + div {
        justify-content: center;
      }
    }
    @media (max-width: 400px) {
      input[type="text"] {
        width: 100%;
        max-width: 7.5rem;

        font-size: 1.2rem;
      }
    }
  `
);
