import React from "react";
import "./PaymentChart.css";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { formatCurrency } from "../../services/financeService";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
];

const PaymentChart = ({ data = [] }) => {

  return (

    <div className="chart-card">

      <div className="chart-header">

        <div>

          <h3>Payment Distribution</h3>

          <p>Cash vs UPI vs Card</p>

        </div>

      </div>

      <ResponsiveContainer
        width="100%"
        height={340}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />

            ))}

          </Pie>

          <Tooltip
            formatter={(value) => formatCurrency(value)}
          />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

};

export default PaymentChart;