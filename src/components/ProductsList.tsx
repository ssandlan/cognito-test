import { useQuery } from "@tanstack/react-query";

// Define the Product type to represent the data fetched from the API
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

// Define a custom error interface to handle errors from the API
interface ProductError extends Error {
  code?: number;
  info?: {
    message: string;
  };
}

const ProductsList = () => {

  // The useQuery hook is used to fetch the data from the API
  // The queryKey is a unique identifier for the query for caching purposes
  // The queryFn is an async function that fetches the data from the API
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      const response = await fetch(
        "https://s3.eu-west-2.amazonaws.com/techassessment.cognitoedu.org/products.json"
      );

      if (!response.ok) {
        const error: ProductError = new Error(
          "An error occurred while fetching the data."
        );

        error.code = response.status;
        error.info = await response.json();
        throw error;
      }
      return response.json();
    },
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
            {product.name} - {product.price}
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