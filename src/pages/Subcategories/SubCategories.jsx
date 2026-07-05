import { useEffect, useMemo, useState } from "react";

import {
  Box,
  Typography,
} from "@mui/material";

import { motion } from "framer-motion";

import SubCategoryStats from "../../components/subcategory/SubCategoryStats";
import SubCategoryToolbar from "../../components/subcategory/SubCategoryToolbar";
import SubCategoryTable from "../../components/subcategory/SubCategoryTable";
import AddSubCategoryDrawer from "../../components/subcategory/AddSubCategoryDrawer";

import {
  subscribeSubCategories,
  deleteSubCategory,
} from "../../services/subCategoryService";

import {
  subscribeCategories,
} from "../../services/categoryService";

export default function SubCategories() {
  /* ==========================================
      STATES
  ========================================== */

  const [subCategories, setSubCategories] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("all");

  const [status, setStatus] =
    useState("all");

  const [sort, setSort] =
    useState("latest");

  const [drawerOpen, setDrawerOpen] =
    useState(false);
    /* ==========================================
    FIREBASE
========================================== */

useEffect(() => {
  const unsubscribe =
    subscribeSubCategories((data) => {
      setSubCategories(data);
    });

  return unsubscribe;
}, []);

useEffect(() => {
  const unsubscribe =
    subscribeCategories((data) => {
      setCategories(data);
    });

  return unsubscribe;
}, []);
const handleDelete = async (
  item
) => {
  const confirmDelete =
    window.confirm(
      `Delete "${item.name}"?`
    );

  if (!confirmDelete) return;

  await deleteSubCategory(
    item.id,
    item.imagePath
  );
};
const handleEdit = (item) => {
  console.log(item);
};
/* ==========================================
    FILTERING
========================================== */

const filteredSubCategories = useMemo(() => {
  let data = [...subCategories];

  /* Search */

  data = data.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.name
        ?.toLowerCase()
        .includes(keyword) ||
      item.description
        ?.toLowerCase()
        .includes(keyword) ||
      item.categoryName
        ?.toLowerCase()
        .includes(keyword)
    );
  });

  /* Parent Category */

  if (category !== "all") {
    data = data.filter(
      (item) => item.categoryId === category
    );
  }

  /* Status */

  if (status !== "all") {
    data = data.filter((item) =>
      status === "active"
        ? item.status
        : !item.status
    );
  }

  /* Sorting */

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
      data.reverse();
      break;

    default:
      break;
  }

  return data;
}, [
  subCategories,
  search,
  category,
  status,
  sort,
]);
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
      duration: .35,
    }}
  >
    <Box>

      {/* Header */}

      <Box mb={5}>

        <Typography
          variant="h4"
          fontWeight={800}
        >
          Sub Categories
        </Typography>

        <Typography
          color="text.secondary"
          mt={1}
        >
          Organize products into
          structured sub categories.
        </Typography>

      </Box>

      {/* Stats */}

      <SubCategoryStats
        subCategories={subCategories}
      />

      {/* Toolbar */}

      <SubCategoryToolbar
        search={search}
        setSearch={setSearch}

        category={category}
        setCategory={setCategory}

        categories={categories}

        status={status}
        setStatus={setStatus}

        sort={sort}
        setSort={setSort}

        onAdd={() =>
          setDrawerOpen(true)
        }
      />
            {/* ==========================
          TABLE
      ========================== */}

      <SubCategoryTable
        subCategories={filteredSubCategories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* ==========================
          ADD DRAWER
      ========================== */}

      <AddSubCategoryDrawer
        open={drawerOpen}
        onClose={() =>
          setDrawerOpen(false)
        }
        onSuccess={() => {
          setDrawerOpen(false);
        }}
      />
    </Box>
  </motion.div>
);
}