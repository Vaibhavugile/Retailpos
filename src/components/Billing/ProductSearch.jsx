import "./ProductSearch.css";
import { useState } from "react";

export default function ProductSearch({
  cart,
  setCart,
}) {

  const [search, setSearch] = useState("");

  return (

    <div className="product-search-card">

      <div className="card-title">

        <h2>🔍 Product Search</h2>

        <button
          className="scan-btn"
          type="button"
        >
          📷 Scan Barcode
        </button>

      </div>

      <input
        type="text"
        className="product-search-input"
        placeholder="Search Product / Product Code / Barcode"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="product-results">

        <div className="empty-search">

          <div className="empty-icon">
            🔎
          </div>

          <h3>
            Search Products
          </h3>

          <p>
            Type a product name, product code or
            scan a barcode.
          </p>

        </div>

      </div>

    </div>

  );

}