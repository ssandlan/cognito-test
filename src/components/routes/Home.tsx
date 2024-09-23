import styled from 'styled-components';
import HomeCarousel from '../../components/UI/HomeCarousel';
import ProductsShortList from '../ProductsShortList';
import Button from '../UI/Button';

/**
 * Styled component for the home page body.
 *
 * This component styles the main body of the home page. It includes padding and margin settings.
 */
const StyledHomeBody = styled.div`
  padding: 0 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

/**
 * HomePage component for the application.
 *
 * This component renders the home page, which includes a carousel, a list of best-selling products
 * (Actually random products as there is no checkout fucntion yet), and a button to view all products.
 * The layout is styled using the StyledHomeBody component.
 *
 * @returns {JSX.Element} - The rendered home page component.
 */
const HomePage = () => {
  return (
      <main style={{marginTop:"-33px", marginBottom: "3rem"}}>
        <HomeCarousel />
        <StyledHomeBody>

        <h1>Some of our best sellers</h1>
        <ProductsShortList />
        <Button link buttonType="primary" to="/products">View all products</Button>
        </StyledHomeBody>
      </main>
  );
};

export default HomePage;
