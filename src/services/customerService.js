import {
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

/**
 * Search customer
 * Safe to use outside transaction.
 */
export const getCustomerByMobile = async (
  mobile
) => {

  const customerRef = doc(
    db,
    "customers",
    mobile
  );

  const snapshot =
    await getDoc(customerRef);

  if (!snapshot.exists()) {

    return null;

  }

  return {

    id: snapshot.id,

    exists: true,

    ...snapshot.data(),

  };

};

/**
 * Customer document reference
 */
export const getCustomerRef = (
  mobile
) => {

  return doc(
    db,
    "customers",
    mobile
  );

};

/**
 * Build new customer document
 */
export const buildCustomerDocument = ({
  mobile,
  name,
  firstPurchaseAmount = 0,
}) => {

  return {

    mobile,

    name,

    totalOrders:
      firstPurchaseAmount > 0 ? 1 : 0,

    totalSpent:
      firstPurchaseAmount,

    createdAt: serverTimestamp(),

    updatedAt: serverTimestamp(),

  };

};
/**
 * Build customer purchase update
 */
export const buildCustomerPurchaseUpdate = ({
  customer,
  billAmount,
}) => {

  return {

    totalOrders:
      (customer.totalOrders || 0) + 1,

    totalSpent:
      (customer.totalSpent || 0) +
      billAmount,

    updatedAt: serverTimestamp(),

  };

};