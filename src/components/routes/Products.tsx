import ProductsList from "../ProductsList";

/**
 * ProductsPage component for the application.
 *
 * This component renders the products page, which includes a main section with a heading and a list of products.
 * The ProductsList component is used to display the list of products.
 *
 * @returns {JSX.Element} - The rendered products page component.
 */
const ProductsPage = () => {
  return (
      <main>
        <h1>Products</h1>
        <ProductsList />
      </main>
  );
};

export default ProductsPage;
