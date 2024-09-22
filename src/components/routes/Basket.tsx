import { v4 as uuidv4 } from "uuid";
import { useBasketContext } from "../../store/basket-context";
import Button from "../UI/Button";
import styled from "styled-components";
import { Product } from "../../types";
import { getProductImgSrc } from "../../util/getProductImgSrc";

const StyledBasketContainer = styled.main`
  padding: 0 1rem;
`;

const StyledBasket = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1.2rem;

  li {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin: 1rem 0;
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.25rem;
    @media (min-width: 440px) {
      flex-direction: row;
      padding: 0.25rem 0.5rem;
    }

    .price {
      font-weight: bold;
      margin-right: 1rem;
    }

    .price-quantity-control {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
    }
  }
`;

const StyledTotal = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ProductImage = styled.div`
  &.product-details-image-container {
    background-color: #fff;
    border-radius: 0.5rem;

    .product-details-image {
      width: 100%;
      height: 100%;
      max-height: 3rem;
      object-fit: contain;
    }
  }
`;

/**
 * BasketPage component for the application.
 *
 * This component renders the basket page, which includes a list of products in the basket.
 * It uses the basket context to retrieve the items in the basket and displays the count of each product.
 *
 * @returns {JSX.Element} - The rendered basket page component.
 */
const BasketPage = () => {
  const basketCtx = useBasketContext();

  /**
   * Counts the occurrences of a product in the basket.
   *
   * This function counts how many times a specific product appears in the basket.
   *
   * @param {Product[]} arr - The array of products in the basket.
   * @param {Product} val - The product to count occurrences of.
   * @returns {number} - The number of occurrences of the product in the basket.
   */
  // Count the occurances of a product in the basket so the amount of products can be displayed for each product
  const countOccurrences = (arr: Product[], val: Product): number =>
    // compare products based on their id property
    arr.reduce((a, v) => (v.id === val.id ? a + 1 : a), 0);

  return (
    <main>
      <StyledBasketContainer>
        <h1>Basket</h1>
        {basketCtx.items.length === 0 && <p>Your basket is empty.</p>}
        {basketCtx.items.length > 0 && (
          <StyledBasket>
            {basketCtx.items
              // only display the amount of products if there is more than one of the same product in the basket, otherwise just display the product name
              // if there is more of one item, only show it once with the amount of items next to it
              // order the items in the basket by the order they were added
              .sort(
                (a, b) =>
                  basketCtx.items.indexOf(a) - basketCtx.items.indexOf(b)
              )
              // use findIndex to ensure that only the first occurrence of each unique product (based on id) is included in the filtered array.
              .filter(
                (item, index, self) =>
                  index === self.findIndex((product) => product.id === item.id)
              )
              .map((item) => {
                if (countOccurrences(basketCtx.items, item) > 1) {
                  // display the product name and the amount of products in the basket
                  return (
                    <li key={uuidv4()}>
                      <a href={`../product/${item.id}`}>
                        <ProductImage className="product-details-image-container">
                          {getProductImgSrc(item.id) && (
                            <img
                              className="product-details-image"
                              src={getProductImgSrc(item.id)?.toString()}
                              alt={item.name}
                            />
                          )}
                          {!getProductImgSrc(item.id) && (
                            <img
                              className="product-details-image"
                              src="/images/products/no-product-image.jpg"
                              alt={item.name}
                            />
                          )}
                        </ProductImage>
                      </a>
                      <span>
                        <a href={`../product/${item.id}`}>{item.name}</a> x{" "}
                        {countOccurrences(basketCtx.items, item)}
                      </span>{" "}
                      <div className="price-quantity-control">
                        <span className="price">
                          £
                          {(
                            item.price * countOccurrences(basketCtx.items, item)
                          ).toFixed(2)}
                        </span>
                        <Button
                          onClick={() => basketCtx.addToBasket(item)}
                          buttonType="secondary"
                        >
                          +
                        </Button>
                        <Button
                          onClick={() => basketCtx.removeFromBasket(item)}
                          buttonType="secondary"
                        >
                          -
                        </Button>
                      </div>
                    </li>
                  );
                } else {
                  // Just display the product name
                  return (
                    <li key={uuidv4()}>
                      <a href={`../product/${item.id}`}>
                        <ProductImage className="product-details-image-container">
                          {getProductImgSrc(item.id) && (
                            <img
                              className="product-details-image"
                              src={getProductImgSrc(item.id)?.toString()}
                              alt={item.name}
                            />
                          )}
                          {!getProductImgSrc(item.id) && (
                            <img
                              className="product-details-image"
                              src="/images/products/no-product-image.jpg"
                              alt={item.name}
                            />
                          )}
                        </ProductImage>
                      </a>
                      <span>
                        <a href={`../product/${item.id}`}>{item.name}</a>
                      </span>{" "}
                      <div className="price-quantity-control">
                        <span className="price">£{item.price.toFixed(2)}</span>
                        <Button
                          onClick={() => basketCtx.addToBasket(item)}
                          buttonType="secondary"
                        >
                          +
                        </Button>
                        <Button
                          onClick={() => basketCtx.removeFromBasket(item)}
                          buttonType="secondary"
                        >
                          -
                        </Button>
                      </div>
                    </li>
                  );
                }
              })}
          </StyledBasket>
        )}
        <StyledTotal className="total">
          Total: £{basketCtx.total.toFixed(2)}
        </StyledTotal>
        <div className="stacked">
          {/* Checkout functionality not implemented */}
          <Button
            onClick={() => {}}
            buttonType="primary"
            disabled
            tooltipText="Sorry, checkout is not available right now"
          >
            Checkout
          </Button>
          <Button onClick={() => basketCtx.clearBasket()} buttonType="tertiary">
            Empty basket
          </Button>
        </div>
      </StyledBasketContainer>
    </main>
  );
};

export default BasketPage;
