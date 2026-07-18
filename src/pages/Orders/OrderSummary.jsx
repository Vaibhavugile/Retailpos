import "./OrderSummary.css";

export default function OrderSummary({ summary }) {

  const data = {

    totalOrders: Number(summary?.totalOrders || 0),

    totalSales: Number(summary?.totalSales || 0),

    totalProfit: Number(summary?.totalProfit || 0),

    averageBill: Number(summary?.averageBill || 0),

    cashSales: Number(summary?.cashSales || 0),

    upiSales: Number(summary?.upiSales || 0),

    cardSales: Number(summary?.cardSales || 0),

    totalGST: Number(summary?.totalGST || 0),

  };

  const formatCurrency = (value) =>
    `₹${value.toFixed(2)}`;

  const cards = [

    {
      title: "Orders",
      value: data.totalOrders,
      icon: "🧾",
    },

    {
      title: "Sales",
      value: formatCurrency(data.totalSales),
      icon: "💰",
    },

    {
      title: "Profit",
      value: formatCurrency(data.totalProfit),
      icon: "📈",
    },

    {
      title: "Average Bill",
      value: formatCurrency(data.averageBill),
      icon: "🛒",
    },

    {
      title: "Cash",
      value: formatCurrency(data.cashSales),
      icon: "💵",
    },

    {
      title: "UPI",
      value: formatCurrency(data.upiSales),
      icon: "📱",
    },

    {
      title: "Card",
      value: formatCurrency(data.cardSales),
      icon: "💳",
    },

    {
      title: "GST",
      value: formatCurrency(data.totalGST),
      icon: "🏛️",
    },

  ];

  return (

    <div className="summary-grid">

      {cards.map((card) => (

        <div
          key={card.title}
          className="summary-card"
        >

          <div className="summary-icon">

            {card.icon}

          </div>

          <div className="summary-content">

            <span>

              {card.title}

            </span>

            <h2>

              {card.value}

            </h2>

          </div>

        </div>

      ))}

    </div>

  );

}