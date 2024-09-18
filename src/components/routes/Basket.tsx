import { v4 as uuidv4 } from "uuid";
import { useBasketContext } from "../../store/basket-context";
import Button from "../UI/Button";

const BasketPage = () => {
  const basketCtx = useBasketContext();

  return (
    <>
      <main>
        <h1>Basket</h1>
        {basketCtx.items.length === 0 && <p>Your basket is empty.</p>}
        {basketCtx.items.length > 0 && (
          <ul>
            {basketCtx.items.map((item) => (
              <li key={uuidv4()}>
                {item.name} - £{item.price.toFixed(2)}{" "}
                <Button
                  onClick={() => basketCtx.addToBasket(item)}
                  buttonType="primary"
                >
                  +
                </Button>
                <Button
                  onClick={() => basketCtx.removeFromBasket(item)}
                  buttonType="secondary"
                >
                  -
                </Button>
              </li>
            ))}
          </ul>
        )}
        <p>Total: £{basketCtx.total.toFixed(2)}</p>
        <Button onClick={() => basketCtx.clearBasket()} buttonType="secondary">
          Empty basket
        </Button>
      </main>
    </>
  );
};

export default BasketPage;
