import { createContext, useContext, useEffect, useReducer } from "react";
import {
  Action,
  BasketContextValue,
  BasketProviderProps,
  BasketState,
  Product
} from "../types";

export const BasketContext = createContext<BasketContextValue | null>(null);

const getInitialState = (): Product[] => {
  const basketItems = localStorage.getItem('basketItems')
  if (basketItems) console.log(JSON.parse(basketItems))
  return basketItems ? JSON.parse(basketItems).items as Product[] : []
}
console.log(getInitialState())

const initialState: BasketState = {
  items: getInitialState(),
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
  // const prevItemsState = [...state.items];

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
        total: state.total - action.payload.price,
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
    // console.log(localStorage.getItem('basketItems'))
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
