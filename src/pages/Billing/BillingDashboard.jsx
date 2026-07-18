import "./BillingDashboard.css";

import BillingHeader from "../../components/Billing/BillingHeader";
import CustomerCard from "../../components/Billing/CustomerCard";
import ProductSearch from "../../components/Billing/ProductSearch";
import CartTable from "../../components/Billing/CartTable";
import BillSummary from "../../components/Billing/BillSummary";
import PaymentSection from "../../components/Billing/PaymentSection";

import { useState } from "react";

export default function BillingDashboard() {
  const [customer, setCustomer] = useState(null);

  const [cart, setCart] = useState([]);

  return (
    <div className="billing-page">

      <BillingHeader />

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
          />

          <PaymentSection
            cart={cart}
          />

        </div>

      </div>

    </div>
  );
}