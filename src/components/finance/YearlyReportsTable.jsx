import React from "react";
import "./YearlyReportsTable.css";

import {
  formatCurrency,
  formatNumber,
  formatPercent,
} from "../../services/financeService";

const YearlyReportsTable = ({
  reports = [],
}) => {

  if (!reports.length) {

    return (

      <div className="finance-empty-state">

        <h3>No Yearly Reports</h3>

        <p>

          Yearly reports will appear here.

        </p>

      </div>

    );

  }

  return (

    <div className="finance-table-wrapper">

      <table className="finance-table">

        <thead>

          <tr>

            <th>Year</th>

            <th>Revenue</th>

            <th>Orders</th>

            <th>Items Sold</th>

            <th>Profit</th>

            <th>GST</th>

            <th>Average Bill</th>

            <th>Profit Margin</th>

            <th>Net Profit</th>

          </tr>

        </thead>

        <tbody>

          {reports.map((report, index) => (

            <tr key={report.year || index}>

              <td>

                {report.year}

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

              <td className="profit-cell">

                {formatCurrency(
                  report.netProfit || 0
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};

export default YearlyReportsTable;