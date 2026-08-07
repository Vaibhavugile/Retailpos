import "./PrintDialog.css";
import { useState } from "react";
import { printBarcodes } from "./services/PrintService";

export default function PrintDialog({
  product,
  onClose,
}) {
  const [format, setFormat] =
    useState("80mm");

  

  const [storeName, setStoreName] =
    useState("YOUR STORE");
const [variants, setVariants] = useState(() =>
  (product.variants || []).map((variant) => ({
    ...variant,
    selected: true,
    printQty: Number(variant.stock || 0),
  }))
);
  const handlePrint = () => {

  const selectedVariants = variants.filter(
    (variant) =>
      variant.selected &&
      variant.printQty > 0
  );

  if (!selectedVariants.length) {
    alert("Please select at least one variant.");
    return;
  }

  printBarcodes({
    product,
    variants: selectedVariants,
    format,
    storeName,
  });

  onClose();
};
const totalLabels = variants.reduce(
  (total, variant) => {
    if (!variant.selected) return total;

    return total + Number(variant.printQty || 0);
  },
  0
);
  return (
  <div className="print-dialog">

    <h2>🖨 Print Barcodes</h2>

    {/* Product Summary */}

    <div className="product-summary">

      <h3>{product.name}</h3>

      <p>
        {product.productCode} • {product.categoryName}
      </p>

    </div>

    {/* Print Format */}

    <div className="form-group">

      <label>Print Format</label>

      <select
        value={format}
        onChange={(e) => setFormat(e.target.value)}
      >
        <option value="58mm">
          🧾 58mm Thermal Printer (2")
        </option>

        <option value="80mm">
          🖨 80mm Thermal Printer (3")
        </option>

        <option value="a4">
          📄 A4 Sticker Sheet (3 × 8 Labels)
        </option>

      </select>

    </div>

    {/* Store Name */}

    <div className="form-group">

      <label>Store Name</label>

      <input
        type="text"
        placeholder="Enter Store Name"
        value={storeName}
        onChange={(e) =>
          setStoreName(e.target.value)
        }
      />

    </div>

    {/* Select All */}

    <label className="select-all">

      <input
        type="checkbox"
        checked={variants.every((v) => v.selected)}
        onChange={(e) => {

          const checked = e.target.checked;

          setVariants((prev) =>
            prev.map((variant) => ({
              ...variant,
              selected: checked,
            }))
          );

        }}
      />

      Select All Variants

    </label>

    {/* Variants Table */}

    <div className="variants-table">

      <table>

        <thead>

          <tr>

            <th></th>

            <th>Variant</th>

            <th>Barcode</th>

            <th>Current Stock</th>

            <th>Print Qty</th>

          </tr>

        </thead>

        <tbody>

          {variants.map((variant, index) => (

            <tr key={variant.id}>

              <td>

                <input
                  type="checkbox"
                  checked={variant.selected}
                  onChange={(e) => {

                    const updated = [...variants];

                    updated[index].selected =
                      e.target.checked;

                    setVariants(updated);

                  }}
                />

              </td>

              <td>

                {variant.variantName}

              </td>

              <td>

                {variant.barcode}

              </td>

              <td>

                {variant.stock}

              </td>

              <td>

                <div className="qty-control">

                  <button
                    type="button"
                    onClick={() => {

                      const updated = [...variants];

                      updated[index].printQty =
                        Math.max(
                          0,
                          updated[index].printQty - 1
                        );

                      setVariants(updated);

                    }}
                  >
                    −
                  </button>

                  <input
                    type="number"
                    min="0"
                    value={variant.printQty}
                    onChange={(e) => {

                      const updated = [...variants];

                      updated[index].printQty =
                        Number(e.target.value);

                      setVariants(updated);

                    }}
                  />

                  <button
                    type="button"
                    onClick={() => {

                      const updated = [...variants];

                      updated[index].printQty++;

                      setVariants(updated);

                    }}
                  >
                    +
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

    {/* Summary */}

    <div className="print-summary">

      <p>

        Selected Variants :
        <strong>
          {" "}
          {
            variants.filter(
              (v) => v.selected
            ).length
          }
        </strong>

      </p>

      <p>

        Total Labels :
        <strong>
          {" "}
          {totalLabels}
        </strong>

      </p>

    </div>

    {/* Total */}

    <div className="total-card">

      <span>Total Labels</span>

      <h3>{totalLabels}</h3>

    </div>

    {/* Footer */}

    <div className="dialog-footer">

      <button
        className="cancel-btn"
        onClick={onClose}
      >
        Cancel
      </button>

      <button
        className="reset-btn"
        onClick={() =>
          setVariants(
            (product.variants || []).map(
              (variant) => ({
                ...variant,
                selected: true,
                printQty: Number(
                  variant.stock || 0
                ),
              })
            )
          )
        }
      >
        Reset
      </button>

      <button
        className="print-btn"
        disabled={totalLabels === 0}
        onClick={handlePrint}
      >
        🖨 Print
      </button>

    </div>

  </div>
);
}