import "./InventoryStats.css";

export default function InventoryStats({
  products,
}) {

  /* ===========================================
      CALCULATE STATS
  =========================================== */

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, product) =>
      sum + Number(product.totalStock || 0),
    0
  );

  const lowStock = products.filter(
    (product) =>
      Number(product.totalStock || 0) > 0 &&
      Number(product.totalStock || 0) <= 5
  ).length;

  const outOfStock = products.filter(
    (product) =>
      Number(product.totalStock || 0) === 0
  ).length;

  /* ===========================================
      STATS
  =========================================== */

  const stats = [
    {
      title: "Products",
      value: totalProducts,
      icon: "📦",
    },
    {
      title: "Total Stock",
      value: totalStock,
      icon: "📊",
    },
    {
      title: "Low Stock",
      value: lowStock,
      icon: "⚠️",
    },
    {
      title: "Out of Stock",
      value: outOfStock,
      icon: "❌",
    },
  ];

  return (
    <div className="inventory-stats">

      {stats.map((item) => (

        <div
          key={item.title}
          className="stat-card"
        >

          <div className="stat-icon">
            {item.icon}
          </div>

          <div className="stat-info">

            <span className="stat-title">
              {item.title}
            </span>

            <h2>{item.value}</h2>

          </div>

        </div>

      ))}

    </div>
  );
}