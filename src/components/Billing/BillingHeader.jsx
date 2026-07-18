import "./BillingHeader.css";
import { useEffect, useState } from "react";

export default function BillingHeader() {
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
  });

  return (
    <div className="billing-header">

      <div className="header-left">

        <h1>🛒 POS Billing</h1>

        <p>
          Create invoices, scan products and complete sales.
        </p>

      </div>

      <div className="header-right">

        <div className="header-card">
          <span>Invoice</span>
          <strong>#INV-100001</strong>
        </div>

        <div className="header-card">
          <span>Date</span>
          <strong>{currentDate}</strong>
        </div>

        <div className="header-card">
          <span>Time</span>
          <strong>{currentClock}</strong>
        </div>

        <div className="header-card">
          <span>Cashier</span>
          <strong>Administrator</strong>
        </div>

      </div>

    </div>
  );
}