import {
  doc,
  runTransaction,
} from "firebase/firestore";
import { db } from "../firebase";

export const generateInvoiceNumber = async () => {

  const invoiceRef = doc(
    db,
    "settings",
    "invoice"
  );

  return await runTransaction(
    db,
    async (transaction) => {

      const snapshot =
        await transaction.get(invoiceRef);

      if (!snapshot.exists()) {

        throw new Error(
          "Invoice settings not found."
        );

      }

      const data = snapshot.data();

      const prefix =
        data.prefix || "INV";

      const padding =
        data.padding || 6;

      const nextNumber =
        (data.lastNumber || 0) + 1;

      transaction.update(
        invoiceRef,
        {
          lastNumber: nextNumber,
        }
      );

      return `${prefix}-${String(
        nextNumber
      ).padStart(
        padding,
        "0"
      )}`;

    }

  );

};