import React from "react";
import "./FinanceInsights.css";

import {
  FiTrendingUp,
  FiTrendingDown,
  FiAward,
  FiBarChart2,
  FiTarget,
  FiActivity,
} from "react-icons/fi";

import {
  formatCurrency,
} from "../../services/financeService";

const FinanceInsights = ({
  insights = {},
}) => {

  const bestSalesDay = insights.bestSalesDay || {};
  const lowestSalesDay = insights.lowestSalesDay || {};
  const bestProfitDay = insights.bestProfitDay || {};

  const cards = [

    {
      title: "Best Sales Day",
      value: bestSalesDay.id || "-",
      subtitle:
        bestSalesDay.totalSales != null
          ? `Revenue ${formatCurrency(bestSalesDay.totalSales)}`
          : "Highest revenue generated",
      icon: <FiAward />,
      color: "#16a34a",
    },

    {
      title: "Lowest Sales Day",
      value: lowestSalesDay.id || "-",
      subtitle:
        lowestSalesDay.totalSales != null
          ? `Revenue ${formatCurrency(lowestSalesDay.totalSales)}`
          : "Lowest revenue generated",
      icon: <FiTrendingDown />,
      color: "#dc2626",
    },

    {
      title: "Best Profit Day",
      value: bestProfitDay.id || "-",
      subtitle:
        bestProfitDay.totalProfit != null
          ? `Profit ${formatCurrency(bestProfitDay.totalProfit)}`
          : "Highest profit earned",
      icon: <FiTrendingUp />,
      color: "#2563eb",
    },

    {
      title: "Average Daily Sale",
      value: formatCurrency(
        insights.averageDailySale || 0
      ),
      subtitle: "Average revenue per day",
      icon: <FiBarChart2 />,
      color: "#7c3aed",
    },

    {
      title: "Average Daily Profit",
      value: formatCurrency(
        insights.averageDailyProfit || 0
      ),
      subtitle: "Average profit per day",
      icon: <FiActivity />,
      color: "#ea580c",
    },

    {
      title: "Performance Score",
      value: `${insights.score?.score ?? 0}/100`,
      subtitle: insights.score?.grade
        ? `Grade ${insights.score.grade}`
        : "Business Score",
      icon: <FiTarget />,
      color: "#0284c7",
    },

    {
      title: "Monthly Revenue",
      value: formatCurrency(
        insights.monthlyRevenue || 0
      ),
      subtitle: "Current month",
      icon: <FiTrendingUp />,
      color: "#059669",
    },

    {
      title: "Monthly Profit",
      value: formatCurrency(
        insights.monthlyProfit || 0
      ),
      subtitle: "Current month",
      icon: <FiTrendingUp />,
      color: "#db2777",
    },

  ];

  return (

    <div className="finance-insights-grid">

      {cards.map((card, index) => (

        <div
          key={index}
          className="finance-insight-card"
        >

          <div
            className="finance-insight-icon"
            style={{ background: card.color }}
          >
            {card.icon}
          </div>

          <div className="finance-insight-content">

            <span>{card.title}</span>

            <h3>{card.value}</h3>

            <p>{card.subtitle}</p>

          </div>

        </div>

      ))}

    </div>

  );

};

export default FinanceInsights;