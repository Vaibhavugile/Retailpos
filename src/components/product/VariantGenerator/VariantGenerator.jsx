import { useEffect, useState } from "react";
import "./VariantGenerator.css";
export default function VariantGenerator({
  product,
  setProduct,
}) {

  /* ===========================================
      DEFAULT CHIPS
  =========================================== */

  const defaultColors = [
    "Black",
    "White",
    "Blue",
    "Red",
    "Green",
    "Yellow",
    "Grey",
    "Brown",
  ];

  const defaultSizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
  ];

  /* ===========================================
      CHIP STATE
  =========================================== */

  const [availableColors, setAvailableColors] =
    useState(defaultColors);

  const [availableSizes, setAvailableSizes] =
    useState(defaultSizes);
const [previewVariants, setPreviewVariants] =
  useState([]);
  const [newColor, setNewColor] =
    useState("");

  const [newSize, setNewSize] =
    useState("");

  /* ===========================================
      SELECT COLOR
  =========================================== */

  const toggleColor = (color) => {

    const colors =
      product.selectedColors || [];

    const exists =
      colors.includes(color);

    setProduct((prev) => ({
      ...prev,

      selectedColors: exists
        ? colors.filter(
            (c) => c !== color
          )
        : [...colors, color],
    }));
  };

  /* ===========================================
      SELECT SIZE
  =========================================== */

  const toggleSize = (size) => {

    const sizes =
      product.selectedSizes || [];

    const exists =
      sizes.includes(size);

    setProduct((prev) => ({
      ...prev,

      selectedSizes: exists
        ? sizes.filter(
            (s) => s !== size
          )
        : [...sizes, size],
    }));
  };

  /* ===========================================
      ADD CUSTOM COLOR
  =========================================== */

  const addCustomColor = () => {

    if (!newColor.trim()) return;

    if (
      availableColors.includes(
        newColor.trim()
      )
    ) {
      setNewColor("");
      return;
    }

    setAvailableColors((prev) => [
      ...prev,
      newColor.trim(),
    ]);

    setProduct((prev) => ({
      ...prev,

      selectedColors: [
        ...(prev.selectedColors || []),
        newColor.trim(),
      ],
    }));

    setNewColor("");
  };

  /* ===========================================
      ADD CUSTOM SIZE
  =========================================== */

  const addCustomSize = () => {

    if (!newSize.trim()) return;

    if (
      availableSizes.includes(
        newSize.trim()
      )
    ) {
      setNewSize("");
      return;
    }

    setAvailableSizes((prev) => [
      ...prev,
      newSize.trim(),
    ]);

    setProduct((prev) => ({
      ...prev,

      selectedSizes: [
        ...(prev.selectedSizes || []),
        newSize.trim(),
      ],
    }));

    setNewSize("");
  };
  useEffect(() => {
  const colors = product.selectedColors || [];
  const sizes = product.selectedSizes || [];

  const preview = [];

  if (!colors.length && !sizes.length) {
    preview.push({
      label: "Default",
      attributes: {},
    });
  }
  else if (colors.length && !sizes.length) {
    colors.forEach((color) => {
      preview.push({
        label: color,
        attributes: { Color: color },
      });
    });
  }
  else if (!colors.length && sizes.length) {
    sizes.forEach((size) => {
      preview.push({
        label: size,
        attributes: { Size: size },
      });
    });
  }
  else {
    colors.forEach((color) => {
      sizes.forEach((size) => {
        preview.push({
          label: `${color} / ${size}`,
          attributes: {
            Color: color,
            Size: size,
          },
        });
      });
    });
  }

  setPreviewVariants(preview);

}, [
  product.selectedColors,
  product.selectedSizes,
]);
const removePreviewVariant = (label) => {
  setPreviewVariants((prev) =>
    prev.filter((item) => item.label !== label)
  );
};
  /* ===========================================
    GENERATE VARIANTS
=========================================== */
/* ===========================================
    GET NEXT VARIANT NUMBER
=========================================== */

const getNextVariantNumber = (variants) => {

  if (!variants.length) return 1;

  const numbers = variants
    .map((variant) => {

      const parts = variant.id.split("-");

      return Number(parts[parts.length - 1]);

    })
    .filter((n) => !isNaN(n));

  return Math.max(...numbers) + 1;

};
const generateVariants = () => {

  const colors = product.selectedColors || [];
  const sizes = product.selectedSizes || [];

  const existingVariants = product.variants || [];

  const combinations = previewVariants;

  // No Color & No Size
  if (!colors.length && !sizes.length) {

    combinations.push({
      label: "Default",
      attributes: {},
    });

  }

  // Only Color
  else if (colors.length && !sizes.length) {

    combinations = colors.map((color) => ({
      label: color,
      attributes: {
        Color: color,
      },
    }));

  }

  // Only Size
  else if (!colors.length && sizes.length) {

    combinations = sizes.map((size) => ({
      label: size,
      attributes: {
        Size: size,
      },
    }));

  }

  // Color + Size
  else {

    colors.forEach((color) => {

      sizes.forEach((size) => {

        combinations.push({
          label: `${color} / ${size}`,
          attributes: {
            Color: color,
            Size: size,
          },
        });

      });

    });

  }

 let nextNumber =
  getNextVariantNumber(existingVariants);

  const variants = combinations.map((combo) => {

    // Find existing variant
    const existing = existingVariants.find(
      (variant) => variant.variantName === combo.label
    );

    // Preserve existing
    if (existing) {

      return existing;

    }

    // Generate next barcode
    const code =
      `${product.productCode}-${String(nextNumber).padStart(2, "0")}`;

    nextNumber++;

    return {

      id: code,

      productCode: product.productCode,

      barcode: code,

      sku: code,

      variantName: combo.label,

      attributes: combo.attributes,

      purchasePrice: 0,

      sellingPrice: 0,

      stock: 0,

      lowStock: 0,

      status: true,

    };

  });

 // Merge existing + new variants
const mergedVariants = [...existingVariants];

variants.forEach((newVariant) => {
  const exists = mergedVariants.some(
    (variant) =>
      variant.variantName === newVariant.variantName
  );

  if (!exists) {
    mergedVariants.push(newVariant);
  }
});

setProduct((prev) => ({
  ...prev,
  variants: mergedVariants,

  // Clear selections after adding
  selectedColors: [],
  selectedSizes: [],
}));

};
/* ===========================================
    PREVIEW VARIANTS
=========================================== */

  return (
  <div className="product-card">

    <div className="product-card-header">
      <h2>Product Variants</h2>

      <p>
        Select available colors and sizes for this product.
      </p>
    </div>

    <div className="product-card-body">

      {/* =======================
            COLORS
      ======================== */}

      <div className="variant-section">

        <h3>🎨 Colors</h3>

        <div className="chip-container">

          {availableColors.map((color) => (

            <button
              key={color}
              type="button"
              className={`variant-chip ${
                (product.selectedColors || []).includes(color)
                  ? "active"
                  : ""
              }`}
              onClick={() => toggleColor(color)}
            >
              {color}
            </button>

          ))}

        </div>

        <div className="custom-input-row">

          <input
            type="text"
            placeholder="Add Custom Color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCustomColor();
              }
            }}
          />

          <button
            type="button"
            onClick={addCustomColor}
          >
            Add
          </button>

        </div>

      </div>

      {/* =======================
            SIZES
      ======================== */}

      <div className="variant-section">

        <h3>📏 Sizes</h3>

        <div className="chip-container">

          {availableSizes.map((size) => (

            <button
              key={size}
              type="button"
              className={`variant-chip ${
                (product.selectedSizes || []).includes(size)
                  ? "active"
                  : ""
              }`}
              onClick={() => toggleSize(size)}
            >
              {size}
            </button>

          ))}

        </div>

        <div className="custom-input-row">

          <input
            type="text"
            placeholder="Add Custom Size"
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCustomSize();
              }
            }}
          />

          <button
            type="button"
            onClick={addCustomSize}
          >
            Add
          </button>

        </div>

      </div>

      {/* =======================
          SUMMARY
      ======================== */}

      {/* =======================
      PREVIEW
======================= */}

{/* <div className="variant-preview">

  <h3>
    Ready to Add ({previewVariants.length})
  </h3>

  {previewVariants.length === 0 ? (

    <p className="preview-empty">
      Select colors and/or sizes to preview variants.
    </p>

  ) : (

    <div className="preview-list">

      {previewVariants.map((variant) => (

        <div
          key={variant}
          className="preview-item"
        >

         <div className="preview-item">

  <span>{variant.label}</span>

  <button
    type="button"
    className="remove-preview-btn"
    onClick={() =>
      removePreviewVariant(variant.label)
    }
  >
    ✕
  </button>

</div>

        </div>

      ))}

    </div>

  )}

</div> */}

      <button
        type="button"
        className="generate-btn"
        onClick={generateVariants}
      >
        Generate Variants
      </button>

    </div>

  </div>
);
}