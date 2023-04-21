import styled from "styled-components";

export const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.4rem;

  background: ${({ theme }) => theme.gray_700};

  padding: 1rem 2rem;
  /* border: 1px solid blue; */
`;

export const NavBarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 2rem;

  ul {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 2rem;

    li {
      /* font-size: 1.2rem; */
      cursor: pointer;
    }
  }
  /* border: 1px solid green; */
`;
