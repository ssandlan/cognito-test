import { ProductError } from "../types";

export const fetchProducts = async () => {
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
  // console.log(await response.json());
  return response.json();
}