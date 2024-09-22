import { type ReactNode } from "react";
import { PropsWithChildren } from "react";

/**
 * Represents a product fetched from the API.
 *
 * @typedef {Object} Product
 * @property {number} id - The unique identifier of the product.
 * @property {string} name - The name of the product.
 * @property {string} description - The description of the product.
 * @property {number} price - The price of the product.
 */
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

/**
 * Represents a list of products.
 *
 * @typedef {Product[] | undefined} ProductList
 */
export type ProductList = Product[] | undefined;

/**
 * Custom error interface to handle errors from the API.
 *
 * @interface ProductError
 * @extends {Error}
 * @property {number} [code] - The error code.
 * @property {Object} [info] - Additional error information.
 * @property {string} info.message - The error message.
 */
export interface ProductError extends Error {
  code?: number;
  info?: {
    message: string;
  };
}

// COMPONENT PROPS TYPES

/**
 * Props for the ProductDetails component.
 *
 * @typedef {Object} ProductDetailsProps
 * @property {string | undefined} productId - The ID of the product to display details for.
 */
export type ProductDetailsProps = {
  productId: string | undefined;
};

/**
 * Props for the Button component.
 *
 * @interface ButtonProps
 * @extends {PropsWithChildren}
 * @property {boolean} [link] - Determines if the component should render a link.
 */
export interface ButtonProps extends PropsWithChildren  {
  link?: boolean;
  to?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  buttonType?: "primary" | "secondary" | "tertiary";
  small?: boolean;
  disabled?: boolean;
  tooltipText?: string;
  children: ReactNode;
};

export type ProductCardProps = {
  product: Product;
  // onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

// END COMPONENT PROPS TYPES

export type BasketState = {
  items: Product[];
  total: number;
};

export type BasketContextValue = BasketState & {
  addToBasket: (item: Product) => void;
  removeFromBasket: (item: Product) => void;
  clearBasket: () => void;
};

export type BasketProviderProps = {
  children: ReactNode;
};

// Use discriminated union types to define the actions that can be dispatched to the reducer as some don;'t have a payload
export type AddProduct = {
  type: "ADD_PRODUCT";
  payload: Product;
};

export type RemoveProduct = {
  type: "REMOVE_PRODUCT";
  payload: Product;
};

export type ClearBasket = {
  type: "CLEAR_BASKET";
};

export type Action = AddProduct | RemoveProduct | ClearBasket;
