import React, { useState } from "react";
import "./FinanceFilters.css";

const FILTERS = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "Year", value: "year" },
  { label: "All Time", value: "all" },
  { label: "Custom", value: "custom" },
];

const FinanceFilters = ({
  filters,
  onChange,
}) => {

  const [dateFilter, setDateFilter] = useState(
    filters?.dateFilter || "month"
  );

  const [startDate, setStartDate] = useState(
    filters?.custom?.startDate || ""
  );

  const [endDate, setEndDate] = useState(
    filters?.custom?.endDate || ""
  );

  const selectFilter = (value) => {

    setDateFilter(value);

    if (value !== "custom") {

      onChange(value, {});

    }

  };

  const applyCustomFilter = () => {

    if (!startDate || !endDate) {

      alert("Please select both dates.");

      return;

    }

    onChange("custom", {

      startDate,

      endDate,

    });

  };

  const resetFilters = () => {

    setDateFilter("month");

    setStartDate("");

    setEndDate("");

    onChange("month", {});

  };

  return (

    <div className="finance-filters">

      <div className="finance-filter-buttons">

        {FILTERS.map(filter => (

          <button

            key={filter.value}

            className={
              dateFilter === filter.value
                ? "filter-btn active"
                : "filter-btn"
            }

            onClick={() =>
              selectFilter(filter.value)
            }

          >

            {filter.label}

          </button>

        ))}

      </div>

      {dateFilter === "custom" && (

        <div className="finance-custom-filter">

          <div className="finance-date-group">

            <label>

              Start Date

            </label>

            <input

              type="date"

              value={startDate}

              onChange={(e) =>
                setStartDate(e.target.value)
              }

            />

          </div>

          <div className="finance-date-group">

            <label>

              End Date

            </label>

            <input

              type="date"

              value={endDate}

              onChange={(e) =>
                setEndDate(e.target.value)
              }

            />

          </div>

          <button

            className="apply-btn"

            onClick={applyCustomFilter}

          >

            Apply

          </button>

        </div>

      )}

      <div className="finance-filter-footer">

        <button

          className="reset-btn"

          onClick={resetFilters}

        >

          Reset Filters

        </button>

      </div>

    </div>

  );

};

export default FinanceFilters;