import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  documentId,
  Timestamp,
} from "firebase/firestore";

import { db } from "../firebase";

/*
=========================================================
COLLECTIONS
=========================================================
*/

const reportsCollection = collection(db, "dailyReports");

/*
=========================================================
DATE HELPERS
=========================================================
*/

export const formatDateKey = (date) => {

  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;

};

export const parseDateKey = (key) => {

  const [year, month, day] =
    key.split("-").map(Number);

  return new Date(
    year,
    month - 1,
    day
  );

};

export const formatMonthKey = (date) => {

  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  return `${year}-${month}`;

};

export const formatYearKey = (date) => {

  return String(date.getFullYear());

};

/*
=========================================================
DATE RANGES
=========================================================
*/

export const getDateRange = (
  filter = "today",
  custom = {}
) => {

  const now = new Date();

  let start;
  let end;

  switch (filter) {

    case "today":

      start = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );

      end = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );

      break;

    case "yesterday":

      start = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 1
      );

      end = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );

      break;

    case "week": {

      const day =
        now.getDay() === 0
          ? 7
          : now.getDay();

      start = new Date(now);

      start.setDate(
        now.getDate() - day + 1
      );

      start.setHours(0, 0, 0, 0);

      end = new Date(now);

      end.setDate(
        now.getDate() + 1
      );

      end.setHours(0, 0, 0, 0);

      break;
    }

    case "month":

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

    case "year":

      start = new Date(
        now.getFullYear(),
        0,
        1
      );

      end = new Date(
        now.getFullYear() + 1,
        0,
        1
      );

      break;

    case "custom":

      start = custom.startDate;

      end = custom.endDate;

      break;

    case "all":

      start = new Date(
        2020,
        0,
        1
      );

      end = new Date(
        now.getFullYear() + 1,
        0,
        1
      );

      break;

    default:

      start = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );

      end = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );

  }

  return {

    start,

    end,

    startTimestamp:
      Timestamp.fromDate(start),

    endTimestamp:
      Timestamp.fromDate(end),

  };

};

/*
=========================================================
EMPTY SUMMARY
=========================================================
*/

export const createEmptySummary =
  () => ({

    totalSales: 0,

    totalOrders: 0,

    totalProfit: 0,

    totalGST: 0,

    totalItemsSold: 0,

    averageBill: 0,

    cashSales: 0,

    upiSales: 0,

    cardSales: 0,

    expenses: 0,

    netProfit: 0,

    profitMargin: 0,

    cancelledOrders: 0,

    returnedOrders: 0,

});

/*
=========================================================
EMPTY CHART DATA
=========================================================
*/

export const createEmptyChart =
  () => ({

    labels: [],

    datasets: [],

});

/*
=========================================================
MONEY HELPERS
=========================================================
*/

export const safeNumber = (
  value
) => Number(value || 0);

export const roundMoney = (
  value
) => Number(
  safeNumber(value).toFixed(2)
);

export const calculateAverage = (
  total,
  count
) => {

  if (!count) return 0;

  return roundMoney(
    total / count
  );

};

export const calculatePercentage = (
  value,
  total
) => {

  if (!total) return 0;

  return roundMoney(
    (value / total) * 100
  );

};

/*
=========================================================
SUMMARY AGGREGATION
=========================================================
*/

export const mergeSummary = (
  summary,
  report
) => {

  summary.totalSales +=
    safeNumber(report.totalSales);

  summary.totalOrders +=
    safeNumber(report.totalOrders);

  summary.totalProfit +=
    safeNumber(report.totalProfit);

  summary.totalGST +=
    safeNumber(report.totalGST);

  summary.totalItemsSold +=
    safeNumber(report.totalItemsSold);

  summary.cashSales +=
    safeNumber(report.cashSales);

  summary.upiSales +=
    safeNumber(report.upiSales);

  summary.cardSales +=
    safeNumber(report.cardSales);

  summary.expenses +=
    safeNumber(report.expenses);

  summary.cancelledOrders +=
    safeNumber(
      report.cancelledOrders
    );

  summary.returnedOrders +=
    safeNumber(
      report.returnedOrders
    );

  return summary;

};

export const finalizeSummary = (
  summary
) => {

  summary.averageBill =
    calculateAverage(
      summary.totalSales,
      summary.totalOrders
    );

  summary.netProfit =
    roundMoney(
      summary.totalProfit -
      summary.expenses
    );

  summary.profitMargin =
    calculatePercentage(
      summary.netProfit,
      summary.totalSales
    );

  return summary;

};

/*
=========================================================
REPORT FETCHER
=========================================================
*/

export const getReportsBetween =
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
      ),

      orderBy(
        documentId(),
        "asc"
      )
    );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map(
      doc => ({

        id: doc.id,

        ...doc.data(),

      })
    );

};
/*
=========================================================
SUMMARY HELPERS
=========================================================
*/

export const buildSummary = async (
  startDate,
  endDate
) => {

  const reports = await getReportsBetween(
    startDate,
    endDate
  );

  const summary =
    createEmptySummary();

  reports.forEach(report => {

    mergeSummary(
      summary,
      report
    );

  });

  return finalizeSummary(
    summary
  );

};

/*
=========================================================
TODAY SUMMARY
=========================================================
*/

export const getTodaySummary =
  async () => {

    const range =
      getDateRange("today");

    return buildSummary(
      range.start,
      range.end
    );

};

/*
=========================================================
YESTERDAY SUMMARY
=========================================================
*/

export const getYesterdaySummary =
  async () => {

    const range =
      getDateRange(
        "yesterday"
      );

    return buildSummary(
      range.start,
      range.end
    );

};

/*
=========================================================
WEEK SUMMARY
=========================================================
*/

export const getWeekSummary =
  async () => {

    const range =
      getDateRange("week");

    return buildSummary(
      range.start,
      range.end
    );

};

/*
=========================================================
MONTH SUMMARY
=========================================================
*/

export const getMonthSummary =
  async () => {

    const range =
      getDateRange(
        "month"
      );

    return buildSummary(
      range.start,
      range.end
    );

};

/*
=========================================================
YEAR SUMMARY
=========================================================
*/

export const getYearSummary =
  async () => {

    const range =
      getDateRange("year");

    return buildSummary(
      range.start,
      range.end
    );

};

/*
=========================================================
CUSTOM SUMMARY
=========================================================
*/

export const getCustomSummary =
  async (
    startDate,
    endDate
  ) => {

    return buildSummary(
      startDate,
      endDate
    );

};

/*
=========================================================
ALL TIME SUMMARY
=========================================================
*/

export const getAllSummary =
  async () => {

    const range =
      getDateRange("all");

    return buildSummary(
      range.start,
      range.end
    );

};

/*
=========================================================
DASHBOARD SUMMARY
=========================================================
*/

export const getDashboardSummary =
  async ({
    dateFilter = "today",
    custom = {},
  } = {}) => {

    switch (dateFilter) {

      case "today":

        return await getTodaySummary();

      case "yesterday":

        return await getYesterdaySummary();

      case "week":

        return await getWeekSummary();

      case "month":

        return await getMonthSummary();

      case "year":

        return await getYearSummary();

      case "custom":

        return await getCustomSummary(
          custom.startDate,
          custom.endDate
        );

      case "all":

        return await getAllSummary();

      default:

        return await getTodaySummary();

    }

};

/*
=========================================================
FINANCE OVERVIEW
=========================================================
*/

export const getFinanceOverview =
  async ({
    dateFilter = "today",
    custom = {},
  } = {}) => {

    const summary =
      await getDashboardSummary({

        dateFilter,

        custom,

      });

    return {

      revenue:
        summary.totalSales,

      orders:
        summary.totalOrders,

      profit:
        summary.totalProfit,

      netProfit:
        summary.netProfit,

      expenses:
        summary.expenses,

      gst:
        summary.totalGST,

      averageBill:
        summary.averageBill,

      itemsSold:
        summary.totalItemsSold,

      cash:
        summary.cashSales,

      upi:
        summary.upiSales,

      card:
        summary.cardSales,

      profitMargin:
        summary.profitMargin,

      cancelledOrders:
        summary.cancelledOrders,

      returnedOrders:
        summary.returnedOrders,

    };

};

/*
=========================================================
PAYMENT SUMMARY
=========================================================
*/

export const getPaymentSummary =
  async ({
    dateFilter = "today",
    custom = {},
  } = {}) => {

    const summary =
      await getDashboardSummary({

        dateFilter,

        custom,

      });

    const totalPayments =
      summary.cashSales +
      summary.upiSales +
      summary.cardSales;

    return {

      totalPayments,

      cash: {

        amount:
          summary.cashSales,

        percentage:
          calculatePercentage(

            summary.cashSales,

            totalPayments

          ),

      },

      upi: {

        amount:
          summary.upiSales,

        percentage:
          calculatePercentage(

            summary.upiSales,

            totalPayments

          ),

      },

      card: {

        amount:
          summary.cardSales,

        percentage:
          calculatePercentage(

            summary.cardSales,

            totalPayments

          ),

      },

    };

};

/*
=========================================================
BUSINESS KPI
=========================================================
*/

export const getBusinessKPIs =
  async ({
    dateFilter = "today",
    custom = {},
  } = {}) => {

    const summary =
      await getDashboardSummary({

        dateFilter,

        custom,

      });

    return {

      revenue:
        summary.totalSales,

      orders:
        summary.totalOrders,

      itemsSold:
        summary.totalItemsSold,

      averageBill:
        summary.averageBill,

      grossProfit:
        summary.totalProfit,

      netProfit:
        summary.netProfit,

      profitMargin:
        summary.profitMargin,

      gst:
        summary.totalGST,

      cashSales:
        summary.cashSales,

      upiSales:
        summary.upiSales,

      cardSales:
        summary.cardSales,

      cancelledOrders:
        summary.cancelledOrders,

      returnedOrders:
        summary.returnedOrders,

    };

};
/*
=========================================================
DAILY REPORTS
=========================================================
*/

export const getDailyReports = async ({
  dateFilter = "month",
  custom = {},
} = {}) => {

  const range = getDateRange(
    dateFilter,
    custom
  );

  const reports =
    await getReportsBetween(
      range.start,
      range.end
    );

  return reports.map(report => ({

    ...report,

    averageBill:
      calculateAverage(
        report.totalSales,
        report.totalOrders
      ),

    netProfit:
      roundMoney(
        safeNumber(report.totalProfit) -
        safeNumber(report.expenses)
      ),

    profitMargin:
      calculatePercentage(
        safeNumber(report.totalProfit),
        safeNumber(report.totalSales)
      ),

  }));

};

/*
=========================================================
MONTHLY REPORTS
=========================================================
*/

export const getMonthlyReports =
  async () => {

    const reports =
      await getDailyReports({

        dateFilter: "all",

      });

    const months = {};

    reports.forEach(report => {

      const month =
        report.id.substring(0, 7);

      if (!months[month]) {

        months[month] =
          createEmptySummary();

        months[month].month =
          month;

      }

      mergeSummary(
        months[month],
        report
      );

    });

    return Object.values(
      months
    )
      .map(finalizeSummary)
      .sort((a, b) =>
        b.month.localeCompare(
          a.month
        )
      );

};

/*
=========================================================
YEARLY REPORTS
=========================================================
*/

export const getYearlyReports =
  async () => {

    const reports =
      await getDailyReports({

        dateFilter: "all",

      });

    const years = {};

    reports.forEach(report => {

      const year =
        report.id.substring(0, 4);

      if (!years[year]) {

        years[year] =
          createEmptySummary();

        years[year].year =
          year;

      }

      mergeSummary(
        years[year],
        report
      );

    });

    return Object.values(
      years
    )
      .map(finalizeSummary)
      .sort((a, b) =>
        b.year.localeCompare(
          a.year
        )
      );

};

/*
=========================================================
TOP SELLING DAYS
=========================================================
*/

export const getTopSellingDays =
  async (
    limit = 10
  ) => {

    const reports =
      await getDailyReports({

        dateFilter: "all",

      });

    return reports

      .sort(
        (a, b) =>
          b.totalSales -
          a.totalSales
      )

      .slice(0, limit);

};

/*
=========================================================
TOP PROFIT DAYS
=========================================================
*/

export const getTopProfitDays =
  async (
    limit = 10
  ) => {

    const reports =
      await getDailyReports({

        dateFilter: "all",

      });

    return reports

      .sort(
        (a, b) =>
          b.totalProfit -
          a.totalProfit
      )

      .slice(0, limit);

};

/*
=========================================================
LOWEST SALES DAYS
=========================================================
*/

export const getLowestSalesDays =
  async (
    limit = 10
  ) => {

    const reports =
      await getDailyReports({

        dateFilter: "all",

      });

    return reports

      .sort(
        (a, b) =>
          a.totalSales -
          b.totalSales
      )

      .slice(0, limit);

};

/*
=========================================================
LOWEST PROFIT DAYS
=========================================================
*/

export const getLowestProfitDays =
  async (
    limit = 10
  ) => {

    const reports =
      await getDailyReports({

        dateFilter: "all",

      });

    return reports

      .sort(
        (a, b) =>
          a.totalProfit -
          b.totalProfit
      )

      .slice(0, limit);

};

/*
=========================================================
RECENT REPORTS
=========================================================
*/

export const getRecentReports =
  async (
    count = 30
  ) => {

    const reports =
      await getDailyReports({

        dateFilter: "all",

      });

    return reports

      .sort((a, b) =>
        b.id.localeCompare(a.id)
      )

      .slice(0, count);

};

/*
=========================================================
REPORT STATISTICS
=========================================================
*/

export const getReportStatistics =
  async () => {

    const reports =
      await getDailyReports({

        dateFilter: "all",

      });

    if (!reports.length) {

      return {

        totalDays: 0,

        bestDay: null,

        worstDay: null,

        bestProfitDay: null,

        averageDailySale: 0,

        averageDailyProfit: 0,

      };

    }

    const totalSales =
      reports.reduce(
        (sum, r) =>
          sum +
          safeNumber(
            r.totalSales
          ),
        0
      );

    const totalProfit =
      reports.reduce(
        (sum, r) =>
          sum +
          safeNumber(
            r.totalProfit
          ),
        0
      );

    return {

      totalDays:
        reports.length,

      bestDay:
        [...reports].sort(
          (a, b) =>
            b.totalSales -
            a.totalSales
        )[0],

      worstDay:
        [...reports].sort(
          (a, b) =>
            a.totalSales -
            b.totalSales
        )[0],

      bestProfitDay:
        [...reports].sort(
          (a, b) =>
            b.totalProfit -
            a.totalProfit
        )[0],

      averageDailySale:
        roundMoney(
          totalSales /
          reports.length
        ),

      averageDailyProfit:
        roundMoney(
          totalProfit /
          reports.length
        ),

    };

};
/*
=========================================================
REVENUE TREND CHART
=========================================================
*/

export const getRevenueChart = async ({
  dateFilter = "month",
  custom = {},
} = {}) => {

  const reports = await getDailyReports({
    dateFilter,
    custom,
  });

  return reports.map(report => ({

    label: report.id,

    revenue: safeNumber(
      report.totalSales
    ),

  }));

};

/*
=========================================================
PROFIT TREND CHART
=========================================================
*/

export const getProfitChart = async ({
  dateFilter = "month",
  custom = {},
} = {}) => {

  const reports = await getDailyReports({
    dateFilter,
    custom,
  });

  return reports.map(report => ({

    label: report.id,

    profit: safeNumber(
      report.totalProfit
    ),

    netProfit: roundMoney(

      safeNumber(report.totalProfit) -

      safeNumber(report.expenses)

    ),

  }));

};

/*
=========================================================
ORDERS TREND CHART
=========================================================
*/

export const getOrdersChart = async ({
  dateFilter = "month",
  custom = {},
} = {}) => {

  const reports = await getDailyReports({
    dateFilter,
    custom,
  });

  return reports.map(report => ({

    label: report.id,

    orders: safeNumber(
      report.totalOrders
    ),

  }));

};

/*
=========================================================
ITEMS SOLD CHART
=========================================================
*/

export const getItemsChart = async ({
  dateFilter = "month",
  custom = {},
} = {}) => {

  const reports = await getDailyReports({
    dateFilter,
    custom,
  });

  return reports.map(report => ({

    label: report.id,

    items: safeNumber(
      report.totalItemsSold
    ),

  }));

};

/*
=========================================================
GST CHART
=========================================================
*/

export const getGSTChart = async ({
  dateFilter = "month",
  custom = {},
} = {}) => {

  const reports = await getDailyReports({
    dateFilter,
    custom,
  });

  return reports.map(report => ({

    label: report.id,

    gst: safeNumber(
      report.totalGST
    ),

  }));

};

/*
=========================================================
PAYMENT DISTRIBUTION
=========================================================
*/

export const getPaymentChart =
  async ({
    dateFilter = "month",
    custom = {},
  } = {}) => {

    const summary =
      await getDashboardSummary({

        dateFilter,

        custom,

      });

    return [

      {

        name: "Cash",

        value:
          safeNumber(
            summary.cashSales
          ),

      },

      {

        name: "UPI",

        value:
          safeNumber(
            summary.upiSales
          ),

      },

      {

        name: "Card",

        value:
          safeNumber(
            summary.cardSales
          ),

      },

    ];

};

/*
=========================================================
MONTHLY COMPARISON
=========================================================
*/

export const getMonthlyComparison =
  async () => {

    const reports =
      await getMonthlyReports();

    return reports.map(report => ({

      label:
        report.month,

      revenue:
        report.totalSales,

      profit:
        report.totalProfit,

      orders:
        report.totalOrders,

    }));

};

/*
=========================================================
YEARLY COMPARISON
=========================================================
*/

export const getYearlyComparison =
  async () => {

    const reports =
      await getYearlyReports();

    return reports.map(report => ({

      label:
        report.year,

      revenue:
        report.totalSales,

      profit:
        report.totalProfit,

      orders:
        report.totalOrders,

    }));

};

/*
=========================================================
SALES vs PROFIT
=========================================================
*/

export const getSalesProfitChart =
  async ({
    dateFilter = "month",
    custom = {},
  } = {}) => {

    const reports =
      await getDailyReports({

        dateFilter,

        custom,

      });

    return reports.map(report => ({

      label:
        report.id,

      sales:
        safeNumber(
          report.totalSales
        ),

      profit:
        safeNumber(
          report.totalProfit
        ),

    }));

};

/*
=========================================================
FINANCE DASHBOARD CHARTS
=========================================================
*/

export const getDashboardCharts =
  async ({
    dateFilter = "month",
    custom = {},
  } = {}) => {

    const [

      revenue,

      profit,

      orders,

      items,

      gst,

      payments,

    ] = await Promise.all([

      getRevenueChart({

        dateFilter,

        custom,

      }),

      getProfitChart({

        dateFilter,

        custom,

      }),

      getOrdersChart({

        dateFilter,

        custom,

      }),

      getItemsChart({

        dateFilter,

        custom,

      }),

      getGSTChart({

        dateFilter,

        custom,

      }),

      getPaymentChart({

        dateFilter,

        custom,

      }),

    ]);

    return {

      revenue,

      profit,

      orders,

      items,

      gst,

      payments,

    };

};
/*
=========================================================
GROWTH ANALYTICS
=========================================================
*/

export const getGrowthAnalytics = async () => {

  const today = await getTodaySummary();
  const yesterday = await getYesterdaySummary();
  const week = await getWeekSummary();
  const month = await getMonthSummary();
  const year = await getYearSummary();

  const growth = (current, previous) => {

    if (!previous) return 0;

    return roundMoney(
      ((current - previous) / previous) * 100
    );

  };

  return {

    dailyGrowth: growth(
      today.totalSales,
      yesterday.totalSales
    ),

    weeklyRevenue: week.totalSales,

    monthlyRevenue: month.totalSales,

    yearlyRevenue: year.totalSales,

    monthlyProfit: month.totalProfit,

    yearlyProfit: year.totalProfit,

  };

};

/*
=========================================================
PAYMENT ANALYTICS
=========================================================
*/

export const getPaymentAnalytics =
  async ({
    dateFilter = "month",
    custom = {},
  } = {}) => {

    const summary =
      await getDashboardSummary({

        dateFilter,

        custom,

      });

    const total =
      summary.cashSales +
      summary.upiSales +
      summary.cardSales;

    return {

      cash: {

        amount: summary.cashSales,

        percentage:
          calculatePercentage(
            summary.cashSales,
            total
          ),

      },

      upi: {

        amount: summary.upiSales,

        percentage:
          calculatePercentage(
            summary.upiSales,
            total
          ),

      },

      card: {

        amount: summary.cardSales,

        percentage:
          calculatePercentage(
            summary.cardSales,
            total
          ),

      },

      dominantMethod:

        summary.cashSales >= summary.upiSales &&
        summary.cashSales >= summary.cardSales

          ? "Cash"

          : summary.upiSales >= summary.cardSales

          ? "UPI"

          : "Card",

    };

};

/*
=========================================================
AVERAGE ITEMS PER ORDER
=========================================================
*/

export const getAverageItemsPerOrder =
  async ({
    dateFilter = "month",
    custom = {},
  } = {}) => {

    const summary =
      await getDashboardSummary({

        dateFilter,

        custom,

      });

    return calculateAverage(

      summary.totalItemsSold,

      summary.totalOrders

    );

};

/*
=========================================================
PERFORMANCE SCORE
=========================================================
*/

export const getPerformanceScore =
  async ({
    dateFilter = "month",
    custom = {},
  } = {}) => {

    const summary =
      await getDashboardSummary({

        dateFilter,

        custom,

      });

    let score = 0;

    if (summary.totalSales > 10000)
      score += 25;

    if (summary.totalProfit > 3000)
      score += 25;

    if (summary.averageBill > 500)
      score += 20;

    if (summary.profitMargin > 20)
      score += 30;

    return {

      score,

      grade:

        score >= 90

          ? "A+"

          : score >= 75

          ? "A"

          : score >= 60

          ? "B"

          : score >= 40

          ? "C"

          : "D",

    };

};

/*
=========================================================
BUSINESS INSIGHTS
=========================================================
*/

export const getBusinessInsights =
  async () => {

    const [

      stats,

      growth,

      payments,

      score,

      month,

    ] = await Promise.all([

      getReportStatistics(),

      getGrowthAnalytics(),

      getPaymentAnalytics(),

      getPerformanceScore(),

      getMonthSummary(),

    ]);

    return {

      totalBusinessDays:

        stats.totalDays,

      bestSalesDay:

        stats.bestDay,

      lowestSalesDay:

        stats.worstDay,

      bestProfitDay:

        stats.bestProfitDay,

      averageDailySale:

        stats.averageDailySale,

      averageDailyProfit:

        stats.averageDailyProfit,

      monthlyRevenue:

        month.totalSales,

      monthlyProfit:

        month.totalProfit,

      growth,

      payments,

      score,

    };

};

/*
=========================================================
EXECUTIVE SUMMARY
=========================================================
*/

export const getExecutiveSummary =
  async ({
    dateFilter = "month",
    custom = {},
  } = {}) => {

    const [

      summary,

      insights,

    ] = await Promise.all([

      getDashboardSummary({

        dateFilter,

        custom,

      }),

      getBusinessInsights(),

    ]);

    return {

      summary,

      insights,

      generatedAt: new Date(),

    };

};

/*
=========================================================
COMPLETE FINANCE DASHBOARD
=========================================================
*/

export const getFinanceDashboard =
  async ({
    dateFilter = "month",
    custom = {},
  } = {}) => {

    const [

      summary,

      charts,

      dailyReports,

      monthlyReports,

      yearlyReports,

      insights,

    ] = await Promise.all([

      getDashboardSummary({

        dateFilter,

        custom,

      }),

      getDashboardCharts({

        dateFilter,

        custom,

      }),

      getDailyReports({

        dateFilter,

        custom,

      }),

      getMonthlyReports(),

      getYearlyReports(),

      getBusinessInsights(),

    ]);

    return {

      summary,

      charts,

      dailyReports,

      monthlyReports,

      yearlyReports,

      insights,

      generatedAt:

        new Date(),

    };

};
/*
=========================================================
EXPORT DATA BUILDER
=========================================================
*/

export const buildExportData = async ({
  dateFilter = "month",
  custom = {},
} = {}) => {

  const dashboard =
    await getFinanceDashboard({

      dateFilter,

      custom,

    });

  return {

    generatedAt: new Date(),

    filters: {

      dateFilter,

      custom,

    },

    summary:
      dashboard.summary,

    dailyReports:
      dashboard.dailyReports,

    monthlyReports:
      dashboard.monthlyReports,

    yearlyReports:
      dashboard.yearlyReports,

    insights:
      dashboard.insights,

  };

};

/*
=========================================================
CSV DATA
=========================================================
*/

export const buildCSVData =
  async ({
    dateFilter = "month",
    custom = {},
  } = {}) => {

    const reports =
      await getDailyReports({

        dateFilter,

        custom,

      });

    return reports.map(report => ({

      Date: report.id,

      Revenue:
        report.totalSales,

      Orders:
        report.totalOrders,

      Profit:
        report.totalProfit,

      GST:
        report.totalGST,

      Cash:
        report.cashSales,

      UPI:
        report.upiSales,

      Card:
        report.cardSales,

      Items:
        report.totalItemsSold,

      AverageBill:
        report.averageBill,

      NetProfit:
        report.netProfit,

    }));

};

/*
=========================================================
PRINT DATA
=========================================================
*/

export const buildPrintData =
  async ({
    dateFilter = "month",
    custom = {},
  } = {}) => {

    return await buildExportData({

      dateFilter,

      custom,

    });

};

/*
=========================================================
PDF DATA
=========================================================
*/

export const buildPDFData =
  async ({
    dateFilter = "month",
    custom = {},
  } = {}) => {

    return await buildExportData({

      dateFilter,

      custom,

    });

};

/*
=========================================================
EXCEL DATA
=========================================================
*/

export const buildExcelData =
  async ({
    dateFilter = "month",
    custom = {},
  } = {}) => {

    return await buildExportData({

      dateFilter,

      custom,

    });

};

/*
=========================================================
FORMATTERS
=========================================================
*/

export const formatCurrency =
  value =>

    new Intl.NumberFormat(
      "en-IN",

      {

        style: "currency",

        currency: "INR",

        maximumFractionDigits: 2,

      }

    ).format(
      safeNumber(value)
    );

export const formatNumber =
  value =>

    new Intl.NumberFormat(
      "en-IN"
    ).format(
      safeNumber(value)
    );

export const formatPercent =
  value =>

    `${roundMoney(value)}%`;

export const formatDate =
  value => {

    if (!value) return "";

    return new Date(value)
      .toLocaleDateString(
        "en-IN"
      );

};

/*
=========================================================
DASHBOARD LOADER
=========================================================
*/

export const loadFinanceDashboard =
  async ({
    dateFilter = "month",
    custom = {},
  } = {}) => {

    const data =
      await getFinanceDashboard({

        dateFilter,

        custom,

      });

    return {

      ...data,

      loadedAt:
        new Date(),

    };

};

/*
=========================================================
DEFAULT EXPORT
=========================================================
*/

export default {

  getDashboardSummary,

  getFinanceOverview,

  getFinanceDashboard,

  getBusinessInsights,

  getBusinessKPIs,

  getGrowthAnalytics,

  getPaymentAnalytics,

  getRevenueChart,

  getProfitChart,

  getOrdersChart,

  getItemsChart,

  getGSTChart,

  getPaymentChart,

  getMonthlyComparison,

  getYearlyComparison,

  getDailyReports,

  getMonthlyReports,

  getYearlyReports,

  getTopSellingDays,

  getTopProfitDays,

  getLowestSalesDays,

  getLowestProfitDays,

  getReportStatistics,

  buildExportData,

  buildPDFData,

  buildExcelData,

  buildCSVData,

  buildPrintData,

};