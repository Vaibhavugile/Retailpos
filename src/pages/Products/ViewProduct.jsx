import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./ViewProduct.css";

import ProductHeader from "../../components/product/ProductHeader/ProductHeader";
import ProductBasicInfo from "../../components/product/BasicInformation/BasicInformation";
import ProductImages from "../../components/product/ProductImages/ProductImages";
import ProductCategory from "../../components/product/ProductCategory/ProductCategory";
import VariantGenerator from "../../components/product/VariantGenerator/VariantGenerator";
import VariantTable from "../../components/product/VariantTable/VariantTable";
import BarcodePrint from "../../components/barcode/BarcodePrint";

import { getProductById } from "../../services/productService";

export default function ViewProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);

      const data = await getProductById(id);

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
    <div className="product-page">

      <ProductHeader
        productCode={product.productCode}
      />

      <div>

        <ProductBasicInfo
          product={product}
          setProduct={setProduct}
        />

        {/* <ProductImages
          product={product}
          setProduct={setProduct}
        /> */}

        <ProductCategory
          product={product}
          setProduct={setProduct}
        />

        <VariantGenerator
          product={product}
          setProduct={setProduct}
        />

        <VariantTable
          product={product}
          setProduct={setProduct}
        />

        <BarcodePrint
          product={product}
        />

        

      </div>

    </div>
  );
}