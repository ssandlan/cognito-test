import { useParams } from "react-router-dom";
import ProductDetails from "../../ProductDetail";

/**
 * ProductPage component for the application.
 *
 * This component retrieves the product ID from the URL parameters using the useParams hook
 * and renders the ProductDetails component with the retrieved product ID.
 *
 * @returns {JSX.Element} - The rendered product page component.
 */
const ProductPage = () => {
  const params = useParams();
  const productId = params.id;

  return <ProductDetails productId={productId} />;
};

export default ProductPage;
