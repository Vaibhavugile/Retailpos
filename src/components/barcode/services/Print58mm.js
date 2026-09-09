import JsBarcode from "jsbarcode";
import { generateThermalTemplate } from "../templates/ThermalTemplate";

export function print58mm({
  product,
  variants,
  storeName,
}) {
  // =========================================================
  // GENERATE LABEL HTML
  // =========================================================

  const body = generateThermalTemplate({
    product,
    variants,
    storeName,
    paperWidth: "50x30",
  });

  // =========================================================
  // OPEN CLEAN PRINT WINDOW
  // =========================================================

  const printWindow = window.open(
    "",
    "_blank",
    "width=600,height=800"
  );

  if (!printWindow) {
    alert(
      "Unable to open print window. Please allow popups for this website."
    );
    return;
  }

  // =========================================================
  // PRINT DOCUMENT
  // =========================================================

  printWindow.document.open();

  printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>

<meta charset="UTF-8">

<title>50x30 Barcode Labels</title>

<style>

  /* =====================================================
     PAGE
  ===================================================== */

  @page {
    size: 50mm 30mm;
    margin: 0;
  }


  /* =====================================================
     RESET
  ===================================================== */

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


  html,
  body {
    width: 50mm;
    min-width: 50mm;
    max-width: 50mm;

    margin: 0;
    padding: 0;

    background: #ffffff;

    font-family: Arial, Helvetica, sans-serif;
  }


  /* =====================================================
     PRINT CONTENT
  ===================================================== */

  .sheet-50x30 {
    width: 50mm;
    margin: 0;
    padding: 0;
  }


  /* =====================================================
     SINGLE LABEL
  ===================================================== */

  .label {
    width: 50mm;
    height: 30mm;

    min-width: 50mm;
    max-width: 50mm;

    min-height: 30mm;
    max-height: 30mm;

    margin: 0;
    padding: 1mm;

    display: flex;

    flex-direction: column;

    justify-content: space-evenly;

    align-items: center;

    text-align: center;

    overflow: hidden;

    background: #ffffff;

    border: none;

    page-break-after: always;
    break-after: page;

    page-break-inside: avoid;
    break-inside: avoid;
  }


  /* Last label should not create another page */

  .label:last-child {
    page-break-after: auto;
    break-after: auto;
  }


  /* =====================================================
     STORE NAME
  ===================================================== */

  .store {
    width: 100%;

    margin: 0;

    font-size: 11px;

    line-height: 1;

    font-weight: 700;

    text-align: center;

    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;
  }


  /* =====================================================
     VARIANT + PRICE
  ===================================================== */

  .label-top {
    width: 100%;

    display: flex;

    flex-direction: row;

    justify-content: space-between;

    align-items: center;

    gap: 2mm;
  }


  .variant {
    flex: 1;

    min-width: 0;

    text-align: left;

    font-size: 9px;

    line-height: 1;

    font-weight: 600;

    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;
  }


  .price {
    flex-shrink: 0;

    margin: 0;

    font-size: 15px;

    line-height: 1;

    font-weight: 700;

    white-space: nowrap;
  }


  /* =====================================================
     PRODUCT
  ===================================================== */

  .product {
    width: 100%;

    margin: 0;

    text-align: center;

    font-size: 8px;

    line-height: 1;

    font-weight: 600;

    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;
  }


  /* =====================================================
     BARCODE
  ===================================================== */

  .barcode {
    display: block;

    width: 47mm !important;

    max-width: 47mm !important;

    height: 12mm !important;

    max-height: 12mm !important;

    margin: 0 auto !important;

    padding: 0;

  }


  /* =====================================================
     BARCODE NUMBER
  ===================================================== */

  .barcode-number {
    width: 100%;

    margin: 0;

    text-align: center;

    font-size: 7px;

    line-height: 1;

    font-weight: 700;

    letter-spacing: 0.5px;

    white-space: nowrap;

    overflow: hidden;
  }


  /* =====================================================
     SKU
  ===================================================== */

  .sku {
    display: none;
  }


  /* =====================================================
     PRINT
  ===================================================== */

  @media print {

    @page {
      size: 50mm 30mm;
      margin: 0;
    }

    html {
      width: 50mm;
      margin: 0;
      padding: 0;
    }

    body {
      width: 50mm;
      min-width: 50mm;
      max-width: 50mm;

      margin: 0;
      padding: 0;

      background: #ffffff;
    }

    .sheet-50x30 {
      width: 50mm;
      margin: 0;
      padding: 0;
    }

    .label {
      width: 50mm;
      height: 30mm;

      min-width: 50mm;
      max-width: 50mm;

      min-height: 30mm;
      max-height: 30mm;

      margin: 0;
      padding: 1mm;

      page-break-inside: avoid;
      break-inside: avoid;
    }

    .label:last-child {
      page-break-after: auto;
      break-after: auto;
    }
  }

</style>

</head>

<body>

${body}

</body>

</html>
  `);

  printWindow.document.close();


  // =========================================================
  // GENERATE BARCODES
  // =========================================================

  const generateBarcodes = () => {
    const svgs =
      printWindow.document.querySelectorAll(
        "svg.barcode"
      );

    svgs.forEach((svg) => {
      const barcode =
        svg.getAttribute("data-barcode");

      if (!barcode) {
        return;
      }

      try {
        JsBarcode(
          svg,
          barcode,
          {
            format: "CODE128",

            width: 2,

            height: 45,

            margin: 0,

            displayValue: false,

            background: "#ffffff",

            lineColor: "#000000",

            fontOptions: "bold",

            valid: function (valid) {
              if (!valid) {
                console.error(
                  "Invalid Barcode:",
                  barcode
                );
              }
            },
          }
        );
      } catch (error) {
        console.error(
          "Barcode Error:",
          error
        );
      }
    });


    // =======================================================
    // WAIT FOR SVG RENDER
    // =======================================================

    setTimeout(() => {

      printWindow.focus();

      printWindow.print();

    }, 500);
  };


  // =========================================================
  // WAIT FOR DOCUMENT
  // =========================================================

  if (
    printWindow.document.readyState ===
    "complete"
  ) {
    generateBarcodes();
  } else {

    printWindow.onload =
      generateBarcodes;

  }


  // =========================================================
  // CLOSE WINDOW AFTER PRINT
  // =========================================================

  printWindow.onafterprint = () => {

    setTimeout(() => {

      try {
        printWindow.close();
      } catch (error) {
        console.error(
          "Print window close error:",
          error
        );
      }

    }, 300);

  };
}