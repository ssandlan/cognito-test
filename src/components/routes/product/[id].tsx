import { useParams } from "react-router-dom";
import ProductDetails from "../../ProductDetail";

const ProductPage = () => {
  const params = useParams();
  const productId = params.id;

  return <ProductDetails productId={productId} />;
};

export default ProductPage;
