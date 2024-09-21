import { Link } from "react-router-dom";
import { ProductCardProps } from "../../types";
import Button from "./Button";
import { getProductImgSrc } from "../../util/getProductImgSrc";
import { useBasketContext } from "../../store/basket-context";
import styled from "styled-components";

const StyledProductCard = styled.li`
  position: relative;
  color: #000;
  aspect-ratio: 1/1;
  width: 15rem;
  height: 17rem;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--lettuce-100);
    .product-title, .product-price {
      color: var(--background);
    }
      .product-card-image {
        transform: scale(1.2);
        transition: all 0.3s ease-in-out;
        }
  }

  a {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    }
  }

  .card-button button{
  position: relative;
  z-index: 2;
  }

.product-card-image-container { 
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin-bottom: 1rem;
  border-radius: 0.25rem 0.25rem 0 0;

  .product-card-image {
  width: 100%;
  height: 6rem;
  object-fit: contain;
  border-radius: 0.5rem;
  padding: 1rem 0;
}
}

.card-details-controls {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 1rem;
  gap: 0.5rem;
  height: 100%;

  .product-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  flex: 1;
}

  .product-price {
    display: block;
    margin-top: 0.5rem;
    font-weight: bold;
    font-size: 1.5rem;
  }
}




`;

const ProductCard = ({ product }: ProductCardProps) => {
  const basketCtx = useBasketContext();
  return (
    <StyledProductCard key={product.id}>
      <Link to={`/product/${product.id}`}>
        <div className="product-card-image-container">
          {getProductImgSrc(product.id) && (
            <img
              className="product-card-image"
              src={getProductImgSrc(product.id)?.toString()}
              alt={product.name}
            />
          )}
          {!getProductImgSrc(product.id) && (
            <img
              className="product-card-image"
              src="/images/products/no-product-image.jpg"
              alt={product.name}
            />
          )}
        </div>
        <div className="card-details-controls">
          <span className="product-title">{product.name} </span>
          <div>
            <span className="product-price">£{product.price}</span>
            <div className="card-button">
              <Button
                onClick={(event) => {
                  if (event.defaultPrevented) return; // Exits here if event has been handled
                  event.preventDefault(); // this will prevent the default event from occuring and stopping the event from bubbling up
                  basketCtx.addToBasket(product);
                }}
                buttonType="primary"
                small
              >
                Add to basket
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </StyledProductCard>
  );
};

export default ProductCard;
