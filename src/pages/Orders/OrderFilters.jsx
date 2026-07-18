import "./OrderFilters.css";

export default function OrderFilters({
  filters,
  setFilters,
}) {

  const updateFilter = (key, value) => {

    setFilters(prev => ({

      ...prev,

      [key]: value,

    }));

  };

  const resetFilters = () => {

    setFilters({

      search: "",

      payment: "all",

      status: "all",

      dateFilter: "today",

      custom: {},

    });

  };

  return (

    <div className="order-filters">

      {/* Search */}

      <div className="filter-search">

        <input

          type="text"

          placeholder="Search Invoice / Customer / Mobile..."

          value={filters.search}

          onChange={(e) =>
            updateFilter(
              "search",
              e.target.value
            )
          }

        />

      </div>

      {/* Payment */}

      <select

        value={filters.payment}

        onChange={(e) =>
          updateFilter(
            "payment",
            e.target.value
          )
        }

      >

        <option value="all">
          All Payments
        </option>

        <option value="cash">
          Cash
        </option>

        <option value="upi">
          UPI
        </option>

        <option value="card">
          Card
        </option>

      </select>

      {/* Status */}

      <select

        value={filters.status}

        onChange={(e) =>
          updateFilter(
            "status",
            e.target.value
          )
        }

      >

        <option value="all">
          All Status
        </option>

        <option value="COMPLETED">
          Completed
        </option>

        <option value="CANCELLED">
          Cancelled
        </option>

        <option value="RETURNED">
          Returned
        </option>

      </select>

      {/* Date */}

      <select

        value={filters.dateFilter}

        onChange={(e) =>
          updateFilter(
            "dateFilter",
            e.target.value
          )
        }

      >

        <option value="today">
          Today
        </option>

        <option value="yesterday">
          Yesterday
        </option>

        <option value="week">
          This Week
        </option>

        <option value="month">
          This Month
        </option>

        <option value="custom">
          Custom
        </option>

        <option value="all">
          All Time
        </option>

      </select>

      <button

        className="reset-btn"

        onClick={resetFilters}

      >

        Reset

      </button>

    </div>

  );

}