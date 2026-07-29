import React from "react";
import "./DailyReportsTable.css";

import {
  formatCurrency,
  formatNumber,
} from "../../services/financeService";

const DailyReportsTable = ({
  reports = [],
}) => {

  if (!reports.length) {

    return (

      <div className="finance-empty-state">

        <h3>No Reports Found</h3>

        <p>

          No finance reports are available for the selected period.

        </p>

      </div>

    );

  }

  return (

    <div className="finance-table-wrapper">

      <table className="finance-table">

        <thead>

          <tr>

            <th>Date</th>

            <th>Revenue</th>

            <th>Orders</th>

            <th>Items</th>

            <th>Profit</th>

            <th>GST</th>

            <th>Cash</th>

            <th>UPI</th>

            <th>Card</th>

            <th>Avg Bill</th>

            <th>Net Profit</th>

          </tr>

        </thead>

        <tbody>

          {reports.map((report, index) => (

            <tr key={report.id || index}>

              <td>

                {report.id}

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

                  report.cashSales || 0

                )}

              </td>

              <td>

                {formatCurrency(

                  report.upiSales || 0

                )}

              </td>

              <td>

                {formatCurrency(

                  report.cardSales || 0

                )}

              </td>

              <td>

                {formatCurrency(

                  report.averageBill || 0

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

export default DailyReportsTable;