import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  increment,
} from "firebase/firestore";
import { db } from "../firebase";

// Search Customer
export const getCustomerByMobile = async (mobile) => {

  const customerRef = doc(
    db,
    "customers",
    mobile
  );

  const snapshot = await getDoc(customerRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };

};

// Create Customer
export const createCustomer = async ({
  name,
  mobile,
}) => {

  const customerRef = doc(
    db,
    "customers",
    mobile
  );

  await setDoc(customerRef, {

    name,
    mobile,

    totalOrders: 0,
    totalSpent: 0,

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),

  });

  return mobile;

};

// Update Customer
export const updateCustomer = async (
  mobile,
  data
) => {

  const customerRef = doc(
    db,
    "customers",
    mobile
  );

  await updateDoc(customerRef, {

    ...data,
    updatedAt: serverTimestamp(),

  });

};

// Update Purchase
export const updateCustomerPurchase = async (
  mobile,
  billAmount
) => {

  const customerRef = doc(
    db,
    "customers",
    mobile
  );

  await updateDoc(customerRef, {

    totalOrders: increment(1),

    totalSpent: increment(billAmount),

    updatedAt: serverTimestamp(),

  });

};