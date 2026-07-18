import { useEffect, useState } from "react";
import {
  subscribeProducts,
} from "../../services/productService";
import "./InventoryDashboard.css";
import InventoryStats from "../../components/Inventory/InventoryStats";
import InventoryToolbar from "../../components/Inventory/InventoryToolbar";
import InventoryTable from "../../components/Inventory/InventoryTable";
export default function InventoryDashboard() {
    const [search, setSearch] = useState("");
    const [products, setProducts] =
  useState([]);
  const [category, setCategory] = useState("");
const [subCategory, setSubCategory] = useState("");
const [status, setStatus] = useState("");
const handleRefresh = () => {
  setSearch("");
  setCategory("");
  setSubCategory("");
  setStatus("");
};
  useEffect(() => {

  const unsubscribe =
    subscribeProducts(setProducts);

  return () => unsubscribe();

}, []);
  return (
    <div className="inventory-page">

      <div className="page-header">

        <div>
          <h1>Inventory</h1>
          <p>
            Manage all your products and inventory in one place.
          </p>
        </div>

      </div>

      <div className="inventory-content">

        {/* Stats Cards */}
<InventoryStats
    products={products}
/>

<InventoryToolbar
  search={search}
  setSearch={setSearch}
  category={category}
  setCategory={setCategory}
  subCategory={subCategory}
  setSubCategory={setSubCategory}
  status={status}
  setStatus={setStatus}
  onRefresh={handleRefresh}
/>
<InventoryTable
    products={products}
    search={search}
/>

      </div>

    </div>
  );
}