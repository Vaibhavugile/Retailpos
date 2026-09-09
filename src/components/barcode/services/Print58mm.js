import JsBarcode from "jsbarcode";
import { generateThermalTemplate } from "../templates/ThermalTemplate";

export function print58mm({
  product,
  variants,
  storeName,
}) {
  const body = generateThermalTemplate({
    product,
    variants,
    storeName,
    paperWidth: "50x30",
  });

  // Remove any previous print container
  const oldContainer =
    document.getElementById("barcode-print-container");

  if (oldContainer) {
    oldContainer.remove();
  }

  // Create hidden print container
  const printContainer =
    document.createElement("div");

  printContainer.id =
    "barcode-print-container";

  printContainer.innerHTML = body;

  document.body.appendChild(
    printContainer
  );

  // Add print styles
  const style =
    document.createElement("style");

  style.id =
    "barcode-print-styles";

  style.innerHTML = `
    /* ==========================================
                NORMAL SCREEN
    ========================================== */

    #barcode-print-container {
      display: none;
    }

    /* ==========================================
                PRINT
    ========================================== */

    @media print {

      @page {
        size: 50mm 30mm;
        margin: 0;
      }

      /*
       * Hide the entire application
       */
      body > * {
        display: none !important;
      }

      /*
       * Show only barcode container
       */
      body {
        margin: 0 !important;
        padding: 0 !important;
        width: 50mm !important;
        background: #ffffff !important;
      }

      #barcode-print-container {
        display: block !important;

        width: 50mm !important;

        margin: 0 !important;
        padding: 0 !important;
      }

      /*
       * Label
       */
      #barcode-print-container .label {
        width: 50mm !important;
        height: 30mm !important;

        padding: 1mm !important;

        display: flex !important;
        flex-direction: column !important;

        justify-content: space-evenly !important;
        align-items: center !important;

        text-align: center !important;

        overflow: hidden !important;

        border: none !important;
        box-shadow: none !important;

        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }

      /*
       * Every label gets its own page
       */
      #barcode-print-container
        .label:not(:last-child) {

        page-break-after: always !important;
        break-after: page !important;
      }

      /*
       * Store
       */
      #barcode-print-container .store {
        width: 100%;

        font-size: 11px;
        font-weight: 700;

        line-height: 1;

        text-align: center;
      }

      /*
       * Variant + price
       */
      #barcode-print-container .label-top {
        width: 100%;

        display: flex;

        justify-content: space-between;
        align-items: center;
      }

      #barcode-print-container .variant {
        flex: 1;

        text-align: left;

        font-size: 9px;
        font-weight: 600;

        overflow: hidden;

        white-space: nowrap;

        text-overflow: ellipsis;
      }

      #barcode-print-container .price {
        margin-left: 2mm;

        font-size: 15px;
        font-weight: 700;

        white-space: nowrap;
      }

      /*
       * Product
       */
      #barcode-print-container .product {
        width: 100%;

        text-align: center;

        font-size: 8px;
        font-weight: 600;

        overflow: hidden;

        white-space: nowrap;

        text-overflow: ellipsis;
      }

      /*
       * Barcode
       */
      #barcode-print-container .barcode {
        width: 48mm !important;
        height: 13mm !important;

        display: block !important;

        margin: 1mm auto !important;
      }

      /*
       * Barcode number
       */
      #barcode-print-container .barcode-number {
        width: 100%;

        text-align: center;

        font-size: 7px;
        font-weight: 700;

        letter-spacing: .5px;
      }

      #barcode-print-container .sku {
        display: none;
      }
    }
  `;

  document.head.appendChild(style);

  /*
   * Generate SVG barcodes
   */
  const generateBarcodes = () => {
    const svgs =
      printContainer.querySelectorAll(
        "svg.barcode"
      );

    svgs.forEach((svg) => {
      const barcode =
        svg.getAttribute(
          "data-barcode"
        );

      if (!barcode) return;

      try {
        JsBarcode(
          svg,
          barcode,
          {
            format: "CODE128",

            width: 2,

            height: 50,

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

    /*
     * Give browser a moment to render
     * the SVG before opening print dialog.
     */
    setTimeout(() => {
      window.print();
    }, 300);
  };

  generateBarcodes();

  /*
   * Cleanup after printing.
   */
  const cleanup = () => {
    printContainer.remove();
    style.remove();

    window.removeEventListener(
      "afterprint",
      cleanup
    );
  };

  window.addEventListener(
    "afterprint",
    cleanup
  );
}