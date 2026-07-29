export function generateA4Template({
  product,
  storeName,
  copies,
}) {
  let html = `<div class="a4-sheet">`;

  product.variants.forEach((variant) => {
    for (let i = 0; i < copies; i++) {
      html += `
        <div class="a4-label">

            <div class="store">
                ${storeName}
            </div>

            <div class="product">
                ${product.name}
            </div>

            <div class="variant">
                ${variant.variantName}
            </div>

            <div class="price">
                ₹${variant.sellingPrice}
            </div>

            <svg
                class="barcode"
                data-barcode="${variant.barcode}">
            </svg>

            <div class="barcode-number">
                ${variant.barcode}
            </div>

        </div>
      `;
    }
  });

  html += "</div>";

  return html;
}