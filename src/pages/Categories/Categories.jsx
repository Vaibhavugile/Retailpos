import { useEffect, useMemo, useState } from "react";

import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

import { motion } from "framer-motion";

import CategoryStats from "../../components/category/CategoryStats";
import CategoryToolbar from "../../components/category/CategoryToolbar";
import CategoryTable from "../../components/category/CategoryTable";
import AddCategoryDrawer from "../../components/category/AddCategoryDrawer";

import {
  subscribeCategories,
  deleteCategory,
} from "../../services/categoryService";

export default function Categories() {
  /* ===========================================
      SEARCH & FILTERS
  =========================================== */

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("all");

  const [sort, setSort] =
    useState("latest");

  /* ===========================================
      DRAWER
  =========================================== */

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  /* ===========================================
      FIREBASE DATA
  =========================================== */

  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* ===========================================
      REALTIME FIRESTORE
  =========================================== */

  useEffect(() => {
    const unsubscribe =
      subscribeCategories((data) => {
        setCategories(data);

        setLoading(false);
      });

    return () => unsubscribe();
  }, []);
    /* ===========================================
      FILTERING
  =========================================== */

  const filteredCategories = useMemo(() => {
    let data = [...categories];

    // Search
    data = data.filter((item) => {
      const searchText = search.toLowerCase();

      const matchSearch =
        item.name
          ?.toLowerCase()
          .includes(searchText) ||
        item.description
          ?.toLowerCase()
          .includes(searchText);

      const matchStatus =
        status === "all"
          ? true
          : status === "active"
          ? item.status === true
          : item.status === false;

      return matchSearch && matchStatus;
    });

    // Sorting
    switch (sort) {
      case "az":
        data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "za":
        data.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;

      case "oldest":
        data.sort(
          (a, b) =>
            (a.createdAt?.seconds || 0) -
            (b.createdAt?.seconds || 0)
        );
        break;

      case "latest":
      default:
        data.sort(
          (a, b) =>
            (b.createdAt?.seconds || 0) -
            (a.createdAt?.seconds || 0)
        );
        break;
    }

    return data;
  }, [
    categories,
    search,
    status,
    sort,
  ]);

  /* ===========================================
      EDIT
  =========================================== */

  const handleEdit = (category) => {
    console.log("Edit Category", category);

    // Next Step:
    // Open Edit Drawer
  };

  /* ===========================================
      DELETE
  =========================================== */

  const handleDelete = async (
    category
  ) => {
    const confirmDelete =
      window.confirm(
        `Delete "${category.name}"?`
      );

    if (!confirmDelete) return;

    try {
      await deleteCategory(
        category.id,
        category.imagePath || ""
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
  <motion.div
    initial={{
      opacity: 0,
      y: 20,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    transition={{
      duration: 0.35,
    }}
  >
    <Box>

      {/* ===========================
          PAGE HEADER
      =========================== */}

      <Box
  sx={{
    mb: 5,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 3,
  }}
>
  <Box>
    <Typography
      sx={{
        fontSize: 42,
        fontWeight: 800,
        color: "#111827",
        letterSpacing: "-0.04em",
        lineHeight: 1.1,
      }}
    >
      Categories
    </Typography>

    
  </Box>

  <Box
    sx={{
      px: 3,
      py: 1.5,
      borderRadius: "18px",
      background:
        "linear-gradient(135deg,#EEF2FF,#F8F9FF)",
      border: "1px solid #DDE6FF",
    }}
  >
    <Typography
      sx={{
        fontWeight: 700,
        color: "#5B5FEF",
      }}
    >
      {categories.length} Categories
    </Typography>
  </Box>
</Box>

      {/* ===========================
          STATS
      =========================== */}

      <CategoryStats
        categories={categories}
      />

      {/* ===========================
          TOOLBAR
      =========================== */}

      <CategoryToolbar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
        onAdd={() =>
          setDrawerOpen(true)
        }
      />

      {/* ===========================
          TABLE
      =========================== */}

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          py={12}
        >
          <CircularProgress
            size={42}
          />
        </Box>
      ) : (
        <CategoryTable
          categories={filteredCategories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* ===========================
          DRAWER
      =========================== */}

      <AddCategoryDrawer
        open={drawerOpen}
        onClose={() =>
          setDrawerOpen(false)
        }
      />
    </Box>
  </motion.div>
);
}