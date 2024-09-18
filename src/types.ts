import { type ReactNode } from "react";
import { PropsWithChildren } from "react";

// Define the Product type to represent the data fetched from the API
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export type ProductList = Product[] | undefined;

// Define a custom error interface to handle errors from the API
export interface ProductError extends Error {
  code?: number;
  info?: {
    message: string;
  };
}

// COMPONENT PROPS TYPES

export type ProductDetailsProps = {
  productId: string | undefined;
};

export interface ButtonProps extends PropsWithChildren  {
  link?: boolean;
  to?: string;
  onClick?: () => void;
  buttonType?: "primary" | "secondary" | "tertiary";
  children: ReactNode;
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
