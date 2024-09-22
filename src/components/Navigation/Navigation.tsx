import { NavLink } from "react-router-dom";
import { useBasketContext } from "../../store/basket-context";
import styled from "styled-components";

const StyledNav = styled.nav`
  ul {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 1.2rem;
    @media (max-width: 768px) {
    font-size: 1rem;

    }

    li {
      margin: 1rem 0.25rem;

      &:last-child {
        margin-right: 0;
      }
        a {
        display: flex;
        gap: 0.25rem;
          color: var(--text);
          text-decoration: none;
          padding: 0.5rem 1rem;
          transition: all 0.2s ease-in-out;
          display: flex;
          align-items: center;
          &:hover {
            background-color: var(--secondary);
            color: var(--background);
            border-radius: 0.5rem;

            .basket-quantity {
              background-color: var(--background);
              color: var(--secondary);
              }
            }
            .shopping-cart--icon {
              @media (max-width: 768px) {
                height: 1rem;
                width: 1rem;
              }
            }
            .basket-quantity {

              align-items: center;
              background-color: var(--secondary);
              color: var(--background);
              border-radius: 25%;
              padding: 0.2rem 0.5rem;
              font-size: 1rem;
              margin-left: 0.5rem;

              @media (max-width: 768px) {
                font-size: 1rem;
              }
            }
        }
    }`;

/**
 * Navigation component for the application.
 *
 * This component renders the navigation bar, which includes links to the products page and the basket page.
 * It uses the basket context to manage the state of the basket.
 *
 * @returns {JSX.Element} - The rendered navigation component.
 */
export const Navigation = () => {
  const basketCtx = useBasketContext();

  return (
    <StyledNav>
      <ul>
        <li>
          <NavLink to="/products">Products</NavLink>
        </li>
        <li className="basket">
          <NavLink to="/basket">
            <svg
              className="shopping-cart--icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="basket-quantity">{basketCtx.items.length}</span>
          </NavLink>
        </li>
      </ul>
    </StyledNav>
  );
};
