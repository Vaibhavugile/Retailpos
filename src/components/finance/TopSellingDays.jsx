import React from "react";
import "./TopSellingDays.css";

import {
  FiAward,
  FiTrendingUp,
  FiCalendar,
} from "react-icons/fi";

import {
  formatCurrency,
  formatNumber,
} from "../../services/financeService";

const TopSellingDays = ({
  reports = [],
}) => {

  const topDays = [...reports]
    .sort(
      (a, b) =>
        (b.totalSales || 0) -
        (a.totalSales || 0)
    )
    .slice(0, 5);

  if (!topDays.length) {

    return (

      <div className="finance-empty-state">

        <h3>No Sales Data</h3>

        <p>

          Top selling days will appear here.

        </p>

      </div>

    );

  }

  return (

    <div className="top-selling-days">

      <div className="top-selling-header">

        <h2>

          <FiAward />

          Top Selling Days

        </h2>

        <p>

          Highest revenue generating days

        </p>

      </div>

      <div className="top-selling-list">

        {topDays.map((day, index) => (

          <div
            className="top-day-card"
            key={day.id || index}
          >

            <div className="top-day-rank">

              #{index + 1}

            </div>

            <div className="top-day-content">

              <h3>

                <FiCalendar />

                {day.id}

              </h3>

              <div className="top-day-stats">

                <div>

                  <span>Revenue</span>

                  <strong>

                    {formatCurrency(
                      day.totalSales || 0
                    )}

                  </strong>

                </div>

                <div>

                  <span>Orders</span>

                  <strong>

                    {formatNumber(
                      day.totalOrders || 0
                    )}

                  </strong>

                </div>

                <div>

                  <span>Profit</span>

                  <strong>

                    {formatCurrency(
                      day.totalProfit || 0
                    )}

                  </strong>

                </div>

              </div>

            </div>

            <div className="top-day-icon">

              <FiTrendingUp />

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default TopSellingDays;