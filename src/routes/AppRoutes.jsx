import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

import MainLayout from "../components/MainLayout/MainLayout";

// import Dashboard from "../pages/Dashboard/Dashboard";
import Categories from "../pages/Categories/Categories";
import SubCategories from "../pages/Subcategories/SubCategories";
import AddProduct from "../pages/Products/AddProduct";
import InventoryDashboard from "../pages/Inventory/InventoryDashboard";
import BillingDashboard from "../pages/Billing/BillingDashboard";
import OrdersDashboard from "../pages/Orders/OrdersDashboard";
import FinanceDashboard from "../pages/Finance/FinanceDashboard";
import ViewProduct from "../pages/Products/ViewProduct";
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Private Layout */}

        <Route element={<MainLayout />}>
          {/* <Route
            path="/dashboard"
            element={<Dashboard />}
          /> */}
          <Route
    path="/inventory"
    element={<InventoryDashboard />}
/>
<Route
  path="/products/view/:id"
  element={<ViewProduct />}
/>
         <Route
    path="/billing"
    element={<BillingDashboard />}
/>
          <Route
            path="/categories"
            element={<Categories />}
          />
          <Route
          path="/orders"
          element={<OrdersDashboard />}
          />
          <Route
          path="/reports"
          element={<FinanceDashboard />}
          />
                 <Route
  path="/subcategories"
  element={<SubCategories />}
/>
<Route 
path="/addproduct"
element={<AddProduct />}
/>
        </Route>
  

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}