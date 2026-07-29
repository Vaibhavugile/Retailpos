import JsBarcode from "jsbarcode";
import { generateThermalTemplate } from "../templates/ThermalTemplate";

export function print58mm({
  product,
  copies,
  storeName,
}) {
  const printWindow = window.open(
    "",
    "_blank",
    "width=350,height=800"
  );

  if (!printWindow) {
    alert("Unable to open print window.");
    return;
  }

  const body = generateThermalTemplate({
    product,
    storeName,
    copies,
    paperWidth: "58mm",
  });

  printWindow.document.open();

  printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>

<meta charset="UTF-8">

<title>58mm Barcode</title>

<style>

@page{

    size:58mm auto;

    margin:0;

}

*{

    margin:0;

    padding:0;

    box-sizing:border-box;

    font-family:Arial,sans-serif;

}

html,
body{

    width:58mm;

    margin:0;

    padding:0;

    background:#ffffff;

    overflow-x:hidden;

}

/* ==========================================
                TOOLBAR
========================================== */

.toolbar{

    position:sticky;

    top:0;

    display:flex;

    justify-content:flex-end;

    gap:10px;

    padding:10px;

    background:#ffffff;

    border-bottom:1px solid #e5e7eb;

    z-index:999;

}

.toolbar button{

    padding:8px 16px;

    border:none;

    border-radius:8px;

    background:#111827;

    color:#fff;

    cursor:pointer;

    font-size:14px;

    font-weight:600;

}

.toolbar button:hover{

    background:#000;

}

/* ==========================================
                CONTENT
========================================== */

.content{

    width:58mm;

    margin:0 auto;

    padding:2mm;

}

/* ==========================================
              THERMAL SHEET
========================================== */

.sheet-58{

    width:58mm;

    margin:0 auto;

}

/* ==========================================
                 LABEL
========================================== */

.label{

    width:54mm;

    margin:0 auto 2mm auto;

    padding:2mm 1mm;

    text-align:center;

    break-inside:avoid;

    page-break-inside:avoid;

    border-bottom:1px dashed #d1d5db;

}

.label:last-child{

    border-bottom:none;

}

/* ==========================================
                TEXT
========================================== */

.store{

    font-size:13px;

    font-weight:700;

}

.product{

    margin-top:2px;

    font-size:12px;

    font-weight:600;

    word-break:break-word;

}

.variant{

    margin-top:2px;

    font-size:10px;

    word-break:break-word;

}

.price{

    margin:3px 0;

    font-size:16px;

    font-weight:700;

}

/* ==========================================
               BARCODE
========================================== */

.barcode{

    display:block;

    width:100%;

    height:42px;

    margin:5px auto;

}

.barcode-number{

    margin-top:2px;

    font-size:10px;

    letter-spacing:1px;

    font-weight:600;

}

.sku{

    margin-top:2px;

    font-size:8px;

    color:#555;

}

/* ==========================================
                PRINT
========================================== */

@media print{

    @page{

        size:58mm auto;

        margin:0;

    }

    html,
    body{

        width:58mm;

        margin:0;

        padding:0;

        background:#fff;

    }

    .toolbar{

        display:none !important;

    }

    .content{

        padding:0;

    }

    .label{

        margin:0;

        border-bottom:none;

        page-break-after:auto;

        page-break-inside:avoid;

        break-inside:avoid;

    }

}

</style>

</head>

<body>

<div class="toolbar">

    <button onclick="window.print()">
        🖨 Print
    </button>

    <button onclick="window.close()">
        ✖ Close
    </button>

</div>

<div class="content">

${body}

</div>

</body>

</html>
`);

  printWindow.document.close();

  const generate = () => {

    const svgs =
      printWindow.document.querySelectorAll(
        "svg.barcode"
      );

    svgs.forEach((svg) => {

      const barcode =
        svg.getAttribute("data-barcode");

      if (!barcode) return;

      try {

        JsBarcode(svg, barcode, {

          format: "CODE128",

          width: 1.4,

          height: 40,

          margin: 0,

          displayValue: false,

          background: "#ffffff",

          lineColor: "#000000",

        });

      } catch (err) {

        console.error(
          "Barcode Error:",
          err
        );

      }

    });

    setTimeout(() => {

      printWindow.focus();

     

    },300);

  };

  if (
    printWindow.document.readyState ===
    "complete"
  ) {

    generate();

  } else {

    printWindow.onload = generate;

  }

}