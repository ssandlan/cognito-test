import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../util/fetchProducts";
import { Product } from "../types";
import { Link } from "react-router-dom";

const ProductsList = () => {

  // The useQuery hook is used to fetch the data from the API
  // The queryKey is a unique identifier for the query for caching purposes
  // The queryFn is an async function that fetches the data from the API
  // Using React Query over React Router for data fetching for the benifits of caching, background fetching, error handling
  
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["test"],
    queryFn: fetchProducts
  });

  let content;

  // Display a loading message while the data is being fetched
  if (isPending) {
    content = <p>Loading...</p>;
  }

  // Display an error message if there is an error
  if (isError) {
    content = <><h2>Sorry there has been an error</h2><p>Error: {error.message || "failed to fetch products"}</p></>
  }

  // Display the data if it has been fetched successfully and output the data in a list
  if (data) {
    content = (
      <ul>
        {data.map((product: Product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>{product.name} - {product.price}</Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div>
      {content}
    </div>
  );
}

export default ProductsList;