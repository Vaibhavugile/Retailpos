import { useState } from "react";
import "./BarcodePrint.css";
import PrintDialog from "./PrintDialog";

export default function BarcodePrint({ product }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="print-barcode-btn"
        onClick={() => setOpen(true)}
      >
        🖨 Print Barcodes
      </button>

      {open && (
        <PrintDialog
          product={product}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}