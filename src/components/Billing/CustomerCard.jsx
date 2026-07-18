import "./CustomerCard.css";

export default function CustomerCard({
  customer,
  setCustomer,
}) {
  return (
    <div className="customer-card">

      <div className="card-header">

        <h2>👤 Customer</h2>

        <button
          type="button"
          className="new-customer-btn"
        >
          + New Customer
        </button>

      </div>

      <div className="customer-body">

        <div className="form-group">

          <label>Mobile Number</label>

          <input
            type="tel"
            placeholder="Enter WhatsApp / Mobile Number"
            maxLength={10}
          />

        </div>

        <div className="form-group">

          <label>Customer Name</label>

          <input
            type="text"
            placeholder="Walk-in Customer"
            value={customer?.name || ""}
            readOnly
          />

        </div>

        <div className="customer-info">

          <div className="info-box">

            <span>Total Orders</span>

            <strong>
              {customer?.totalOrders || 0}
            </strong>

          </div>

          <div className="info-box">

            <span>Total Spent</span>

            <strong>
              ₹ {customer?.totalSpent || 0}
            </strong>

          </div>

        </div>

        <button
          type="button"
          className="search-customer-btn"
        >
          Search Customer
        </button>

      </div>

    </div>
  );
}