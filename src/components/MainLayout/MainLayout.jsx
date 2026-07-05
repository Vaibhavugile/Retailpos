import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

import "./MainLayout.css";

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box className="layout">
      {/* Sidebar */}

      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main */}

      <Box className="main-content">
        <Topbar
          title="Dashboard"
          subtitle="Welcome back 👋"
          onMenuClick={() =>
            setMobileOpen(!mobileOpen)
          }
        />

        <Box className="page-content">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}