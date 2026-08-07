import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/productService";
import "./ViewProduct.css";

export default function ViewProduct() {
  const { id } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [product, setProduct] =
    useState(null);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);

      const data =
        await getProductById(id);

      setProduct(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!product) {
    return <h2>Product not found.</h2>;
  }

  return (
    <div className="view-product-page">
      <h1>{product.name}</h1>

      <p>
        Product Code :
        {product.productCode}
      </p>

      <p>
        Category :
        {product.categoryName}
      </p>
    </div>
  );
}