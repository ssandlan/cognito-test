import { Link } from "react-router-dom";
import { Navigation } from "./Navigation/Navigation";
import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: #fff;
  box-shadow: 0 0px 20px rgba(0, 0, 0, 0.08);
  color: var(--text);
  width: 100%;
  margin-bottom: 2rem;
  position: fixed;
  z-index: 100;

  .container {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 3rem;
    margin: 0 auto;
    max-width: 1200px;

    @media (max-width: 768px) {
      padding: 0 1rem 0 1rem
    }

    h1 {
      margin: 0;
      padding: 0.5rem 0 0;

      img {
      width:100%;
      max-width: 200px;
        @media (max-width: 425px) {
          max-width: 100px;
          }
    }
  }
`;

/**
 * Header component for the application.
 *
 * This component renders the header section of the application, which includes a logo and navigation links.
 * The logo is wrapped in a link that navigates to the home page. The navigation links are rendered by the
 * Navigation component.
 *
 * @returns {JSX.Element} - The rendered header component.
 */
const Header = () => {
  return (
    <StyledHeader>
      <div className="container">
        <h1>
          <Link to="/"><img src="/logo.svg" alt="Fresh Food" /></Link>
        </h1>
        <Navigation />
      </div>
    </StyledHeader>
  );
};

export default Header;
