import "./OrdersTable.css";

export default function OrdersTable({
  orders,
  loading,
  onViewOrder,
}) {

  if (loading) {

    return (

      <div className="orders-loading">

        Loading Orders...

      </div>

    );

  }

  if (!orders.length) {

    return (

      <div className="orders-empty">

        <div className="empty-icon">

          📦

        </div>

        <h3>No Orders Found</h3>

        <p>

          Try changing your filters or create your first sale.

        </p>

      </div>

    );

  }

  const formatDate = (createdAt) => {

    if (!createdAt) return "-";

    const date = createdAt.toDate
      ? createdAt.toDate()
      : new Date(createdAt);

    return date.toLocaleString();

  };

  return (

    <div className="orders-table-container">

      <table className="orders-table">

        <thead>

          <tr>

            <th>Invoice</th>

            <th>Date</th>

            <th>Customer</th>

            <th>Items</th>

            <th>Amount</th>

            <th>Payment</th>

            <th>Profit</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr key={order.invoiceNumber}>

              <td>

                <strong>

                  {order.invoiceNumber}

                </strong>

              </td>

              <td>

                {formatDate(order.createdAt)}

              </td>

              <td>

                <div className="customer-cell">

                  <strong>

                    {order.customer?.name}

                  </strong>

                  <span>

                    {order.customer?.mobile}

                  </span>

                </div>

              </td>

              <td>

                {order.totalQuantity}

              </td>

              <td>

                ₹{Number(order.grandTotal).toFixed(2)}

              </td>

              <td>

                <span
                  className={`payment-badge ${order.paymentMethod}`}
                >

                  {order.paymentMethod}

                </span>

              </td>

              <td>

                ₹{Number(order.totalProfit).toFixed(2)}

              </td>

              <td>

                <span
                  className={`status-badge ${order.status}`}
                >

                  {order.status}

                </span>

              </td>

              <td>

                <div className="action-buttons">

                  <button

                    className="view-btn"

                    onClick={() =>
                      onViewOrder(order)
                    }

                  >

                    👁 View

                  </button>

                  <button

                    className="print-btn"

                  >

                    🖨 Print

                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}