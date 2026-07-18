import { useEffect, useState } from "react";
import "./OrdersDashboard.css";

import {
  getOrders,
  getSummary,
  searchOrders,
} from "../../services/orderService";

import OrderSummary from "./OrderSummary";
import OrderFilters from "./OrderFilters";
import OrdersTable from "./OrdersTable";
import OrderDetailsDrawer from "./OrderDetailsDrawer";

export default function OrdersDashboard() {

  const [orders, setOrders] = useState([]);

  const [summary, setSummary] = useState(null);

  const [loading, setLoading] = useState(true);

  const [loadingMore, setLoadingMore] = useState(false);

  const [lastDoc, setLastDoc] = useState(null);

  const [hasMore, setHasMore] = useState(false);

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [filters, setFilters] = useState({

    search: "",

    payment: "all",

    status: "all",

    dateFilter: "today",

    custom: {},

  });

  /*
  ======================================
  LOAD DASHBOARD
  ======================================
  */

  const loadDashboard = async () => {

    try {

      setLoading(true);

      /*
      Search Mode
      */

      if (filters.search.trim()) {

        const result =
          await searchOrders(filters.search);

        setOrders(result);

        setSummary(null);

        setHasMore(false);

        setLastDoc(null);

        return;

      }

      /*
      Load Summary & Orders Together
      */

      const [

        summaryResult,

        ordersResult,

      ] = await Promise.all([

        getSummary({

          dateFilter:
            filters.dateFilter,

          custom:
            filters.custom,

        }),

        getOrders({

          dateFilter:
            filters.dateFilter,

          custom:
            filters.custom,

          payment:
            filters.payment,

          status:
            filters.status,

          pageSize: 20,

        }),

      ]);

      setSummary(summaryResult);

      setOrders(ordersResult.orders);

      setLastDoc(
        ordersResult.lastDoc
      );

      setHasMore(
        ordersResult.hasMore
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  /*
  ======================================
  INITIAL LOAD
  ======================================
  */

  useEffect(() => {

    loadDashboard();

  }, [

    filters.search,

    filters.payment,

    filters.status,

    filters.dateFilter,

    filters.custom,

  ]);

  /*
  ======================================
  LOAD MORE
  ======================================
  */

  const handleLoadMore =
    async () => {

      if (
        !hasMore ||
        loadingMore ||
        filters.search
      ) {

        return;

      }

      try {

        setLoadingMore(true);

        const result =
          await getOrders({

            dateFilter:
              filters.dateFilter,

            custom:
              filters.custom,

            payment:
              filters.payment,

            status:
              filters.status,

            pageSize: 20,

            lastDoc,

          });

        setOrders(prev => [

          ...prev,

          ...result.orders,

        ]);

        setLastDoc(
          result.lastDoc
        );

        setHasMore(
          result.hasMore
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoadingMore(false);

      }

    };

  /*
  ======================================
  PRINT
  ======================================
  */

  const handlePrint = (order) => {

    console.log(
      "Print Invoice",
      order
    );

  };

  /*
  ======================================
  PDF
  ======================================
  */

  const handleDownloadPDF = (order) => {

    console.log(
      "Download PDF",
      order
    );

  };

  return (

    <div className="orders-page">

      <OrderSummary

        summary={summary}

      />

      <OrderFilters

        filters={filters}

        setFilters={setFilters}

      />

      <OrdersTable

        orders={orders}

        loading={loading}

        onViewOrder={
          setSelectedOrder
        }

        onPrint={
          handlePrint
        }

      />

      {hasMore && (

        <div className="load-more">

          <button

            onClick={
              handleLoadMore
            }

            disabled={
              loadingMore
            }

          >

            {

              loadingMore

                ? "Loading..."

                : "Load More"

            }

          </button>

        </div>

      )}

      <OrderDetailsDrawer

        order={
          selectedOrder
        }

        onClose={() =>
          setSelectedOrder(null)
        }

        onPrint={
          handlePrint
        }

        onDownloadPDF={
          handleDownloadPDF
        }

      />

    </div>

  );

}