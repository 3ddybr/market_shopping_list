import { css } from "styled-components";
import styled from "styled-components";

type ContainerItemProductProps = {
  done: boolean;
};

export const ContainerItemProduct = styled.section(
  ({ done }: ContainerItemProductProps) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.4rem;

    width: 100%;
    /* height: 100vh; */
    max-height: 7.2rem;

    padding: 0.6rem 0;
    gap: 0.8rem;

    border-bottom: 1px solid ${({ theme }) => theme.blue};
    p + p {
      width: 30%;
      text-decoration: ${done ? "line-through" : "initial"};
    }

    input {
      /* width: 100%; */
      /* height: 100%; */
      /* max-height: 1.4rem; */
      font-size: 1.4rem;
      padding: 0.8rem;
    }
  `
);
