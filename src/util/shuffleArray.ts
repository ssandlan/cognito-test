import { type Product } from '../types';

/**
 * Shuffles an array of products using the Fisher-Yates algorithm.
 *
 * This function creates a new array of objects where each object contains the original array value
 * and a random sort key. It then sorts the array based on the random sort key and extracts the original values.
 *
 * @param {Product[]} array - The array of products to shuffle.
 * @returns {Product[]} - The shuffled array of products.
 */
export const shuffleArray = (array: Product[]): Product[] => {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};