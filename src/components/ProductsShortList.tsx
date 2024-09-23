import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Product } from "../types";
import { fetchProducts } from "../util/fetchProducts";
import ProductCard from "./UI/ProductCard";
import { shuffleArray } from "../util/shuffleArray";

const StyledProductShortList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 0 auto 4rem;
  width: 90%;
  max-width: 1200px;
  padding: 0;
`;

/**
 * Component to display a short list of products.
 *
 * This component fetches product data and displays a list of products. If the data is still being fetched,
 * it shows a loading message. If there is an error, it displays an error message. Once the data is fetched
 * successfully, it shuffles the product array and displays the first 8 products.
 *
 * @returns {JSX.Element} - The rendered component.
 */
const ProductsShortList = () => {
  // The useQuery hook is used to fetch the data from the API
  // The queryKey is a unique identifier for the query for caching purposes
  // The queryFn is an async function that fetches the data from the API
  // Using React Query over React Router for data fetching for the benifits of caching, background fetching, error handling

  /**
   * Component to display a short list of products.
   *
   * This component fetches product data and displays a list of products. If the data is still being fetched,
   * it shows a loading message. If there is an error, it displays an error message. Once the data is fetched
   * successfully, it shuffles the product array and displays the first 8 products.
   *
   * @param {Object} props - The component props.
   * @param {Array} props.data - The array of product data.
   * @param {boolean} props.isPending - Indicates if the data is still being fetched.
   * @param {boolean} props.isError - Indicates if there was an error fetching the data.
   * @param {Object} props.error - The error object if there was an error fetching the data.
   * @returns {JSX.Element} - The rendered component.
   */
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["test"],
    queryFn: fetchProducts,
  });

  let content;

  // Display a loading message while the data is being fetched
  if (isPending) {
    content = <p>Loading...</p>;
  }

  // Display an error message if there is an error
  if (isError) {
    content = (
      <>
        <h2>Sorry there has been an error</h2>
        <p>Error: {error.message || "failed to fetch products"}</p>
      </>
    );
  }

  // Display the data if it has been fetched successfully and output the data in a list
  // pick 4 products to display

  if (data) {
    const shuffledData = shuffleArray([...data]); // Shuffle the data array
    const selectedProducts = shuffledData.slice(0, 8); // Pick the first 8 products
    content = (
      <StyledProductShortList>
        {selectedProducts.map((product: Product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </StyledProductShortList>
    );
  }

  return <div>{content}</div>;
};

export default ProductsShortList;
