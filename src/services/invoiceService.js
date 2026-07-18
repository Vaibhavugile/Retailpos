import { doc } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Returns the invoice settings document reference.
 * Used inside checkoutService transaction.
 */
export const getInvoiceSettingsRef = () => {

  return doc(
    db,
    "settings",
    "invoice"
  );

};

/**
 * Builds the next invoice number.
 * This function DOES NOT write to Firestore.
 * The checkout transaction will update lastNumber.
 */
export const buildNextInvoice = (
  invoiceSettings
) => {

  const prefix =
    invoiceSettings.prefix || "INV";

  const padding =
    invoiceSettings.padding || 6;

  const nextNumber =
    (invoiceSettings.lastNumber || 0) + 1;

  const invoiceNumber =
    `${prefix}-${String(nextNumber).padStart(
      padding,
      "0"
    )}`;

  return {

    invoiceNumber,

    nextNumber,

  };

};