import { useParams } from "react-router-dom";
import ProductDetails from "../../ProductDetail";

const ProductPage = () => {
  const params = useParams();

  const productId = params.id;

  return (
    <div>
      <h1>Product Page</h1>
      <ProductDetails productId={productId} />
    </div>
  );
};

export default ProductPage;
