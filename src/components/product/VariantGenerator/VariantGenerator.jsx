import "./VariantGenerator.css";

export default function VariantGenerator({
  product,
  setProduct,
}) {

  /* ===========================================
      ENABLE VARIANTS
  =========================================== */

  const toggleVariants = () => {
    setProduct((prev) => ({
      ...prev,

      hasVariants: !prev.hasVariants,

      attributes:
        prev.attributes || [],

      variants:
        prev.variants || [],
    }));
  };

  /* ===========================================
      ADD ATTRIBUTE
  =========================================== */

 const addAttribute = () => {
  setProduct((prev) => ({
    ...prev,
    attributes: [
      ...prev.attributes,
      {
        id: prev.attributes.length + 1,
        name: "",
        values: [],
      },
    ],
  }));
};
  /* ===========================================
    UPDATE ATTRIBUTE NAME
=========================================== */

const updateAttributeName = (id, value) => {
  setProduct((prev) => ({
    ...prev,
    attributes: prev.attributes.map((item) =>
      item.id === id
        ? {
            ...item,
            name: value,
          }
        : item
    ),
  }));
};

/* ===========================================
    ADD VALUE
=========================================== */

const addValue = (id) => {
  setProduct((prev) => ({
    ...prev,
    attributes: prev.attributes.map((item) =>
      item.id === id
        ? {
            ...item,
            values: [...item.values, ""],
          }
        : item
    ),
  }));
};

/* ===========================================
    UPDATE VALUE
=========================================== */

const updateValue = (
  attributeId,
  index,
  value
) => {
  setProduct((prev) => ({
    ...prev,
    attributes: prev.attributes.map((item) => {
      if (item.id !== attributeId) return item;

      const values = [...item.values];

      values[index] = value;

      return {
        ...item,
        values,
      };
    }),
  }));
};

/* ===========================================
    REMOVE VALUE
=========================================== */

const removeValue = (
  attributeId,
  index
) => {
  setProduct((prev) => ({
    ...prev,
    attributes: prev.attributes.map((item) => {
      if (item.id !== attributeId) return item;

      return {
        ...item,
        values: item.values.filter(
          (_, i) => i !== index
        ),
      };
    }),
  }));
};

/* ===========================================
    DELETE ATTRIBUTE
=========================================== */

const deleteAttribute = (id) => {
  setProduct((prev) => ({
    ...prev,
    attributes: prev.attributes.filter(
      (item) => item.id !== id
    ),
  }));
};
/* ===========================================
    GENERATE VARIANTS
=========================================== */

const generateVariants = () => {
  // Remove empty attributes
  const attributes = product.attributes.filter(
    (attribute) =>
      attribute.name.trim() &&
      attribute.values.filter((v) => v.trim()).length
  );

  if (!attributes.length) {
    return;
  }

  // Recursive combination generator
  const combinations = [];

  const build = (
    index,
    current,
    labels
  ) => {
    if (index === attributes.length) {
      combinations.push({
        attributes: current,
        label: labels.join(" / "),
      });
      return;
    }

    const attribute = attributes[index];

    attribute.values
      .filter((v) => v.trim())
      .forEach((value) => {
        build(
          index + 1,
          {
            ...current,
            [attribute.name]: value,
          },
          [...labels, value]
        );
      });
  };

  build(0, {}, []);

  const variants = combinations.map(
    (item, index) => ({
      id: `${product.productCode}-${String(
        index + 1
      ).padStart(2, "0")}`,

      productCode: product.productCode,

      barcode: `${product.productCode}-${String(
        index + 1
      ).padStart(2, "0")}`,

      sku: `${product.productCode}-${String(
        index + 1
      ).padStart(2, "0")}`,

      variantName: item.label,

      attributes: item.attributes,

      purchasePrice: 0,

      sellingPrice: 0,

      stock: 0,

      lowStock: 0,

      status: true,
    })
  );

  setProduct((prev) => ({
    ...prev,
    variants,
  }));
};

  return (

    <div className="product-card">

      <div className="product-card-header">

        <h2>
          Product Variants
        </h2>

        <p>
          Create Color, Size or any custom
          attributes for this product.
        </p>

      </div>

      <div className="product-card-body">

        {/* Enable */}

        <div className="variant-toggle">

          <div>

            <h4>
              Enable Variants
            </h4>

            <p>
              Turn this on if your product
              has multiple variations.
            </p>

          </div>

          <label className="switch">

            <input
              type="checkbox"
              checked={product.hasVariants}
              onChange={toggleVariants}
            />

            <span className="slider"></span>

          </label>

        </div>

        {/* Attributes */}

        {product.hasVariants && (

          <>

            <button
              type="button"
              className="add-attribute-btn"
              onClick={addAttribute}
            >
              + Add Attribute
            </button>

            <div className="attribute-list">

  {product.attributes.map((attribute) => (

    <div
      key={attribute.id}
      className="attribute-card"
    >

      <div className="attribute-header">

        <input
          type="text"
          placeholder="Attribute Name"
          value={attribute.name}
          onChange={(e) =>
            updateAttributeName(
              attribute.id,
              e.target.value
            )
          }
        />

        <button
          type="button"
          className="delete-attribute-btn"
          onClick={() =>
            deleteAttribute(attribute.id)
          }
        >
          Delete
        </button>

      </div>

      <div className="value-list">

        {attribute.values.map(
          (value, index) => (

            <div
              key={index}
              className="value-item"
            >

              <input
                type="text"
                placeholder="Value"
                value={value}
                onChange={(e) =>
                  updateValue(
                    attribute.id,
                    index,
                    e.target.value
                  )
                }
              />

              <button
                type="button"
                className="remove-value-btn"
                onClick={() =>
                  removeValue(
                    attribute.id,
                    index
                  )
                }
              >
                ×
              </button>

            </div>

          )
        )}

      </div>

      <button
        type="button"
        className="add-value-btn"
        onClick={() =>
          addValue(attribute.id)
        }
      >
        + Add Value
      </button>

    </div>

  ))}

</div>
<button
  type="button"
  className="generate-btn"
  onClick={generateVariants}
>
  Generate Variants
</button>


          </>

        )}

      </div>

    </div>

  );

}