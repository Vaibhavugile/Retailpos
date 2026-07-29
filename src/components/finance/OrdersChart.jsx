import React from "react";
import "./OrdersChart.css";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const OrdersChart = ({ data = [] }) => {

  return (

    <div className="chart-card">

      <div className="chart-header">

        <div>

          <h3>Orders Trend</h3>

          <p>Total orders over time</p>

        </div>

      </div>

      <ResponsiveContainer
        width="100%"
        height={340}
      >

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="label" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="orders"
            fill="#2563eb"
            radius={[8,8,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

};

export default OrdersChart;