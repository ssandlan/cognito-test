import { ProductError } from "../types";

/**
 * Fetches the list of products from a remote server.
 *
 * This function sends a GET request to the specified URL to retrieve a list of products in JSON format.
 * If the request is successful, it returns the JSON response. If the request fails, it throws a custom
 * error with additional information.
 *
 * @returns {Promise<any>} - A promise that resolves to the list of products in JSON format.
 * @throws {ProductError} - Throws an error if the fetch request fails, including the response status and error information.
 */
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