import {
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

/**
 * Returns today's report document ID
 */
/**
 * Returns today's report document ID
 * (Local Timezone)
 */
export const getTodayReportId = () => {

  const today = new Date();

  const year = today.getFullYear();

  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    today.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;

};
/**
 * Returns today's report document reference
 */
export const getDailyReportRef = () => {

  return doc(
    db,
    "dailyReports",
    getTodayReportId()
  );

};

/**
 * Creates a brand new daily report document
 */
export const buildNewDailyReport = ({
  grandTotal,
  totalProfit,
  paymentMethod,
  totalItems,
}) => {

  const reportId = getTodayReportId();

  return {

    date: reportId,

    totalSales: grandTotal,

    totalProfit,

    totalOrders: 1,

    totalItemsSold: totalItems,

    cashSales:
      paymentMethod === "cash"
        ? grandTotal
        : 0,

    upiSales:
      paymentMethod === "upi"
        ? grandTotal
        : 0,

    cardSales:
      paymentMethod === "card"
        ? grandTotal
        : 0,

    createdAt: serverTimestamp(),

    updatedAt: serverTimestamp(),

  };

};

/**
 * Updates an existing daily report document
 */
export const buildUpdatedDailyReport = ({
  report,
  grandTotal,
  totalProfit,
  paymentMethod,
  totalItems,
}) => {

  return {

    totalSales:
      (report.totalSales || 0) +
      grandTotal,

    totalProfit:
      (report.totalProfit || 0) +
      totalProfit,

    totalOrders:
      (report.totalOrders || 0) + 1,

    totalItemsSold:
      (report.totalItemsSold || 0) +
      totalItems,

    cashSales:
      (report.cashSales || 0) +
      (paymentMethod === "cash"
        ? grandTotal
        : 0),

    upiSales:
      (report.upiSales || 0) +
      (paymentMethod === "upi"
        ? grandTotal
        : 0),

    cardSales:
      (report.cardSales || 0) +
      (paymentMethod === "card"
        ? grandTotal
        : 0),

    updatedAt: serverTimestamp(),

  };

};