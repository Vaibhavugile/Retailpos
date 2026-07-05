import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import {
  AddRounded,
  FilterListRounded,
  SearchRounded,
  SortRounded,
} from "@mui/icons-material";

import { motion } from "framer-motion";

export default function CategoryToolbar({
  search,
  setSearch,
  status,
  setStatus,
  sort,
  setSort,
  onAdd,
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        mb: 4,
        p: 2.5,
        borderRadius: "24px",
        border: "1px solid #EEF2F7",
        background: "#FFFFFF",
        boxShadow:
          "0 12px 35px rgba(15,23,42,.05)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {/* LEFT */}

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flex: 1,
            flexWrap: "wrap",
          }}
        >
          {/* SEARCH */}

          <TextField
            placeholder="Search categories..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            sx={{
              minWidth: 340,
              flex: 1,

              "& .MuiOutlinedInput-root": {
                height: 56,
                borderRadius: "16px",
                background: "#F8FAFC",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded
                    sx={{
                      color: "#5B5FEF",
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />

          {/* STATUS */}

          <TextField
            select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            sx={{
              width: 190,

              "& .MuiOutlinedInput-root": {
                height: 56,
                borderRadius: "16px",
                background: "#F8FAFC",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FilterListRounded
                    sx={{
                      color: "#5B5FEF",
                    }}
                  />
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

          {/* SORT */}

          <TextField
            select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            sx={{
              width: 190,

              "& .MuiOutlinedInput-root": {
                height: 56,
                borderRadius: "16px",
                background: "#F8FAFC",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SortRounded
                    sx={{
                      color: "#5B5FEF",
                    }}
                  />
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

        {/* RIGHT */}

        <motion.div
          whileHover={{
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.96,
          }}
        >
          <Button
            onClick={onAdd}
            variant="contained"
            startIcon={<AddRounded />}
            sx={{
              height: 56,
              minWidth: 200,
              borderRadius: "18px",
              fontSize: 16,
              fontWeight: 700,
              textTransform: "none",
              background:
                "linear-gradient(135deg,#5B5FEF,#7C3AED)",

              boxShadow:
                "0 15px 40px rgba(91,95,239,.30)",

              "&:hover": {
                background:
                  "linear-gradient(135deg,#4F46E5,#6D28D9)",

                transform: "translateY(-2px)",

                boxShadow:
                  "0 22px 45px rgba(91,95,239,.38)",
              },
            }}
          >
            Add Category
          </Button>
        </motion.div>
      </Box>

      <Box
        sx={{
          mt: 2,
          pt: 2,
          borderTop: "1px solid #EEF2F7",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            color: "#6B7280",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Manage and organize your clothing store categories.
        </Typography>

        <Typography
          sx={{
            color: "#5B5FEF",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          {search
            ? `Searching: "${search}"`
            : "Showing all categories"}
        </Typography>
      </Box>
    </Paper>
  );
}