import "./PrintDialog.css";
import { useState } from "react";
import { printBarcodes } from "./services/PrintService";

export default function PrintDialog({
  product,
  onClose,
}) {
  const [format, setFormat] =
    useState("80mm");

  const [copies, setCopies] =
    useState(1);

  const [storeName, setStoreName] =
    useState("YOUR STORE");

  const handlePrint = () => {
    printBarcodes({
      product,
      format,
      copies,
      storeName,
    });

    onClose();
  };

  return (
    <div className="print-overlay">

      <div className="print-dialog">

        <h2>🖨 Print Barcodes</h2>

        {/* Print Format */}

        <div className="form-group">

          <label>Print Format</label>

          <select
            value={format}
            onChange={(e) =>
              setFormat(e.target.value)
            }
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

        {/* Copies */}

        <div className="form-group">

          <label>
            Copies Per Barcode
          </label>

          <input
            type="number"
            min="1"
            value={copies}
            onChange={(e) =>
              setCopies(
                Math.max(
                  1,
                  Number(e.target.value)
                )
              )
            }
          />

        </div>

        {/* Store Name */}

        <div className="form-group">

          <label>Store Name</label>

          <input
            type="text"
            placeholder="Enter Store Name"
            value={storeName}
            onChange={(e) =>
              setStoreName(
                e.target.value
              )
            }
          />

        </div>

        {/* Total Labels */}

        <div className="form-group">

          <label>Total Labels</label>

          <div
            style={{
              padding: "10px",
              background: "#f5f5f5",
              borderRadius: "8px",
              fontWeight: 600,
            }}
          >
            {product.variants.length} Variants ×{" "}
            {copies} Copies ={" "}
            {product.variants.length *
              copies} Labels
          </div>

        </div>

        <div className="dialog-footer">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="print-btn"
            onClick={handlePrint}
          >
            🖨 Print
          </button>

        </div>

      </div>

    </div>
  );
}