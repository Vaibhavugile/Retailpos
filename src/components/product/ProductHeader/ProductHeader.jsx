import { useNavigate } from "react-router-dom";
import "./ProductHeader.css";

export default function ProductHeader({
  productCode,
}) {
  const navigate = useNavigate();

  return (
    <div className="product-header">

      <div className="product-header-left">

        <button
          className="back-btn"
          type="button"
          onClick={() => navigate("/products")}
        >
          ← Back to Products
        </button>

        <h1>
          Add New Product
        </h1>

        <p>
          Create products with variants,
          pricing, inventory, barcode
          and stock management.
        </p>

      </div>

      <div className="product-code-card">

        <span className="product-code-label">
          Product Code
        </span>

        <h2>
          {productCode || "Auto Generated"}
        </h2>

        <small>
          Generated automatically when
          the product is saved.
        </small>

      </div>

    </div>
  );
}