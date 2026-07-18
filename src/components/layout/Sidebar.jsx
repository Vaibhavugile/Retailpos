import {
  DashboardRounded,
  CategoryRounded,
  Inventory2Rounded,
  ShoppingCartRounded,
  ReceiptLongRounded,
  AssessmentRounded,
  PeopleRounded,
  SettingsRounded,
  LocalOfferRounded,
  PaletteRounded,
  StraightenRounded,
  StoreRounded,
  MenuRounded,
  ChevronLeftRounded,
} from "@mui/icons-material";

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";

import { NavLink } from "react-router-dom";
import { useState } from "react";

import "./Sidebar.css";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const menus = [
    {
      title: "Dashboard",
      icon: <DashboardRounded />,
      path: "/dashboard",
    },

    {
      header: "PRODUCTS",
    },

    {
      title: "Categories",
      icon: <CategoryRounded />,
      path: "/categories",
    },

    {
      title: "Sub Categories",
      icon: <Inventory2Rounded />,
      path: "/subcategories",
    },

    {
      title: "Brands",
      icon: <LocalOfferRounded />,
      path: "/brands",
    },

    {
      title: "Colors",
      icon: <PaletteRounded />,
      path: "/colors",
    },

    {
      title: "Sizes",
      icon: <StraightenRounded />,
      path: "/sizes",
    },

    {
      title: "Products",
      icon: <StoreRounded />,
      path: "/inventory",
    },

    {
      header: "PURCHASE",
    },

    {
      title: "Orders",
      icon: <ShoppingCartRounded />,
      path: "/orders",
    },

    {
      header: "SALES",
    },

    {
      title: "Billing",
      icon: <ReceiptLongRounded />,
      path: "/billing",
    },

    {
      header: "REPORTS",
    },

    {
      title: "Reports",
      icon: <AssessmentRounded />,
      path: "/reports",
    },

    {
      header: "SETTINGS",
    },

    {
      title: "Users",
      icon: <PeopleRounded />,
      path: "/users",
    },

    {
      title: "Settings",
      icon: <SettingsRounded />,
      path: "/settings",
    },
  ];

  return (
    <Box
      className={`sidebar ${
        collapsed ? "collapsed" : ""
      }`}
    >
      {/* Logo */}

      <Box className="sidebar-logo">
        {!collapsed && (
          <Typography
            variant="h5"
            fontWeight={800}
          >
            RetailPOS
          </Typography>
        )}

        <IconButton
          onClick={() =>
            setCollapsed(!collapsed)
          }
        >
          {collapsed ? (
            <MenuRounded />
          ) : (
            <ChevronLeftRounded />
          )}
        </IconButton>
      </Box>

      <Divider />

      <List className="sidebar-menu">
        {menus.map((item, index) => {
          if (item.header) {
            return !collapsed ? (
              <Typography
                key={index}
                className="sidebar-header"
              >
                {item.header}
              </Typography>
            ) : null;
          }

          return (
            <ListItemButton
              key={index}
              component={NavLink}
              to={item.path}
              className="sidebar-item"
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>

              {!collapsed && (
                <ListItemText
                  primary={item.title}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>

      <Box className="sidebar-footer">
        {!collapsed && (
          <>
            <Typography
              fontWeight={700}
            >
              Admin User
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Super Admin
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}