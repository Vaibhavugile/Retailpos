import React from "react";
import { useNavigate } from "react-router-dom";

import "./Dashboard.css";


export default function Dashboard() {

  const navigate = useNavigate();

  return (
    <div className="dashboard-page">


      {/* ==========================================
          HEADER
      ========================================== */}

      <header className="dashboard-header">

        <div>

          <p className="dashboard-eyebrow">
            JAMALÉ COLLECTION
          </p>

          <h1>
            Welcome back
          </h1>

          <p className="dashboard-subtitle">
            Manage your collection and store operations
            from one place.
          </p>

        </div>


        <div className="dashboard-header-actions">

          <button
            className="notification-btn"
          >
            🔔
          </button>


          <div className="admin-profile">

            <div className="admin-avatar">
              A
            </div>

            <div className="admin-info">

              <strong>
                Admin
              </strong>

              <span>
                Store Manager
              </span>

            </div>

            <span className="admin-arrow">
              ▾
            </span>

          </div>

        </div>

      </header>



      {/* ==========================================
          QUICK ACCESS
      ========================================== */}

      <section className="quick-access">

        <div className="section-heading">

          <div>

            <span className="section-label">
              QUICK ACCESS
            </span>

            <h2>
              Store Management
            </h2>

          </div>

        </div>



        <div className="management-grid">


          {/* ==========================================
              CATEGORIES
          ========================================== */}

          <div className="management-card">

            <div className="management-icon category-icon">
              🏷
            </div>

            <div className="management-content">

              <h3>
                Categories
              </h3>

              <p>
                Organize your products into categories.
              </p>

              <button
                className="card-link"
                onClick={() =>
                  navigate("/categories")
                }
              >
                Manage Categories
                <span>→</span>
              </button>

            </div>

          </div>



          {/* ==========================================
              SUB CATEGORIES
          ========================================== */}

          <div className="management-card">

            <div className="management-icon products-icon">
              📂
            </div>

            <div className="management-content">

              <h3>
                Sub Categories
              </h3>

              <p>
                Manage your product sub categories.
              </p>

              <button
                className="card-link"
                onClick={() =>
                  navigate("/subcategories")
                }
              >
                Manage Sub Categories
                <span>→</span>
              </button>

            </div>

          </div>



          {/* ==========================================
              BRANDS
          ========================================== */}

          <div className="management-card">

            <div className="management-icon inventory-icon">
              🏷️
            </div>

            <div className="management-content">

              <h3>
                Brands
              </h3>

              <p>
                Manage brands available in your store.
              </p>

              <button
                className="card-link"
                onClick={() =>
                  navigate("/brands")
                }
              >
                Manage Brands
                <span>→</span>
              </button>

            </div>

          </div>



          {/* ==========================================
              COLORS
          ========================================== */}

          <div className="management-card">

            <div className="management-icon category-icon">
              🎨
            </div>

            <div className="management-content">

              <h3>
                Colors
              </h3>

              <p>
                Manage product colors and options.
              </p>

              <button
                className="card-link"
                onClick={() =>
                  navigate("/colors")
                }
              >
                Manage Colors
                <span>→</span>
              </button>

            </div>

          </div>



          {/* ==========================================
              SIZES
          ========================================== */}

          <div className="management-card">

            <div className="management-icon barcode-icon">
              📏
            </div>

            <div className="management-content">

              <h3>
                Sizes
              </h3>

              <p>
                Manage clothing sizes and options.
              </p>

              <button
                className="card-link"
                onClick={() =>
                  navigate("/sizes")
                }
              >
                Manage Sizes
                <span>→</span>
              </button>

            </div>

          </div>



          {/* ==========================================
              PRODUCTS
          ========================================== */}

          <div className="management-card">

            <div className="management-icon products-icon">
              📦
            </div>

            <div className="management-content">

              <h3>
                Products
              </h3>

              <p>
                Manage products and their variants.
              </p>

              <button
                className="card-link"
                onClick={() =>
                  navigate("/inventory")
                }
              >
                Manage Products
                <span>→</span>
              </button>

            </div>

          </div>



          {/* ==========================================
              ORDERS
          ========================================== */}

          <div className="management-card">

            <div className="management-icon inventory-icon">
              🛒
            </div>

            <div className="management-content">

              <h3>
                Orders
              </h3>

              <p>
                Manage your purchase and store orders.
              </p>

              <button
                className="card-link"
                onClick={() =>
                  navigate("/orders")
                }
              >
                Manage Orders
                <span>→</span>
              </button>

            </div>

          </div>



          {/* ==========================================
              BILLING
          ========================================== */}

          <div className="management-card">

            <div className="management-icon barcode-icon">
              🧾
            </div>

            <div className="management-content">

              <h3>
                Billing
              </h3>

              <p>
                Manage billing and transactions.
              </p>

              <button
                className="card-link"
                onClick={() =>
                  navigate("/billing")
                }
              >
                Open Billing
                <span>→</span>
              </button>

            </div>

          </div>



          {/* ==========================================
              REPORTS
          ========================================== */}

          <div className="management-card">

            <div className="management-icon category-icon">
              📊
            </div>

            <div className="management-content">

              <h3>
                Reports
              </h3>

              <p>
                View business and financial reports.
              </p>

              <button
                className="card-link"
                onClick={() =>
                  navigate("/reports")
                }
              >
                View Reports
                <span>→</span>
              </button>

            </div>

          </div>



          {/* ==========================================
              USERS
          ========================================== */}

          <div className="management-card">

            <div className="management-icon products-icon">
              👥
            </div>

            <div className="management-content">

              <h3>
                Users
              </h3>

              <p>
                Manage store users and administrators.
              </p>

              <button
                className="card-link"
                onClick={() =>
                  navigate("/users")
                }
              >
                Manage Users
                <span>→</span>
              </button>

            </div>

          </div>



          {/* ==========================================
              SETTINGS
          ========================================== */}

          <div className="management-card">

            <div className="management-icon inventory-icon">
              ⚙️
            </div>

            <div className="management-content">

              <h3>
                Settings
              </h3>

              <p>
                Manage your store configuration.
              </p>

              <button
                className="card-link"
                onClick={() =>
                  navigate("/settings")
                }
              >
                Open Settings
                <span>→</span>
              </button>

            </div>

          </div>


        </div>

      </section>



      {/* ==========================================
          MAIN DASHBOARD GRID
      ========================================== */}

      <section className="dashboard-main-grid">


        {/* ==========================================
            INVENTORY OVERVIEW
        ========================================== */}

        <div className="dashboard-panel inventory-panel">

          <div className="panel-header">

            <div>

              <span className="panel-label">
                INVENTORY
              </span>

              <h2>
                Inventory Overview
              </h2>

            </div>


            <button
              className="panel-action"
              onClick={() =>
                navigate("/inventory")
              }
            >
              View Inventory
              <span>→</span>
            </button>

          </div>


          <div className="empty-state">

            <div className="empty-icon">
              📦
            </div>

            <h3>
              Inventory overview
            </h3>

            <p>
              Your inventory information will appear
              here once products are added.
            </p>

          </div>

        </div>



        {/* ==========================================
            QUICK ACTIONS
        ========================================== */}

        <div className="dashboard-panel actions-panel">

          <div className="panel-header">

            <div>

              <span className="panel-label">
                ACTIONS
              </span>

              <h2>
                Quick Actions
              </h2>

            </div>

          </div>



          <div className="action-list">


            {/* ADD PRODUCT */}

            <button
              className="action-item"
              onClick={() =>
                navigate("/addproduct")
              }
            >

              <span className="action-item-icon">
                +
              </span>

              <span className="action-item-content">

                <strong>
                  Add Product
                </strong>

                <small>
                  Create a new product
                </small>

              </span>

              <span className="action-arrow">
                →
              </span>

            </button>



            {/* PRODUCTS */}

            <button
              className="action-item"
              onClick={() =>
                navigate("/inventory")
              }
            >

              <span className="action-item-icon">
                📦
              </span>

              <span className="action-item-content">

                <strong>
                  Manage Products
                </strong>

                <small>
                  View your product catalogue
                </small>

              </span>

              <span className="action-arrow">
                →
              </span>

            </button>



            {/* ORDERS */}

            <button
              className="action-item"
              onClick={() =>
                navigate("/orders")
              }
            >

              <span className="action-item-icon">
                🛒
              </span>

              <span className="action-item-content">

                <strong>
                  Orders
                </strong>

                <small>
                  Manage store orders
                </small>

              </span>

              <span className="action-arrow">
                →
              </span>

            </button>



            {/* BILLING */}

            <button
              className="action-item"
              onClick={() =>
                navigate("/billing")
              }
            >

              <span className="action-item-icon">
                🧾
              </span>

              <span className="action-item-content">

                <strong>
                  Billing
                </strong>

                <small>
                  Open billing dashboard
                </small>

              </span>

              <span className="action-arrow">
                →
              </span>

            </button>



            {/* REPORTS */}

            <button
              className="action-item"
              onClick={() =>
                navigate("/reports")
              }
            >

              <span className="action-item-icon">
                📊
              </span>

              <span className="action-item-content">

                <strong>
                  Reports
                </strong>

                <small>
                  View business reports
                </small>

              </span>

              <span className="action-arrow">
                →
              </span>

            </button>



            {/* SETTINGS */}

            <button
              className="action-item"
              onClick={() =>
                navigate("/settings")
              }
            >

              <span className="action-item-icon">
                ⚙
              </span>

              <span className="action-item-content">

                <strong>
                  Settings
                </strong>

                <small>
                  Manage store settings
                </small>

              </span>

              <span className="action-arrow">
                →
              </span>

            </button>


          </div>

        </div>

      </section>



      {/* ==========================================
          BOTTOM SECTION
      ========================================== */}

      <section className="bottom-grid">


        {/* RECENT ACTIVITY */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>

              <span className="panel-label">
                ACTIVITY
              </span>

              <h2>
                Recent Activity
              </h2>

            </div>

            <button
              className="panel-action"
              onClick={() =>
                navigate("/reports")
              }
            >
              View All
              <span>→</span>
            </button>

          </div>


          <div className="empty-state small-empty">

            <div className="empty-icon">
              ◷
            </div>

            <h3>
              No recent activity
            </h3>

            <p>
              Store activity will appear here.
            </p>

          </div>

        </div>



        {/* STOCK ALERTS */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>

              <span className="panel-label">
                INVENTORY
              </span>

              <h2>
                Stock Alerts
              </h2>

            </div>

            <button
              className="panel-action"
              onClick={() =>
                navigate("/inventory")
              }
            >
              View All
              <span>→</span>
            </button>

          </div>


          <div className="empty-state small-empty">

            <div className="empty-icon">
              ✓
            </div>

            <h3>
              No stock alerts
            </h3>

            <p>
              Low-stock products will appear here.
            </p>

          </div>

        </div>


      </section>


    </div>
  );
}