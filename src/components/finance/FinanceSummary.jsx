import React from "react";
import "./FinanceSummary.css";

import {
  FiDollarSign,
  FiShoppingCart,
  FiTrendingUp,
  FiPercent,
  FiFileText,
  FiPackage,
  FiCreditCard,
  FiPieChart,
} from "react-icons/fi";

import {
  formatCurrency,
  formatNumber,
  formatPercent,
} from "../../services/financeService";

const FinanceSummary = ({ summary = {} }) => {

  const cards = [

    {
      title: "Revenue",
      value: formatCurrency(summary.totalSales || 0),
      icon: <FiDollarSign />,
      color: "#2563eb",
    },

    {
      title: "Orders",
      value: formatNumber(summary.totalOrders || 0),
      icon: <FiShoppingCart />,
      color: "#16a34a",
    },

    {
      title: "Profit",
      value: formatCurrency(summary.totalProfit || 0),
      icon: <FiTrendingUp />,
      color: "#059669",
    },

    {
      title: "Profit Margin",
      value: formatPercent(summary.profitMargin || 0),
      icon: <FiPercent />,
      color: "#7c3aed",
    },

    {
      title: "GST",
      value: formatCurrency(summary.totalGST || 0),
      icon: <FiFileText />,
      color: "#ea580c",
    },

    {
      title: "Items Sold",
      value: formatNumber(summary.totalItemsSold || 0),
      icon: <FiPackage />,
      color: "#0284c7",
    },

    {
      title: "Average Bill",
      value: formatCurrency(summary.averageBill || 0),
      icon: <FiCreditCard />,
      color: "#db2777",
    },

    {
      title: "Net Profit",
      value: formatCurrency(summary.netProfit || 0),
      icon: <FiPieChart />,
      color: "#dc2626",
    },

  ];

  return (

    <div className="finance-summary-grid">

      {cards.map((card, index) => (

        <div

          key={index}

          className="summary-card"

        >

          <div
            className="summary-icon"
            style={{
              background: card.color,
            }}
          >

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

};

export default FinanceSummary;