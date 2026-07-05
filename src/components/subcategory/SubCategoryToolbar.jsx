import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";

import {
  AddRounded,
  CategoryRounded,
  FilterListRounded,
  SearchRounded,
  SortRounded,
} from "@mui/icons-material";

import { motion } from "framer-motion";

export default function SubCategoryToolbar({
  search,
  setSearch,

  category,
  setCategory,

  categories = [],

  status,
  setStatus,

  sort,
  setSort,

  onAdd,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        mb: 4,
      }}
    >
      {/* LEFT */}

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          flex: 1,
          minWidth: 320,
        }}
      >
                <TextField
          placeholder="Search sub category..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          sx={{
            width: 300,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded />
              </InputAdornment>
            ),
          }}
        />
                <TextField
          select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          sx={{
            width: 220,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CategoryRounded />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="all">
            All Categories
          </MenuItem>

          {categories.map((cat) => (
            <MenuItem
              key={cat.id}
              value={cat.id}
            >
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
  select
  value={status}
  onChange={(e) =>
    setStatus(e.target.value)
  }
  sx={{
    width: 180,
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <FilterListRounded />
      </InputAdornment>
    ),
  }}
>
  <MenuItem value="all">
    All Status
  </MenuItem>

  <MenuItem value="active">
    Active
  </MenuItem>

  <MenuItem value="inactive">
    Inactive
  </MenuItem>
</TextField>
<TextField
  select
  value={sort}
  onChange={(e) =>
    setSort(e.target.value)
  }
  sx={{
    width: 180,
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SortRounded />
      </InputAdornment>
    ),
  }}
>
  <MenuItem value="latest">
    Latest
  </MenuItem>

  <MenuItem value="oldest">
    Oldest
  </MenuItem>

  <MenuItem value="az">
    A - Z
  </MenuItem>

  <MenuItem value="za">
    Z - A
  </MenuItem>
</TextField>

</Box>
<motion.div
  whileHover={{
    scale: 1.03,
  }}
  whileTap={{
    scale: 0.97,
  }}
>
  <Button
    variant="contained"
    size="large"
    startIcon={<AddRounded />}
    onClick={onAdd}
    sx={{
      height: 56,
      px: 3.5,
      borderRadius: "18px",

      fontWeight: 700,

      background:
        "linear-gradient(135deg,#5B5FEF,#7C3AED)",

      boxShadow:
        "0 15px 35px rgba(91,95,239,.25)",

      "&:hover": {
        background:
          "linear-gradient(135deg,#4F46E5,#6D28D9)",

        boxShadow:
          "0 20px 45px rgba(91,95,239,.35)",
      },
    }}
  >
    Add Sub Category
  </Button>
</motion.div>

</Box>
);
}