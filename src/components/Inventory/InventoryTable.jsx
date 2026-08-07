import "./InventoryTable.css";
import { useNavigate } from "react-router-dom";
export default function InventoryTable({
  products,
  search,
}) {

  /* ===========================================
      FILTER PRODUCTS
  =========================================== */
const navigate = useNavigate();
  const filteredProducts = products.filter(
    (product) => {

      const text = search.toLowerCase();

      return (
        product.name
          ?.toLowerCase()
          .includes(text) ||

        product.productCode
          ?.toLowerCase()
          .includes(text)
      );

    }
  );

  /* ===========================================
      EMPTY STATE
  =========================================== */

  if (filteredProducts.length === 0) {
    return (
      <div className="inventory-table-card">

        <div className="empty-state">

          <div className="empty-icon">
            📦
          </div>

          <h3>No Products Found</h3>

          <p>
            Start by adding your first product.
          </p>

        </div>

      </div>
    );
  }

  /* ===========================================
      TABLE
  =========================================== */

  return (
    <div className="inventory-table-card">

      <table className="inventory-table">

        <thead>

          <tr>

            <th>Image</th>

            <th>Product</th>

            <th>Code</th>

            <th>Category</th>

            <th>Variants</th>

            <th>Stock</th>

            <th>Starting Price</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {filteredProducts.map((product) => {

            const coverImage =
              product.images?.find(
                (img) => img.isCover
              )?.url ||
              product.images?.[0]?.url ||
              "https://placehold.co/60x60?text=No+Image";

            const startingPrice =
              product.variants?.length
                ? Math.min(
                    ...product.variants.map(
                      (variant) =>
                        Number(
                          variant.sellingPrice || 0
                        )
                    )
                  )
                : 0;

            return (

              <tr key={product.id}>

                <td>

                  <img
                    src={coverImage}
                    alt={product.name}
                    className="product-thumb"
                  />

                </td>

                <td>

                  <strong>
                    {product.name}
                  </strong>

                </td>

                <td>

                  {product.productCode}

                </td>

                <td>

                  {product.categoryName}

                </td>

                <td>

                  {product.totalVariants}

                </td>

                <td>

                  {product.totalStock}

                </td>

                <td>

                  ₹ {startingPrice}

                </td>

                <td>

                  <span
                    className={`status ${
                      product.status === "active"
                        ? "active"
                        : "inactive"
                    }`}
                  >

                    {product.status === "active"
                      ? "Active"
                      : "Inactive"}

                  </span>

                </td>

                <td>

                 <button
  type="button"
  title="View Product"
  onClick={() =>
    navigate(`/products/view/${product.id}`)
  }
>
  👁
</button>

                  <button
                    type="button"
                    title="Edit Product"
                  >
                    ✏
                  </button>

                  <button
                    type="button"
                    title="Delete Product"
                  >
                    🗑
                  </button>

                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

    </div>
  );
}