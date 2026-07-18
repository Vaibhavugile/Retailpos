import "./BillSummary.css";
import { calculateBill } from "../../utils/billingCalculator";

export default function BillSummary({
  cart,
  billingSettings,
  billDiscount,
  setBillDiscount,
}) {

  const currencySymbol =
    billingSettings?.currencySymbol || "₹";

  const discountEnabled =
    billingSettings?.discountEnabled ?? true;

  const gstEnabled =
    billingSettings?.gstEnabled ?? false;

  const {
    totalProducts,
    totalQuantity,
    subtotal,
    discount,
    gstPercentage,
    gst,
    taxableAmount,
    grandTotal,
  } = calculateBill({
    cart,
    billDiscount,
    billingSettings,
  });

  return (

    <div className="bill-summary">

      <div className="summary-header">

        <h2>🧾 Bill Summary</h2>

      </div>

      <div className="summary-row">

        <span>Total Products</span>

        <strong>{totalProducts}</strong>

      </div>

      <div className="summary-row">

        <span>Total Quantity</span>

        <strong>{totalQuantity}</strong>

      </div>

      <div className="summary-row">

        <span>Subtotal</span>

        <strong>

          {currencySymbol} {subtotal.toFixed(2)}

        </strong>

      </div>

      {discountEnabled && (

        <div className="summary-row">

          <span>Bill Discount</span>

          <input
            type="number"
            className="discount-input"
            min="0"
            max={subtotal}
            step="0.01"
            value={billDiscount}
            onChange={(e) =>
              setBillDiscount(
                Number(e.target.value) || 0
              )
            }
          />

        </div>

      )}

      {discountEnabled && (

        <div className="summary-row">

          <span>Discount Applied</span>

          <strong className="discount">

            - {currencySymbol} {discount.toFixed(2)}

          </strong>

        </div>

      )}

      <div className="summary-row">

        <span>Taxable Amount</span>

        <strong>

          {currencySymbol} {taxableAmount.toFixed(2)}

        </strong>

      </div>

      {gstEnabled && (

        <div className="summary-row">

          <span>

            GST ({gstPercentage}%)

          </span>

          <strong>

            {currencySymbol} {gst.toFixed(2)}

          </strong>

        </div>

      )}

      <div className="summary-divider"></div>

      <div className="summary-row grand-total">

        <span>Grand Total</span>

        <strong>

          {currencySymbol} {grandTotal.toFixed(2)}

        </strong>

      </div>

    </div>

  );

}