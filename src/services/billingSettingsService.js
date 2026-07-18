import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const getBillingSettings = async () => {

  try {

    const docRef = doc(db, "settings", "billing");

    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {

      return {
        gstEnabled: false,
        gstPercentage: 0,

        discountEnabled: true,
        allowItemDiscount: true,
        allowBillDiscount: true,

        roundOff: false,

        currency: "INR",
        currencySymbol: "₹",

        taxInclusive: false,
      };

    }

    return snapshot.data();

  } catch (error) {

    console.error("Error loading billing settings:", error);

    return {
      gstEnabled: false,
      gstPercentage: 0,

      discountEnabled: true,
      allowItemDiscount: true,
      allowBillDiscount: true,

      roundOff: false,

      currency: "INR",
      currencySymbol: "₹",

      taxInclusive: false,
    };

  }

};