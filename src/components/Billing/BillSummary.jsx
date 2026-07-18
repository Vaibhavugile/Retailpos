import "./BillSummary.css";

export default function BillSummary({ cart }) {

  const totalItems = cart.length;

  const totalQuantity = cart.reduce(
    (sum, item) => sum + (item.qty || 0),
    0
  );

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + ((item.sellingPrice || 0) * (item.qty || 0)),
    0
  );

  const discount = cart.reduce(
    (sum, item) =>
      sum + (item.discount || 0),
    0
  );

  const gst = cart.reduce(
    (sum, item) =>
      sum + (item.gstAmount || 0),
    0
  );

  const grandTotal =
    subtotal - discount + gst;

  return (

    <div className="bill-summary">

      <div className="summary-header">

        <h2>Bill Summary</h2>

      </div>

      <div className="summary-row">
        <span>Total Items</span>
        <strong>{totalItems}</strong>
      </div>

      <div className="summary-row">
        <span>Total Quantity</span>
        <strong>{totalQuantity}</strong>
      </div>

      <div className="summary-row">
        <span>Subtotal</span>
        <strong>₹ {subtotal.toFixed(2)}</strong>
      </div>

      <div className="summary-row">
        <span>Discount</span>
        <strong>₹ {discount.toFixed(2)}</strong>
      </div>

      <div className="summary-row">
        <span>GST</span>
        <strong>₹ {gst.toFixed(2)}</strong>
      </div>

      <div className="summary-divider"></div>

      <div className="summary-row total">

        <span>Grand Total</span>

        <strong>
          ₹ {grandTotal.toFixed(2)}
        </strong>

      </div>

    </div>

  );

}