import { useQuery } from "@tanstack/react-query";
import { useBasketContext } from "../store/basket-context";
import { ProductDetailsProps, ProductList } from "../types";
import { fetchProducts } from "../util/fetchProducts";

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

  // Filter the data if it has been fetched successfully and output the product details
  if (data && productId) {
    const product = data.find((product) => product.id === parseInt(productId));
    if (product) {
    content = (
      <div>
        <h2>{product?.name}</h2>
        <p>{product?.description}</p>
        <p>Price: {product?.price}</p>
        <button onClick={() => basketCtx.addToBasket(product)}>Add to basket</button>
      </div>
    );
  }
  }

  return <div>{content}</div>;
};

export default ProductDetails;
