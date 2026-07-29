import React from "react";
import "./FinanceHeader.css";

import {
  FiRefreshCw,
  FiTrendingUp,
  FiDollarSign,
} from "react-icons/fi";

const FinanceHeader = ({
  refreshing = false,
  onRefresh,
}) => {

  const lastUpdated =
    new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (

    <div className="finance-header">

      <div className="finance-header-left">

        <div className="finance-icon">

          <FiDollarSign />

        </div>

        <div>

          <h1>

            Finance Dashboard

          </h1>

          <p>

            Monitor revenue, profit, reports and business insights.

          </p>

        </div>

      </div>

      <div className="finance-header-right">

        <div className="finance-status">

          <FiTrendingUp />

          <span>

            Business Healthy

          </span>

        </div>

        <div className="finance-updated">

          Updated

          <strong>

            {lastUpdated}

          </strong>

        </div>

        <button

          className="finance-refresh-btn"

          onClick={onRefresh}

          disabled={refreshing}

        >

          <FiRefreshCw

            className={refreshing ? "spin" : ""}

          />

          {

            refreshing

              ? "Refreshing..."

              : "Refresh"

          }

        </button>

      </div>

    </div>

  );

};

export default FinanceHeader;