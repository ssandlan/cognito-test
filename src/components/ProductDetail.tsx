import { useQuery } from "@tanstack/react-query";
import { useBasketContext } from "../store/basket-context";
import { ProductDetailsProps, ProductList } from "../types";
import { fetchProducts } from "../util/fetchProducts";
import Button from "./UI/Button";
import styled from "styled-components";
import { getProductImgSrc } from "../util/getProductImgSrc";

const StyledProductDetailsContainer = styled.div`
width: 100vw;
max-width:600px;
main {
  padding-bottom:3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  @media (min-width: 440px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
`;

const StyledControls = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;

  .product-details-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background-color: #fff;
    margin-bottom: 1rem;
    border-radius: 1rem;

    .product-details-image {
      width: 100%;
      height: 6rem;
      object-fit: contain;
      border-radius: 1rem;
      padding: 1rem 0;
    }
  }
`;

const ProductImage = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;


  &.product-details-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background-color: #fff;
    margin-bottom: 1rem;
    border-radius: 0.5rem;

    .product-details-image {
      width: 100%;
      height: 100%;
      max-height: 20rem;
      object-fit: contain;
      padding: 1rem 0;
    }
  }
`;

const ProductDetails = ({ productId }: ProductDetailsProps) => {
  const basketCtx = useBasketContext();

  // The useQuery hook is used to fetch the data from the API
  // The queryKey is a unique identifier for the query for caching purposes
  // The queryFn is an async function that fetches the data from the API
  // Using React Query over React Router for data fetching for the benifits of caching, background fetching, error handling

  const { data, isPending, isError, error } = useQuery<ProductList>({
    queryKey: ["test"],
    queryFn: fetchProducts,
  });

  let content;

  // Display a loading message while the data is being fetched
  if (isPending) {
    content = <main><p>Loading...</p></main>;
  }

  // Display an error message if there is an error
  if (isError) {
    content = (
      <main>
        <h2>Sorry there has been an error</h2>
        <p>Error: {error.message || "failed to fetch products"}</p>
      </main>
    );
  }

  // Filter the data if it has been fetched successfully and output the product details
  if (data && productId) {
    const product = data.find((product) => product.id === parseInt(productId));
    if (product) {
      content = (
        <main>
          <h1>{product?.name}</h1>
          <ProductImage className="product-details-image-container">
            {getProductImgSrc(product.id) && (
              <img
                className="product-details-image"
                src={getProductImgSrc(product.id)?.toString()}
                alt={product.name}
              />
            )}
            {!getProductImgSrc(product.id) && (
              <img
                className="product-details-image"
                src="/images/products/no-product-image.jpg"
                alt={product.name}
              />
            )}
          </ProductImage>
          <p>{product?.description}</p>
          <h3>Price: £{product?.price}</h3>
          <StyledControls>
            <Button
              onClick={() => basketCtx.addToBasket(product)}
              buttonType="primary"
            >
              Add to basket
            </Button>
            {/* only show the remove from basket button if the product is in the basket */}
            {basketCtx.items.find((item) => item.id === product.id) && (
              <Button
                onClick={() => basketCtx.removeFromBasket(product)}
                buttonType="tertiary"
              >
                Remove from basket
              </Button>
            )}
            <Button link to="/basket" buttonType="secondary">
              View basket
            </Button>
          </StyledControls>
        </main>
      );
    }
  }

  return (
    <StyledProductDetailsContainer>{content}</StyledProductDetailsContainer>
  );
};

export default ProductDetails;
