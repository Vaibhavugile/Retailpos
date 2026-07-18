import "./PaymentSection.css";
import { useState } from "react";
import { completeSale } from "../../services/checkoutService";

export default function PaymentSection({
  cart,
  customer,
  billSummary,
  cashier = "Administrator",
  onSaleCompleted,
}) {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [receivedAmount, setReceivedAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const grandTotal = billSummary?.grandTotal ?? 0;

  const received = Number(receivedAmount || 0);

  const change =
    received > grandTotal
      ? received - grandTotal
      : 0;

  const handleCompleteSale = async () => {
    try {
      setIsProcessing(true);

      const result = await completeSale({
        cart,
        customer,
        billSummary,
        paymentMethod,
        receivedAmount: received,
        cashier,
      });

      alert(
        `Sale completed successfully!\n\nInvoice: ${result.invoiceNumber}`
      );

      if (onSaleCompleted) {
        onSaleCompleted(result);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-card">
      <h2>Payment</h2>

      <div className="payment-methods">
        <button
          className={
            paymentMethod === "cash"
              ? "active"
              : ""
          }
          disabled={isProcessing}
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
          disabled={isProcessing}
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
          disabled={isProcessing}
          onClick={() =>
            setPaymentMethod("card")
          }
        >
          💳 Card
        </button>
      </div>

      <div className="payment-input">
        <label>Amount Received</label>

        <input
          type="number"
          placeholder="0.00"
          value={receivedAmount}
          disabled={isProcessing}
          onChange={(e) =>
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
          disabled={isProcessing}
        >
          Hold Bill
        </button>

        <button
          className="print-btn"
          disabled={isProcessing}
        >
          Print
        </button>

        <button
          className="complete-btn"
          disabled={isProcessing}
          onClick={handleCompleteSale}
        >
          {isProcessing
            ? "Processing..."
            : "Complete Sale"}
        </button>
      </div>
    </div>
  );
}