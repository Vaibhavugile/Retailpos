import "./BillingDashboard.css";

import { useEffect, useState } from "react";

import BillingHeader from "../../components/Billing/BillingHeader";
import CustomerCard from "../../components/Billing/CustomerCard";
import ProductSearch from "../../components/Billing/ProductSearch";
import CartTable from "../../components/Billing/CartTable";
import BillSummary from "../../components/Billing/BillSummary";
import PaymentSection from "../../components/Billing/PaymentSection";

import { getBillingSettings } from "../../services/billingSettingsService";

export default function BillingDashboard() {

  const [customer, setCustomer] = useState(null);

  const [cart, setCart] = useState([]);

  const [billDiscount, setBillDiscount] = useState(0);

  // This will be populated after a successful sale
  const [invoiceNumber, setInvoiceNumber] = useState("");

  const [billingSettings, setBillingSettings] = useState({
    gstEnabled: false,
    gstPercentage: 0,

    discountEnabled: true,
    allowItemDiscount: true,
    allowBillDiscount: true,

    roundOff: false,

    currency: "INR",
    currencySymbol: "₹",

    taxInclusive: false,
  });

  useEffect(() => {

    const loadBillingSettings = async () => {

      try {

        const settings = await getBillingSettings();

        setBillingSettings(settings);

      } catch (error) {

        console.error(
          "Failed to load billing settings:",
          error
        );

      }

    };

    loadBillingSettings();

  }, []);

  return (

    <div className="billing-page">

      <BillingHeader
        invoiceNumber={invoiceNumber}
        cashierName="Administrator"
      />

      <div className="billing-container">

        {/* LEFT SIDE */}

        <div className="billing-left">

          <CustomerCard
            customer={customer}
            setCustomer={setCustomer}
          />

          <ProductSearch
            cart={cart}
            setCart={setCart}
          />

        </div>

        {/* RIGHT SIDE */}

        <div className="billing-right">

          <CartTable
            cart={cart}
            setCart={setCart}
          />

          <BillSummary
            cart={cart}
            billingSettings={billingSettings}
            billDiscount={billDiscount}
            setBillDiscount={setBillDiscount}
          />

          <PaymentSection
            cart={cart}
            customer={customer}
            billDiscount={billDiscount}
            billingSettings={billingSettings}
            invoiceNumber={invoiceNumber}
            setInvoiceNumber={setInvoiceNumber}
            setCart={setCart}
            setCustomer={setCustomer}
            setBillDiscount={setBillDiscount}
          />

        </div>

      </div>

    </div>

  );

}