import {
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

/**
 * Returns the payment document reference.
 * checkoutService will save this inside a transaction.
 */
export const getPaymentRef = (
  invoiceNumber
) => {

  return doc(
    db,
    "payments",
    invoiceNumber
  );

};

/**
 * Builds the payment document.
 * Does NOT write to Firestore.
 */
export const buildPaymentDocument = ({
  invoiceNumber,
  paymentMethod,
  grandTotal,
  receivedAmount,
  changeAmount,
  transactionId = "",
}) => {

  return {

    invoiceNumber,

    paymentMethod,

    grandTotal,

    receivedAmount: Number(receivedAmount),

    changeAmount: Number(changeAmount),

    transactionId,

    status: "SUCCESS",

    createdAt: serverTimestamp(),

  };

};