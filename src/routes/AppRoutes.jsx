import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ==========================================
// AUTH
// ==========================================

import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import ProtectedRoute from "../components/auth/ProtectedRoute";

// ==========================================
// LAYOUT
// ==========================================

import MainLayout from "../components/MainLayout/MainLayout";

// ==========================================
// PAGES
// ==========================================

import Dashboard from "../pages/Dashboard/Dashboard";
import Categories from "../pages/Categories/Categories";
import SubCategories from "../pages/Subcategories/SubCategories";
import AddProduct from "../pages/Products/AddProduct";
import ViewProduct from "../pages/Products/ViewProduct";

import InventoryDashboard from "../pages/Inventory/InventoryDashboard";
import BillingDashboard from "../pages/Billing/BillingDashboard";
import OrdersDashboard from "../pages/Orders/OrdersDashboard";
import FinanceDashboard from "../pages/Finance/FinanceDashboard";


export default function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ==================================================
            PUBLIC ROUTES
        ================================================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />


        {/* ==================================================
            PROTECTED ROUTES
        ================================================== */}

        <Route element={<ProtectedRoute />}>

          {/* Main application layout */}

          <Route element={<MainLayout />}>

            {/* ==========================================
                DASHBOARD
            ========================================== */}

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />


            {/* ==========================================
                INVENTORY
            ========================================== */}

            <Route
              path="/inventory"
              element={<InventoryDashboard />}
            />


            {/* ==========================================
                PRODUCTS
            ========================================== */}

            <Route
              path="/products/view/:id"
              element={<ViewProduct />}
            />

            <Route
              path="/addproduct"
              element={<AddProduct />}
            />


            {/* ==========================================
                BILLING
            ========================================== */}

            <Route
              path="/billing"
              element={<BillingDashboard />}
            />


            {/* ==========================================
                CATEGORIES
            ========================================== */}

            <Route
              path="/categories"
              element={<Categories />}
            />

            <Route
              path="/subcategories"
              element={<SubCategories />}
            />


            {/* ==========================================
                ORDERS
            ========================================== */}

            <Route
              path="/orders"
              element={<OrdersDashboard />}
            />


            {/* ==========================================
                REPORTS / FINANCE
            ========================================== */}

            <Route
              path="/reports"
              element={<FinanceDashboard />}
            />

          </Route>

        </Route>


        {/* ==================================================
            UNKNOWN ROUTES
        ================================================== */}

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