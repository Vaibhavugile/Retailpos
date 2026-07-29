import React, { useCallback, useEffect, useState } from "react";
import "./FinanceDashboard.css";

import {
  getFinanceDashboard,
  buildCSVData,
  buildExcelData,
  buildPDFData,
  buildPrintData,
} from "../../services/financeService";

import FinanceHeader from "../../components/finance/FinanceHeader";
import FinanceFilters from "../../components/finance/FinanceFilters";
import FinanceSummary from "../../components/finance/FinanceSummary";
import RevenueChart from "../../components/finance/RevenueChart";
import ProfitChart from "../../components/finance/ProfitChart";
import OrdersChart from "../../components/finance/OrdersChart";
import PaymentChart from "../../components/finance/PaymentChart";
import FinanceInsights from "../../components/finance/FinanceInsights";
import DailyReportsTable from "../../components/finance/DailyReportsTable";
import MonthlyReportsTable from "../../components/finance/MonthlyReportsTable";
import YearlyReportsTable from "../../components/finance/YearlyReportsTable";
import TopSellingDays from "../../components/finance/TopSellingDays";
import ExportActions from "../../components/finance/ExportActions";

const FinanceDashboard = () => {

  /*
  =========================================================
  STATES
  =========================================================
  */

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [dashboard, setDashboard] = useState(null);

  const [filters, setFilters] = useState({

    dateFilter: "month",

    custom: {

      startDate: "",

      endDate: "",

    },

  });

  /*
  =========================================================
  LOAD DASHBOARD
  =========================================================
  */

  const loadDashboard = useCallback(async () => {

    try {

      setLoading(true);

      setError("");

      const data = await getFinanceDashboard(filters);

      setDashboard(data);

    } catch (err) {

      console.error(err);

      setError(

        err.message ||

        "Unable to load finance dashboard."

      );

    } finally {

      setLoading(false);

    }

  }, [filters]);

  /*
  =========================================================
  INITIAL LOAD
  =========================================================
  */

  useEffect(() => {

    loadDashboard();

  }, [loadDashboard]);

  /*
  =========================================================
  REFRESH
  =========================================================
  */

  const handleRefresh = async () => {

    try {

      setRefreshing(true);

      await loadDashboard();

    } finally {

      setRefreshing(false);

    }

  };

  /*
  =========================================================
  FILTER CHANGED
  =========================================================
  */

  const handleFilterChange = (

    dateFilter,

    custom = {}

  ) => {

    setFilters({

      dateFilter,

      custom,

    });

  };

  /*
  =========================================================
  EXPORTS
  =========================================================
  */

  const handleCSVExport = async () => {

    const data = await buildCSVData(filters);

    console.log("CSV", data);

    // download CSV here

  };

  const handleExcelExport = async () => {

    const data = await buildExcelData(filters);

    console.log("Excel", data);

  };

  const handlePDFExport = async () => {

    const data = await buildPDFData(filters);

    console.log("PDF", data);

  };

  const handlePrint = async () => {

    const data = await buildPrintData(filters);

    console.log("Print", data);

  };

  /*
  =========================================================
  HELPERS
  =========================================================
  */

  const summary =
    dashboard?.summary || {};

  const charts =
    dashboard?.charts || {};

  const insights =
    dashboard?.insights || {};

  const dailyReports =
    dashboard?.dailyReports || [];

  const monthlyReports =
    dashboard?.monthlyReports || [];

  const yearlyReports =
    dashboard?.yearlyReports || [];

  /*
  =========================================================
  LOADING
  =========================================================
  */

  if (loading) {

    return (

      <div className="finance-loading">

        <div className="finance-loader"></div>

        <h3>Loading Finance Dashboard...</h3>

      </div>

    );

  }

  /*
  =========================================================
  ERROR
  =========================================================
  */

  if (error) {

    return (

      <div className="finance-error">

        <h2>Finance Dashboard</h2>

        <p>{error}</p>

        <button

          className="retry-btn"

          onClick={loadDashboard}

        >

          Retry

        </button>

      </div>

    );

  }

  /*
  =========================================================
  MAIN LAYOUT
  =========================================================
  */

  return (

    <div className="finance-dashboard">

      <FinanceHeader

        refreshing={refreshing}

        onRefresh={handleRefresh}

      />

       <FinanceFilters

        filters={filters}

        onChange={handleFilterChange}

      />

      <FinanceSummary

        summary={summary}

      />


      <div className="finance-chart-grid">

        <RevenueChart

          data={charts.revenue || []}

        />

        <ProfitChart

          data={charts.profit || []}

        />

        <OrdersChart

          data={charts.orders || []}

        />

        <PaymentChart

          data={charts.payments || []}

        />

      </div>

      <FinanceInsights
        insights={insights}
      />


      <TopSellingDays
        reports={dailyReports}
      />


      <section className="finance-section">

        <div className="finance-section-header">

          <h2>Daily Reports</h2>

          <span>

            {dailyReports.length} Records

          </span>

        </div>

        <DailyReportsTable

          reports={dailyReports}

        />

      </section>


      <section className="finance-section">

        <div className="finance-section-header">

          <h2>Monthly Reports</h2>

          <span>

            {monthlyReports.length} Records

          </span>

        </div>

        <MonthlyReportsTable

          reports={monthlyReports}

        />

      </section>


      <section className="finance-section">

        <div className="finance-section-header">

          <h2>Yearly Reports</h2>

          <span>

            {yearlyReports.length} Records

          </span>

        </div>

        <YearlyReportsTable

          reports={yearlyReports}

        />

      </section>


      <section className="finance-section">

        <div className="finance-section-header">

          <h2>Export Reports</h2>

        </div>

        <ExportActions

          onCSV={handleCSVExport}

          onExcel={handleExcelExport}

          onPDF={handlePDFExport}

          onPrint={handlePrint}

        />

      </section> 

    </div>

  );

};

export default FinanceDashboard;