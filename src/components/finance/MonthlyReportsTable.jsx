import React from "react";
import "./MonthlyReportsTable.css";

import {
  formatCurrency,
  formatNumber,
  formatPercent,
} from "../../services/financeService";

const MonthlyReportsTable = ({
  reports = [],
}) => {

  if (!reports.length) {

    return (

      <div className="finance-empty-state">

        <h3>No Monthly Reports</h3>

        <p>

          Monthly reports will appear here.

        </p>

      </div>

    );

  }

  return (

    <div className="finance-table-wrapper">

      <table className="finance-table">

        <thead>

          <tr>

            <th>Month</th>

            <th>Revenue</th>

            <th>Orders</th>

            <th>Items Sold</th>

            <th>Profit</th>

            <th>GST</th>

            <th>Average Bill</th>

            <th>Profit Margin</th>

          </tr>

        </thead>

        <tbody>

          {reports.map((report, index) => (

            <tr
              key={report.month || index}
            >

              <td>

                {report.month}

              </td>

              <td>

                {formatCurrency(
                  report.totalSales || 0
                )}

              </td>

              <td>

                {formatNumber(
                  report.totalOrders || 0
                )}

              </td>

              <td>

                {formatNumber(
                  report.totalItemsSold || 0
                )}

              </td>

              <td className="profit-cell">

                {formatCurrency(
                  report.totalProfit || 0
                )}

              </td>

              <td>

                {formatCurrency(
                  report.totalGST || 0
                )}

              </td>

              <td>

                {formatCurrency(
                  report.averageBill || 0
                )}

              </td>

              <td>

                {formatPercent(
                  report.profitMargin || 0
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};

export default MonthlyReportsTable;