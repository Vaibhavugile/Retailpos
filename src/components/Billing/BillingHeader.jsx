import "./BillingHeader.css";
import { useEffect, useState } from "react";

export default function BillingHeader({
  invoiceNumber = "",
  cashierName = "Administrator",
}) {

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {

    const timer = setInterval(() => {

      setCurrentTime(new Date());

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const currentDate = currentTime.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const currentClock = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (

    <div className="billing-header">

      <div className="header-left">

        <h1>🛒 Retail POS Billing</h1>

        <p>
          Scan products, manage customers and complete sales quickly.
        </p>

      </div>

      <div className="header-right">

        <div className="header-card">

          <span>Invoice No.</span>

          <strong>

            {invoiceNumber || "New Invoice"}

          </strong>

        </div>

        <div className="header-card">

          <span>Date</span>

          <strong>

            {currentDate}

          </strong>

        </div>

        <div className="header-card">

          <span>Time</span>

          <strong>

            {currentClock}

          </strong>

        </div>

        <div className="header-card">

          <span>Cashier</span>

          <strong>

            {cashierName}

          </strong>

        </div>

      </div>

    </div>

  );

}