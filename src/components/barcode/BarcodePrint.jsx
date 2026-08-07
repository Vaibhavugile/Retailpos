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
  <div
    className="print-dialog-overlay"
    onClick={() => setOpen(false)}
  >
    <div onClick={(e) => e.stopPropagation()}>
      <PrintDialog
        product={product}
        onClose={() => setOpen(false)}
      />
    </div>
  </div>
)}
    </>
  );
}