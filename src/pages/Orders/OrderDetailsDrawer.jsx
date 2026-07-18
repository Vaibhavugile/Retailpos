import "./OrderDetailsDrawer.css";

export default function OrderDetailsDrawer({
  order,
  onClose,
  onPrint,
  onDownloadPDF,
}) {

  if (!order) return null;

  const formatDate = (createdAt) => {

    if (!createdAt) return "-";

    const date = createdAt.toDate
      ? createdAt.toDate()
      : new Date(createdAt);

    return date.toLocaleString();

  };

  const money = (value) =>
    `₹${Number(value || 0).toFixed(2)}`;

  return (

    <div
      className="drawer-overlay"
      onClick={onClose}
    >

      <div
        className="order-drawer"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ============================
            HEADER
        ============================ */}

        <div className="drawer-header">

          <div>

            <h2>

              Invoice #{order.invoiceNumber}

            </h2>

            <p>

              {formatDate(order.createdAt)}

            </p>

          </div>

          <button
            className="close-btn"
            onClick={onClose}
          >

            ✕

          </button>

        </div>

        {/* ============================
            ORDER INFO
        ============================ */}

        <div className="drawer-section">

          <h3>Order Details</h3>

          <div className="info-row">

            <span>Status</span>

            <strong>

              <span
                className={`status-badge ${String(
                  order.status || ""
                ).toLowerCase()}`}
              >

                {order.status || "-"}

              </span>

            </strong>

          </div>

          <div className="info-row">

            <span>Payment</span>

            <strong>

              <span
                className={`payment-badge ${String(
                  order.paymentMethod || ""
                ).toLowerCase()}`}
              >

                {order.paymentMethod || "-"}

              </span>

            </strong>

          </div>

          <div className="info-row">

            <span>Cashier</span>

            <strong>

              {order.cashier || "-"}

            </strong>

          </div>

        </div>

        {/* ============================
            CUSTOMER
        ============================ */}

        <div className="drawer-section">

          <h3>Customer</h3>

          <div className="info-row">

            <span>Name</span>

            <strong>

              {order.customer?.name ||
                "Walk-in Customer"}

            </strong>

          </div>

          <div className="info-row">

            <span>Mobile</span>

            <strong>

              {order.customer?.mobile || "-"}

            </strong>

          </div>

        </div>

        {/* ============================
            ITEMS
        ============================ */}

        <div className="drawer-section">

          <h3>Items</h3>

          {(order.items || []).map((item, index) => (

            <div
              className="item-row"
              key={item.variantId || index}
            >

              <div>

                <strong>

                  {item.productName}

                </strong>

                <small>

                  {item.variantName}

                </small>

              </div>

              <div>

                {item.qty} × {money(item.sellingPrice)}

              </div>

            </div>

          ))}

        </div>

        {/* ============================
            BILL SUMMARY
        ============================ */}

        <div className="drawer-section">

          <h3>Bill Summary</h3>

          <div className="info-row">

            <span>Total Items</span>

            <strong>

              {order.totalQuantity || 0}

            </strong>

          </div>

          <div className="info-row">

            <span>Subtotal</span>

            <strong>

              {money(order.subtotal)}

            </strong>

          </div>

          <div className="info-row">

            <span>GST</span>

            <strong>

              {money(order.gst)}

            </strong>

          </div>

          <div className="info-row">

            <span>Total</span>

            <strong>

              {money(order.grandTotal)}

            </strong>

          </div>

          <div className="info-row">

            <span>Profit</span>

            <strong>

              {money(order.totalProfit)}

            </strong>

          </div>

        </div>

        {/* ============================
            PAYMENT
        ============================ */}

        <div className="drawer-section">

          <h3>Payment Details</h3>

          <div className="info-row">

            <span>Received</span>

            <strong>

              {money(order.receivedAmount)}

            </strong>

          </div>

          <div className="info-row">

            <span>Change Returned</span>

            <strong>

              {money(order.changeAmount)}

            </strong>

          </div>

        </div>

        {/* ============================
            FOOTER
        ============================ */}

        <div className="drawer-footer">

          <button
            className="primary-btn"
            onClick={() =>
              onPrint?.(order)
            }
          >

            🖨 Print Invoice

          </button>

          <button
            className="secondary-btn"
            onClick={() =>
              onDownloadPDF?.(order)
            }
          >

            📄 Download PDF

          </button>

        </div>

      </div>

    </div>

  );

}