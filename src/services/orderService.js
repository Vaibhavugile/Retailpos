import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  where,
  documentId,
} from "firebase/firestore";

import { db } from "../firebase";

const salesCollection = collection(db, "sales");

/*
====================================
DATE HELPERS
====================================
*/

const getDateRange = (filter = "today", custom = {}) => {

  const now = new Date();

  let start;
  let end;

  switch (filter) {

    case "today": {

      start = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0
      );

      end = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        0,
        0
      );

      break;

    }

    case "yesterday": {

      start = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 1,
        0,
        0,
        0,
        0
      );

      end = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0
      );

      break;

    }

    case "week": {

      const day = now.getDay();

      const diff = day === 0 ? 6 : day - 1;

      start = new Date(now);

      start.setDate(now.getDate() - diff);

      start.setHours(0, 0, 0, 0);

      end = new Date(now);

      end.setDate(now.getDate() + 1);

      end.setHours(0, 0, 0, 0);

      break;

    }

    case "month": {

      start = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      );

      end = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        1
      );

      break;

    }

    case "custom": {

      start = custom.startDate;

      end = custom.endDate;

      break;

    }

    default:

      return null;

  }

  return {

    start: Timestamp.fromDate(start),

    end: Timestamp.fromDate(end),

  };

};

/*
====================================
BUILD QUERY
====================================
*/

const buildOrdersQuery = ({
  dateFilter = "today",
  custom = {},
  payment = "all",
  status = "all",
  pageSize = 20,
  lastDoc = null,
}) => {

  const constraints = [];

  const range = getDateRange(
    dateFilter,
    custom
  );

  if (range) {

    constraints.push(

      where(
        "createdAt",
        ">=",
        range.start
      ),

      where(
        "createdAt",
        "<",
        range.end
      )

    );

  }

  if (payment !== "all") {

    constraints.push(

      where(
        "paymentMethod",
        "==",
        payment
      )

    );

  }

  if (status !== "all") {

    constraints.push(

      where(
        "status",
        "==",
        status
      )

    );

  }

  constraints.push(

    orderBy(
      "createdAt",
      "desc"
    )

  );

  if (lastDoc) {

    constraints.push(

      startAfter(lastDoc)

    );

  }

  constraints.push(

    limit(pageSize)

  );

  return query(

    salesCollection,

    ...constraints

  );

};

/*
====================================
GET ORDERS
====================================
*/

export const getOrders = async ({
  dateFilter = "today",
  custom = {},
  payment = "all",
  status = "all",
  pageSize = 20,
  lastDoc = null,
} = {}) => {

  const q = buildOrdersQuery({

    dateFilter,

    custom,

    payment,

    status,

    pageSize,

    lastDoc,

  });

  const snapshot =
    await getDocs(q);

  const orders =
    snapshot.docs.map(doc => ({

      id: doc.id,

      ...doc.data(),

    }));

  return {

    orders,

    lastDoc:
      snapshot.docs.length
        ? snapshot.docs[
            snapshot.docs.length - 1
          ]
        : null,

    hasMore:
      snapshot.docs.length === pageSize,

  };

};

/*
====================================
GET SINGLE ORDER
====================================
*/

export const getOrder =
  async (invoiceNumber) => {

    const ref = doc(
      db,
      "sales",
      invoiceNumber
    );

    const snap =
      await getDoc(ref);

    if (!snap.exists()) {

      return null;

    }

    return {

      id: snap.id,

      ...snap.data(),

    };

};
/*
====================================
SEARCH BY INVOICE
====================================
*/

export const searchOrderByInvoice =
  async (invoiceNumber) => {

    if (!invoiceNumber) return [];

    const ref = doc(
      db,
      "sales",
      invoiceNumber.trim()
    );

    const snap = await getDoc(ref);

    if (!snap.exists()) {

      return [];

    }

    return [

      {

        id: snap.id,

        ...snap.data(),

      },

    ];

};
/*
====================================
SEARCH CUSTOMER ORDERS
====================================
*/

export const searchCustomerOrders =
  async ({
    mobile = "",
    name = "",
    pageSize = 20,
  } = {}) => {

    let q;

    if (mobile) {

      q = query(

        salesCollection,

        where(
          "customer.mobile",
          "==",
          mobile
        ),

        orderBy(
          "createdAt",
          "desc"
        ),

        limit(pageSize)

      );

    } else if (name) {

      q = query(

        salesCollection,

        where(
          "customer.name",
          "==",
          name
        ),

        orderBy(
          "createdAt",
          "desc"
        ),

        limit(pageSize)

      );

    } else {

      return [];

    }

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map(doc => ({

      id: doc.id,

      ...doc.data(),

    }));

};
/*
====================================
GLOBAL SEARCH
====================================
*/

export const searchOrders =
  async (searchText) => {

    if (!searchText) {

      return [];

    }

    const value =
      searchText.trim();

    /*
    -------------------------
    Invoice Search
    -------------------------
    */

    if (
      value
        .toUpperCase()
        .startsWith("INV")
    ) {

      return await searchOrderByInvoice(
        value
      );

    }

    /*
    -------------------------
    Mobile Search
    -------------------------
    */

    if (
      /^\d{10}$/.test(value)
    ) {

      return await searchCustomerOrders({

        mobile: value,

      });

    }

    /*
    -------------------------
    Customer Name
    -------------------------
    */

    return await searchCustomerOrders({

      name: value,

    });

};
/*
====================================
NEXT PAGE
====================================
*/

export const getNextOrdersPage =
  async ({
    filters,
    lastDoc,
    pageSize = 20,
  }) => {

    return await getOrders({

      ...filters,

      lastDoc,

      pageSize,

    });

};
const reportsCollection =
  collection(db, "dailyReports");

/*
====================================
FORMAT DATE KEY
====================================
*/

const formatDateKey = (date) => {

  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;

};
/*
====================================
TODAY SUMMARY
====================================
*/

export const getTodaySummary =
  async () => {

    const today =
      formatDateKey(new Date());

    const ref = doc(
      db,
      "dailyReports",
      today
    );

    const snap =
      await getDoc(ref);

    if (!snap.exists()) {

      return {

        totalOrders: 0,

        totalSales: 0,

        totalProfit: 0,

        totalGST: 0,

        cashSales: 0,

        cardSales: 0,

        upiSales: 0,

      };

    }

    return snap.data();

};
/*
====================================
GET DAILY REPORT
====================================
*/

export const getDailyReport =
  async (date) => {

    const ref = doc(

      db,

      "dailyReports",

      formatDateKey(date)

    );

    const snap =
      await getDoc(ref);

    if (!snap.exists()) {

      return null;

    }

    return {

      id: snap.id,

      ...snap.data(),

    };

};
/*
====================================
DATE RANGE SUMMARY
====================================
*/

export const getRangeSummary =
  async (
    startDate,
    endDate
  ) => {

    const q = query(

      reportsCollection,

      where(

        documentId(),

        ">=",

        formatDateKey(startDate)

      ),

      where(

        documentId(),

        "<=",

        formatDateKey(endDate)

      )

    );

    const snapshot =
      await getDocs(q);

    const summary = {

      totalOrders: 0,

      totalSales: 0,

      totalProfit: 0,

      totalGST: 0,

      cashSales: 0,

      cardSales: 0,

      upiSales: 0,

    };

    snapshot.forEach(doc => {

      const data =
        doc.data();

      summary.totalOrders +=
        data.totalOrders || 0;

      summary.totalSales +=
        data.totalSales || 0;

      summary.totalProfit +=
        data.totalProfit || 0;

      summary.totalGST +=
        data.totalGST || 0;

      summary.cashSales +=
        data.cashSales || 0;

      summary.cardSales +=
        data.cardSales || 0;

      summary.upiSales +=
        data.upiSales || 0;

    });

    summary.averageBill =
  summary.totalOrders > 0
    ? summary.totalSales /
      summary.totalOrders
    : 0;

return summary;

};
/*
====================================
MONTH SUMMARY
====================================
*/

export const getMonthSummary =
  async () => {

    const now =
      new Date();

    const start =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      );

    return getRangeSummary(

      start,

      now

    );

};
/*
====================================
WEEK SUMMARY
====================================
*/

export const getWeekSummary =
  async () => {

    const now =
      new Date();

    const day =
      now.getDay();

    const diff =
      day === 0
        ? 6
        : day - 1;

    const start =
      new Date(now);

    start.setDate(
      now.getDate() - diff
    );

    start.setHours(
      0,
      0,
      0,
      0
    );

    return getRangeSummary(

      start,

      now

    );

};
/*
====================================
GET SUMMARY
====================================
*/

export const getSummary =
  async ({
    dateFilter = "today",
    custom = {},
  } = {}) => {

    switch (dateFilter) {

      case "today":

        return await getTodaySummary();

      case "week":

        return await getWeekSummary();

      case "month":

        return await getMonthSummary();

      case "yesterday": {

        const yesterday =
          new Date();

        yesterday.setDate(
          yesterday.getDate() - 1
        );

        return await getDailyReport(
          yesterday
        ) || {

          totalOrders: 0,

          totalSales: 0,

          totalProfit: 0,

          averageBill: 0,

          totalGST: 0,

          cashSales: 0,

          cardSales: 0,

          upiSales: 0,

        };

      }

      case "custom":

        return await getRangeSummary(

          custom.startDate,

          custom.endDate

        );

      case "all": {

        const start =
          new Date(2020, 0, 1);

        const end =
          new Date();

        return await getRangeSummary(
          start,
          end
        );

      }

      default:

        return await getTodaySummary();

    }

};