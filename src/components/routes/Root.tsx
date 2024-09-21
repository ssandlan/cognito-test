import { Outlet } from "react-router-dom";
import Header from "../Header";
import styled from "styled-components";

const StyledRootLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const RootLayout = () => {
  return (
    <StyledRootLayout>
      <Header />
      <Outlet />
    </StyledRootLayout>
  );
};

export default RootLayout;
