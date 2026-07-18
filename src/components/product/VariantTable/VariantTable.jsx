import "./VariantTable.css";
import { useState } from "react";
export default function VariantTable({
  product,
  setProduct,
}) {

  /* ===========================================
    UPDATE VARIANT
=========================================== */
const [bulk, setBulk] = useState({
  purchasePrice: "",
  sellingPrice: "",
  stock: "",
  lowStock: "",
});
const updateVariant = (
  index,
  field,
  value
) => {
  const variants = [...product.variants];

  variants[index] = {
    ...variants[index],
    [field]: value,
  };

  setProduct((prev) => ({
    ...prev,
    variants,
  }));
};
/* ===========================================
    BULK UPDATE
=========================================== */

const applyToAll = (field) => {
  if (bulk[field] === "") return;

  const variants = product.variants.map((variant) => ({
    ...variant,
    [field]: Number(bulk[field]),
  }));

  setProduct((prev) => ({
    ...prev,
    variants,
  }));
};
  if (
    !product.variants ||
    product.variants.length === 0
  ) {
    return null;
  }

  return (
    <div className="product-card">

      <div className="product-card-header">

        <div>

          <h2>
            Generated Variants
          </h2>

          <p>
            {product.variants.length} Variant
            {product.variants.length > 1
              ? "s"
              : ""}{" "}
            Generated
          </p>

        </div>

      </div>
  

      <div className="variant-table-wrapper">

        <table className="variant-table">

          <thead>

            <tr>

              <th>Variant</th>

              <th>Barcode</th>

              <th>SKU</th>

              <th>Purchase Price</th>

              <th>Selling Price</th>

              <th>Stock</th>

              <th>Low Stock</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

  {product.variants.map(
    (variant, index) => (

      <tr key={variant.id}>

        <td className="variant-name">
          {variant.variantName}
        </td>

        <td>
          {variant.barcode}
        </td>

        <td>
          {variant.sku}
        </td>

        <td>

          <input
            type="number"
            className="table-input"
            value={variant.purchasePrice}
            onChange={(e) =>
              updateVariant(
                index,
                "purchasePrice",
                Number(e.target.value)
              )
            }
          />

        </td>

        <td>

          <input
            type="number"
            className="table-input"
            value={variant.sellingPrice}
            onChange={(e) =>
              updateVariant(
                index,
                "sellingPrice",
                Number(e.target.value)
              )
            }
          />

        </td>

        <td>

          <input
            type="number"
            className="table-input"
            value={variant.stock}
            onChange={(e) =>
              updateVariant(
                index,
                "stock",
                Number(e.target.value)
              )
            }
          />

        </td>

        <td>

          <input
            type="number"
            className="table-input"
            value={variant.lowStock}
            onChange={(e) =>
              updateVariant(
                index,
                "lowStock",
                Number(e.target.value)
              )
            }
          />

        </td>

        <td>

          <label className="status-switch">

            <input
              type="checkbox"
              checked={variant.status}
              onChange={(e) =>
                updateVariant(
                  index,
                  "status",
                  e.target.checked
                )
              }
            />

            <span>
              {variant.status
                ? "Active"
                : "Inactive"}
            </span>

          </label>

        </td>

      </tr>

    )
  )}

</tbody>

        </table>

      </div>
          <div className="bulk-update-card">

  <h3>Bulk Update</h3>

  <div className="bulk-grid">

    {/* Purchase */}

    <div className="bulk-item">

      <label>Purchase Price</label>

      <input
        type="number"
        value={bulk.purchasePrice}
        onChange={(e) =>
          setBulk({
            ...bulk,
            purchasePrice: e.target.value,
          })
        }
      />

      <button
        onClick={() =>
          applyToAll("purchasePrice")
        }
      >
        Apply
      </button>

    </div>

    {/* Selling */}

    <div className="bulk-item">

      <label>Selling Price</label>

      <input
        type="number"
        value={bulk.sellingPrice}
        onChange={(e) =>
          setBulk({
            ...bulk,
            sellingPrice: e.target.value,
          })
        }
      />

      <button
        onClick={() =>
          applyToAll("sellingPrice")
        }
      >
        Apply
      </button>

    </div>

    {/* Stock */}

    <div className="bulk-item">

      <label>Stock</label>

      <input
        type="number"
        value={bulk.stock}
        onChange={(e) =>
          setBulk({
            ...bulk,
            stock: e.target.value,
          })
        }
      />

      <button
        onClick={() =>
          applyToAll("stock")
        }
      >
        Apply
      </button>

    </div>

    {/* Low Stock */}

    <div className="bulk-item">

      <label>Low Stock</label>

      <input
        type="number"
        value={bulk.lowStock}
        onChange={(e) =>
          setBulk({
            ...bulk,
            lowStock: e.target.value,
          })
        }
      />

      <button
        onClick={() =>
          applyToAll("lowStock")
        }
      >
        Apply
      </button>

    </div>

  </div>

</div>

    </div>
  );
}