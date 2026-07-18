import "./InventoryToolbar.css";
import { useNavigate } from "react-router-dom";

export default function InventoryToolbar({
  search,
  setSearch,
  category,
  setCategory,
  subCategory,
  setSubCategory,
  status,
  setStatus,
  onRefresh,
}) {
  const navigate = useNavigate();
  return (
    <div className="inventory-toolbar">

      <div className="toolbar-left">

        <input
          type="text"
          className="search-input"
          placeholder="Search by Product Name or Product Code..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          className="toolbar-select"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="">
            All Categories
          </option>
        </select>

        <select
          className="toolbar-select"
          value={subCategory}
          onChange={(e) =>
            setSubCategory(e.target.value)
          }
        >
          <option value="">
            All Sub Categories
          </option>
        </select>

        <select
          className="toolbar-select"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option value="">
            All Status
          </option>

          <option value="active">
            Active
          </option>

          <option value="inactive">
            Inactive
          </option>
        </select>

      </div>

      <div className="toolbar-actions">

        <button
          type="button"
          className="refresh-btn"
          onClick={onRefresh}
        >
          ↻ Refresh
        </button>

           <button
          type="button"
          className="add-product-btn"
          onClick={() => navigate("/addproduct")}
        >
          + Add Product
        </button>

      </div>

    </div>
  );
}