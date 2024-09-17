import { NavLink } from "react-router-dom";
import { useBasketContext } from "../../store/basket-context";

export const Navigation = () => {
const basketCtx = useBasketContext();

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/products">View Products</NavLink>
        </li>
        <li>
          <NavLink to="/basket">Basket ({basketCtx.items.length})</NavLink>
        </li>
      </ul>
    </nav>
  );
}