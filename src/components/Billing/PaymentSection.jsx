import "./PaymentSection.css";
import { useState } from "react";

export default function PaymentSection({ cart }) {

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [receivedAmount, setReceivedAmount] = useState("");

  const grandTotal = cart.reduce(
    (sum, item) =>
      sum + (item.qty * item.sellingPrice),
    0
  );

  const received = Number(receivedAmount || 0);

  const change =
    received > grandTotal
      ? received - grandTotal
      : 0;

  return (

    <div className="payment-card">

      <h2>
        Payment
      </h2>

      <div className="payment-methods">

        <button
          className={
            paymentMethod === "cash"
              ? "active"
              : ""
          }
          onClick={() =>
            setPaymentMethod("cash")
          }
        >
          💵 Cash
        </button>

        <button
          className={
            paymentMethod === "upi"
              ? "active"
              : ""
          }
          onClick={() =>
            setPaymentMethod("upi")
          }
        >
          📱 UPI
        </button>

        <button
          className={
            paymentMethod === "card"
              ? "active"
              : ""
          }
          onClick={() =>
            setPaymentMethod("card")
          }
        >
          💳 Card
        </button>

      </div>

      <div className="payment-input">

        <label>
          Amount Received
        </label>

        <input
          type="number"
          placeholder="0.00"
          value={receivedAmount}
          onChange={(e)=>
            setReceivedAmount(e.target.value)
          }
        />

      </div>

      <div className="payment-summary">

        <div>

          <span>Grand Total</span>

          <strong>
            ₹ {grandTotal.toFixed(2)}
          </strong>

        </div>

        <div>

          <span>Received</span>

          <strong>
            ₹ {received.toFixed(2)}
          </strong>

        </div>

        <div>

          <span>Change</span>

          <strong className="change">

            ₹ {change.toFixed(2)}

          </strong>

        </div>

      </div>

      <div className="payment-actions">

        <button
          className="hold-btn"
        >
          Hold Bill
        </button>

        <button
          className="print-btn"
        >
          Print
        </button>

        <button
          className="complete-btn"
        >
          Complete Sale
        </button>

      </div>

    </div>

  );

}