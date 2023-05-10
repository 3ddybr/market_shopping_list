import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;
export const LoginContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  max-width: 73.6rem;
  font-size: 1.4rem;
  padding: 6rem 2rem;
  gap: 2rem;

  section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  img {
    padding: 2rem;
    max-width: 36.8rem;
  }
`;

const ButtonBase = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.8rem;
  border-radius: 4px;

  font-weight: 500;
  max-height: 4rem;

  font-size: 1.3rem;
  cursor: pointer;
`;

export const LoginButtonGoogle = styled(ButtonBase)`
  background: ${({ theme }) => theme.google};
  color: ${({ theme }) => theme.white};
  padding: 0px 12px 0px 0px;
  border: 1px solid ${({ theme }) => theme.google};
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.25);

  span {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    max-width: 3.5rem;
    height: 100%;
    max-height: 3.5rem;

    padding: 0.8rem;
    background: ${({ theme }) => theme.white};
  }
`;
export const LoginButtonFacebook = styled(ButtonBase)`
  background: ${({ theme }) => theme.facebook};
  color: ${({ theme }) => theme.white};
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.facebook};
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.25);
  margin-bottom: 5rem;
`;
