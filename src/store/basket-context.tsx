/**
 * 
 *  Using Context API for state management to allow for easy use of shared state across components.
 * 
 */


import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
  Action,
  BasketContextValue,
  BasketProviderProps,
  BasketState,
} from "../types";

export const BasketContext = createContext<BasketContextValue | null>(null);


/**
 * Retrieves the initial state of the basket from local storage.
 *
 * This function checks if there are any items stored in local storage under the key 'basketItems'.
 * If items are found, it parses and returns them as the initial basket state. If no items are found,
 * it returns an empty basket state with an empty items array and a total of 0.
 *
 * @returns {BasketState} - The initial state of the basket.
 */const getInitialState = (): BasketState => {
  const basketItems = localStorage.getItem('basketItems')
  return basketItems ? JSON.parse(basketItems) as BasketState : {items: [], total: 0}
}

/**
 * Initial state of the basket, taken from local storage if there are items in the basket.
 *
 * @type {BasketState}
 */
const initialState: BasketState = {
  items: getInitialState().items,
  total: getInitialState().total,
};

/**
 * Custom hook to use the BasketContext.
 *
 * This hook provides access to the basket context. If the context is null, it throws an error.
 *
 * @returns {BasketContextType} - The current basket context.
 * @throws {Error} - Throws an error if the BasketContext is null.
 */
export const useBasketContext = () => {
  const basketCtx = useContext(BasketContext);

  if (basketCtx === null) {
    throw new Error("BasketContext is null");
  }
  return basketCtx;
};

/**
 * Reducer function to manage the state of the basket.
 *
 * This function handles actions to add or remove products from the basket.
 *
 * @param {BasketState} state - The current state of the basket.
 * @param {Action} action - The action to be performed on the basket state.
 * @returns {BasketState} - The new state of the basket after the action is performed.
 */
const basketReducer = (state: BasketState, action: Action): BasketState => {

  switch (action.type) {
    case "ADD_PRODUCT":
      // add one item to the basket
      return {
        items: state.items.concat(action.payload),
        total: state.total + action.payload.price,
      };
    case "REMOVE_PRODUCT": {
      // remove one item of the same id from the basket
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const newItems = [...state.items];
      newItems.splice(index, 1);
      return {
        items: newItems,
        total: state.total > 0 ? state.total - action.payload.price : 0,
      };
    }
    case "CLEAR_BASKET":
      // empty the basket array
      return {
        items: [],
        total: 0,
      };
    default:
      return state;
  }
};

export const BasketContextProvider = ({ children }: BasketProviderProps) => {
  const [state, dispatch] = useReducer(basketReducer, initialState); // reducer function and initial state

  useEffect(() => {
    localStorage.setItem('basketItems', JSON.stringify(state))
  }, [state])

  const ctx: BasketContextValue = {
    items: state.items,
    total: state.total,
    addToBasket(item) {
      dispatch({ type: "ADD_PRODUCT", payload: item });
    },
    removeFromBasket(item) {
      dispatch({ type: "REMOVE_PRODUCT", payload: item });
    },
    clearBasket() {
      dispatch({ type: "CLEAR_BASKET" });
    },
  };
  return (
    <BasketContext.Provider value={ctx}>{children}</BasketContext.Provider>
  );
};
