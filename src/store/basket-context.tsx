import { createContext, useContext, useReducer } from "react";
import { Action, BasketContextValue, BasketProviderProps, BasketState } from "../types";

export const BasketContext = createContext<BasketContextValue | null>(null);

const initialState: BasketState = {
  items: [],
  total: 0,
};

export const useBasketContext = () => {
  const basketCtx = useContext(BasketContext);

  if (basketCtx === null) {
    throw new Error("BasketContext is null");
  }
  return basketCtx;
};



const basketReducer = (state: BasketState, action: Action): BasketState => {
  const prevItemsState = [...state.items];
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        items: prevItemsState.concat(action.payload),
        total: state.total + action.payload.price,
      };
    case "REMOVE_PRODUCT":
      return {
        items: prevItemsState.filter((item) => item.id !== action.payload.id),
        total: state.total - action.payload.price,
      };
    case "CLEAR_BASKET":
      return {
        items: [],
        total: 0,
      };
    default:
      return state;
  }
}

export const BasketContextProvider = ({ children }: BasketProviderProps) => {
  const [state, dispatch] = useReducer(basketReducer, initialState); // reducer function and initial state

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
