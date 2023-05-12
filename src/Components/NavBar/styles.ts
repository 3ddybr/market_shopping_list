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
  width: 100%;

  max-width: 73.6rem;

  gap: 2rem;

  /* padding: 0 1rem; */

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

export const NavBarButton = styled.button`
  width: 100%;
  max-width: 9.5rem;
  height: 100%;
  padding: 0.5rem 1rem;
  font-size: 1.4rem;
  border-radius: 8px;

  background: ${({ theme }) => theme.blue_dark};
  color: ${({ theme }) => theme.white};

  @media (max-width: 400px) {
    font-size: 1.2rem;
    padding: 0.5rem 0.5rem;
  }
`;
