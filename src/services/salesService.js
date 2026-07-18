import {
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";
/**
 * Builds the sale document.
 * Does NOT write to Firestore.
 * checkoutServ
 * ice will save this inside a transaction.
 */
export const getSaleRef = (invoiceNumber) => {

  return doc(
    db,
    "sales",
    invoiceNumber
  );

};
export const buildSaleDocument = ({
  invoiceNumber,
  customer,
  cart,
  billSummary,
  paymentMethod,
  receivedAmount,
  cashier = "Administrator",
}) => {

  let totalProfit = 0;

  const items = cart.map((item) => {

    const itemProfit =
      (item.sellingPrice - item.purchasePrice) *
      item.qty;

    totalProfit += itemProfit;

    return {

      productId: item.productId,

      productCode: item.productCode,

      productName: item.productName,

      image: item.image || "",

      variantId: item.variantId,

      variantName: item.variantName,

      barcode: item.barcode,

      qty: item.qty,

      purchasePrice: item.purchasePrice,

      sellingPrice: item.sellingPrice,

      lineTotal:
        item.qty * item.sellingPrice,

      lineProfit: itemProfit,

    };

  });

  const received = Number(receivedAmount || 0);

  const changeAmount =
    Math.max(
      0,
      received - billSummary.grandTotal
    );

  return {

    invoiceNumber,

    customer: {

      mobile: customer.mobile,

      name: customer.name,

    },

    items,

    totalProducts: billSummary.totalProducts,

    totalQuantity: billSummary.totalQuantity,

    subtotal: billSummary.subtotal,

    discount: billSummary.discount,

    taxableAmount: billSummary.taxableAmount,

    gstPercentage: billSummary.gstPercentage,

    gst: billSummary.gst,

    grandTotal: billSummary.grandTotal,

    paymentMethod,

    receivedAmount: received,

    changeAmount,

    totalProfit,

    cashier,

    status: "COMPLETED",

    createdAt: serverTimestamp(),

  };

};