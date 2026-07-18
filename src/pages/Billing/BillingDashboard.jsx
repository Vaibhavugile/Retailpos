import "./BillingDashboard.css";

import { useEffect, useMemo, useState } from "react";

import BillingHeader from "../../components/Billing/BillingHeader";
import CustomerCard from "../../components/Billing/CustomerCard";
import ProductSearch from "../../components/Billing/ProductSearch";
import CartTable from "../../components/Billing/CartTable";
import BillSummary from "../../components/Billing/BillSummary";
import PaymentSection from "../../components/Billing/PaymentSection";

import { getBillingSettings } from "../../services/billingSettingsService";
import { calculateBill } from "../../utils/billingCalculator";

export default function BillingDashboard() {

  const [customer, setCustomer] = useState(null);

  const [cart, setCart] = useState([]);

  const [billDiscount, setBillDiscount] = useState(0);

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

        const settings =
          await getBillingSettings();

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

  const billSummary = useMemo(() => {

    return calculateBill({

      cart,

      billDiscount,

      billingSettings,

    });

  }, [

    cart,

    billDiscount,

    billingSettings,

  ]);

  const handleSaleCompleted = (result) => {

    setInvoiceNumber(
      result.invoiceNumber
    );

    setCart([]);

    setCustomer(null);

    setBillDiscount(0);

  };

  return (

    <div className="billing-page">

      <BillingHeader
        invoiceNumber={invoiceNumber}
        cashierName="Administrator"
      />

      <div className="billing-container">

        {/* LEFT */}

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

        {/* RIGHT */}

        <div className="billing-right">

          <CartTable
            cart={cart}
            setCart={setCart}
          />

          <BillSummary
            cart={cart}
            billSummary={billSummary}
            billingSettings={billingSettings}
            billDiscount={billDiscount}
            setBillDiscount={setBillDiscount}
          />

          <PaymentSection
            cart={cart}
            customer={customer}
            billSummary={billSummary}
            cashier="Administrator"
            onSaleCompleted={handleSaleCompleted}
          />

        </div>

      </div>

    </div>

  );

}