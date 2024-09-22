import { Outlet } from "react-router-dom";
import Header from "../Header";
import styled from "styled-components";

/**
 * Styled component for the root layout.
 *
 * This component styles the root layout container. It sets the display to flex, arranges its children
 * in a column, centers the items, and sets the width to 100%.
 */
const StyledRootLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

/**
 * RootLayout component for the application.
 *
 * This component serves as the root layout for the application. It includes a header and an outlet for
 * rendering nested routes. The layout is styled using the StyledRootLayout component.
 *
 * @returns {JSX.Element} - The rendered root layout component.
 */
const RootLayout = () => {
  return (
    <StyledRootLayout>
      <Header />
      <Outlet />
    </StyledRootLayout>
  );
};

export default RootLayout;
