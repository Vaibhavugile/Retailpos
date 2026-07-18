import "./ProductValidation.css";

export default function ProductValidation({
  product,
}) {
  const checks = [
    {
      label: "Product Code",
      valid: product.productCode.trim() !== "",
    },
    {
      label: "Product Name",
      valid: product.name.trim() !== "",
    },
   
    {
      label: "Category",
      valid: product.categoryId !== "",
    },
    {
      label: "Sub Category",
      valid: product.subCategoryId !== "",
    },
    {
      label: "Variants Generated",
      valid: product.variants.length > 0,
    },
    {
      label: "Purchase Price",
      valid:
        product.variants.length > 0 &&
        product.variants.every(
          (v) => Number(v.purchasePrice) >= 0
        ),
    },
    {
      label: "Selling Price",
      valid:
        product.variants.length > 0 &&
        product.variants.every(
          (v) => Number(v.sellingPrice) > 0
        ),
    },
    {
      label: "Stock",
      valid:
        product.variants.length > 0 &&
        product.variants.every(
          (v) => Number(v.stock) >= 0
        ),
    },
  ];

  const completed = checks.filter(
    (item) => item.valid
  ).length;

  const pending = checks.length - completed;

  return (
    <div className="product-card">
      <div className="product-card-header">
        <h2>Product Validation</h2>

        <p>
          Verify all required information before
          saving the product.
        </p>
      </div>

      <div className="validation-list">
        {checks.map((item) => (
          <div
            key={item.label}
            className={`validation-chip ${
              item.valid ? "success" : "error"
            }`}
          >
            <span className="chip-icon">
              {item.valid ? "✓" : "✕"}
            </span>

            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="validation-footer">
        {pending === 0 ? (
          <>✅ Ready to Save Product</>
        ) : (
          <>
            {completed}/{checks.length} Completed •{" "}
            {pending} Remaining
          </>
        )}
      </div>
    </div>
  );
}