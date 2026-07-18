import {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import "./AddProduct.css";

import ProductBasicInfo from "../../components/product/BasicInformation/BasicInformation";
import ProductImages from "../../components/product/ProductImages/ProductImages";
import ProductCategory from "../../components/product/ProductCategory/ProductCategory";
import VariantGenerator from "../../components/product/VariantGenerator/VariantGenerator";
import VariantTable from "../../components/product/VariantTable/VariantTable";
import ProductValidation from "../../components/product/ProductValidation/ProductValidation";
import ProductHeader from "../../components/product/ProductHeader/ProductHeader";
import {
  addProduct,
  getPreviewProductCode,
} from "../../services/productService";
export default function AddProduct() {
  const navigate = useNavigate();

  /* ===========================================
      STATES
  =========================================== */

  const [loading, setLoading] =
    useState(false);

  const [product, setProduct] =
    useState({
      productCode: "",

      name: "",

      description: "",

      categoryId: "",
      categoryName: "",

      subCategoryId: "",
      subCategoryName: "",

      images: [],

      selectedColors: [],

selectedSizes: [],

      variants: [],

      status: "active",
    });

  /* ===========================================
      SAVE PRODUCT
  =========================================== */
/* ===========================================
    LOAD PRODUCT CODE
=========================================== */

useEffect(() => {
  const loadProductCode = async () => {
    try {
      const code =
        await getPreviewProductCode();

      setProduct((prev) => ({
        ...prev,
        productCode: code,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  loadProductCode();
}, []);
  /* ===========================================
    SAVE PRODUCT
=========================================== */

const handleSaveProduct = async () => {
  try {
    setLoading(true);

    const productCode =
      await addProduct(product);

    alert(
      `Product ${productCode} created successfully.`
    );

    navigate("/products");

  } catch (error) {

    console.error(error);

    alert(
      "Failed to save product."
    );

  } finally {

    setLoading(false);

  }
};

  return (
    <div className="add-product-page">

      {/* ===========================================
          HEADER
      =========================================== */}

      <ProductHeader
  productCode={product.productCode}
/>

      <div>
                {/* ===========================================
            BASIC INFORMATION
        =========================================== */}

        <ProductBasicInfo
          product={product}
          setProduct={setProduct}
        />

        {/* ===========================================
            PRODUCT IMAGES
        =========================================== */}

        <ProductImages
          product={product}
          setProduct={setProduct}
        />

        {/* ===========================================
            CATEGORY
        =========================================== */}

        <ProductCategory
          product={product}
          setProduct={setProduct}
        />

        {/* ===========================================
            VARIANT GENERATOR
        =========================================== */}

        <VariantGenerator
          product={product}
          setProduct={setProduct}
        />

        {/* ===========================================
            VARIANT TABLE
        =========================================== */}

        <VariantTable
          product={product}
          setProduct={setProduct}
        />

        {/* ===========================================
            VALIDATION
        =========================================== */}

        <ProductValidation
          product={product}
        />

        {/* ===========================================
            FOOTER
        =========================================== */}

        <div className="product-page-footer">

          <button
            type="button"
            className="cancel-btn"
            onClick={() =>
              navigate("/products")
            }
          >
            Cancel
          </button>

          <button
  type="button"
  className="save-btn"
  disabled={loading}
  onClick={handleSaveProduct}
>
  {loading ? "Saving..." : "Save Product"}
</button>

        </div>

      </div>

    </div>

  );

}