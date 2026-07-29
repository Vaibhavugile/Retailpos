import React from "react";
import "./RevenueChart.css";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatCurrency } from "../../services/financeService";

const RevenueChart = ({ data = [] }) => {

  const tooltipFormatter = (value) => {

    return [formatCurrency(value), "Revenue"];

  };

  return (

    <div className="chart-card">

      <div className="chart-header">

        <div>

          <h3>

            Revenue Trend

          </h3>

          <p>

            Revenue generated over time

          </p>

        </div>

      </div>

      <ResponsiveContainer

        width="100%"

        height={340}

      >

        <AreaChart

          data={data}

          margin={{

            top: 10,

            right: 20,

            left: 0,

            bottom: 0,

          }}

        >

          <defs>

            <linearGradient

              id="revenueGradient"

              x1="0"

              y1="0"

              x2="0"

              y2="1"

            >

              <stop

                offset="5%"

                stopColor="#2563eb"

                stopOpacity={0.45}

              />

              <stop

                offset="95%"

                stopColor="#2563eb"

                stopOpacity={0}

              />

            </linearGradient>

          </defs>

          <CartesianGrid

            strokeDasharray="3 3"

          />

          <XAxis

            dataKey="label"

          />

          <YAxis />

          <Tooltip

            formatter={tooltipFormatter}

          />

          <Area

            type="monotone"

            dataKey="revenue"

            stroke="#2563eb"

            strokeWidth={3}

            fill="url(#revenueGradient)"

          />

        </AreaChart>

      </ResponsiveContainer>

    </div>

  );

};

export default RevenueChart;