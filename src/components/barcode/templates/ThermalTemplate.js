export function generateThermalTemplate({
  product,
  variants,
  storeName,
  paperWidth = "80mm",
}) {

  const isLabel =
    paperWidth === "58mm" ||
    paperWidth === "50x30";

  const sheetClass = isLabel
    ? "sheet-50x30"
    : "sheet-80";

  let html = `
    <div class="${sheetClass}">
  `;

 variants.forEach((variant) => {

  for (
    let i = 0;
    i < variant.printQty;
    i++
  ) {

      html += `
        <div class="label">

          <div class="store">
            ${storeName}
          </div>

          ${
            isLabel
              ? `

                <div class="label-top">

                  <div class="variant">
                    ${variant.variantName}
                  </div>

                  <div class="price">
                    ₹${variant.sellingPrice}
                  </div>

                </div>

              `
              : `

                <div class="product">
                  ${product.name}
                </div>

                <div class="variant">
                  ${variant.variantName}
                </div>

                <div class="price">
                  ₹${variant.sellingPrice}
                </div>

              `
          }

          <svg
            class="barcode"
            data-barcode="${variant.barcode}">
          </svg>

          <div class="barcode-number">
            ${variant.barcode}
          </div>

          ${
            !isLabel
              ? `
                <div class="sku">
                  SKU : ${variant.sku}
                </div>
              `
              : ""
          }

        </div>
      `;

    }

  });

  html += `
    </div>
  `;
console.log(html);
  return html;

}