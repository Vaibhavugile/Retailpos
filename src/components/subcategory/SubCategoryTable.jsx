import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  AddRounded,
  CategoryRounded,
  DeleteRounded,
  EditRounded,
  Inventory2Rounded,
  VisibilityRounded,
} from "@mui/icons-material";

export default function SubCategoryTable({
  subCategories = [],
  onEdit,
  onDelete,
}) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: "26px",
        overflow: "hidden",
        background: "#FFFFFF",

        border: "1px solid #EEF2F7",

        boxShadow:
          "0 20px 50px rgba(15,23,42,.06)",

        maxHeight: "72vh",

        "&::-webkit-scrollbar": {
          width: 8,
          height: 8,
        },

        "&::-webkit-scrollbar-thumb": {
          background: "#D8DDEA",
          borderRadius: 20,
        },
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                background: "#FFFFFF",

                fontWeight: 800,

                fontSize: 13,

                color: "#64748B",

                letterSpacing: ".08em",

                textTransform: "uppercase",

                borderBottom:
                  "1px solid #EEF2F7",

                py: 2.4,

                whiteSpace: "nowrap",
              },
            }}
          >
            <TableCell width={280}>
              Sub Category
            </TableCell>

            <TableCell width={220}>
              Parent Category
            </TableCell>

            <TableCell>
              Description
            </TableCell>

            <TableCell align="center">
              Products
            </TableCell>

            <TableCell align="center">
              Status
            </TableCell>

            <TableCell align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
            {subCategories.map((subCategory) => (
  <TableRow
    key={subCategory.id}
    sx={{
      transition: ".25s",

      "&:hover": {
        background: "#FAFBFF",
      },

      "& td": {
        py: 2.3,
        borderBottom: "1px solid #F3F4F6",
      },
    }}
  >
    {/* ===========================
        SUB CATEGORY
    =========================== */}

    <TableCell>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
      >
        <Avatar
          src={subCategory.image || undefined}
          variant="rounded"
          sx={{
            width: 58,
            height: 58,
            borderRadius: "18px",

            bgcolor: "#EEF2FF",
            color: "#5B5FEF",

            fontWeight: 700,

            border: "1px solid #EEF2F7",

            boxShadow:
              "0 8px 20px rgba(15,23,42,.08)",
          }}
        >
          {!subCategory.image &&
            subCategory.name
              ?.charAt(0)
              ?.toUpperCase()}
        </Avatar>

        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 16,
              color: "#111827",
            }}
          >
            {subCategory.name}
          </Typography>

          <Typography
            sx={{
              mt: .5,
              fontSize: 13,
              color: "#94A3B8",
            }}
          >
            ID :
            {" "}
            {subCategory.id.slice(0,8)}
          </Typography>
        </Box>
      </Stack>
    </TableCell>

    {/* ===========================
        PARENT CATEGORY
    =========================== */}

    <TableCell>

      <Chip
        icon={<CategoryRounded />}
        label={subCategory.categoryName}

        sx={{
          borderRadius: "12px",

          background: "#EEF2FF",

          color: "#5B5FEF",

          fontWeight: 700,

          px: 1,

          "& svg": {
            color: "#5B5FEF",
          },
        }}
      />

    </TableCell>

    {/* ===========================
        DESCRIPTION
    =========================== */}

    <TableCell>

      <Typography
        sx={{
          maxWidth: 330,

          color: "#64748B",

          lineHeight: 1.7,

          fontSize: 14,
        }}
      >
        {subCategory.description || "-"}
      </Typography>

    </TableCell>

    {/* ===========================
        PRODUCTS
    =========================== */}

    <TableCell align="center">

      <Chip
        icon={<Inventory2Rounded />}
        label={
          subCategory.productCount || 0
        }

        sx={{
          borderRadius: "12px",

          background: "#EEF2FF",

          color: "#5B5FEF",

          fontWeight: 700,

          "& svg": {
            color: "#5B5FEF",
          },
        }}
      />

    </TableCell>

    {/* ===========================
        STATUS
    =========================== */}

    <TableCell align="center">

      <Chip
        label={
          subCategory.status
            ? "Active"
            : "Inactive"
        }

        sx={{
          minWidth: 95,

          fontWeight: 700,

          borderRadius: "10px",

          background: subCategory.status
            ? "#ECFDF3"
            : "#FEF2F2",

          color: subCategory.status
            ? "#16A34A"
            : "#DC2626",
        }}
      />

    </TableCell>

    {/* ===========================
        ACTIONS
    =========================== */}

    <TableCell align="center">

      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
      >
        <Tooltip title="View">

          <IconButton
            sx={{
              background: "#F8FAFC",

              "&:hover": {
                background: "#EEF2FF",
              },
            }}
          >
            <VisibilityRounded />
          </IconButton>

        </Tooltip>

        <Tooltip title="Edit">

          <IconButton
            onClick={() =>
              onEdit(subCategory)
            }
            sx={{
              background: "#EEF2FF",

              color: "#5B5FEF",

              "&:hover": {
                background: "#DDE6FF",
              },
            }}
          >
            <EditRounded />
          </IconButton>

        </Tooltip>

        <Tooltip title="Delete">

          <IconButton
            onClick={() =>
              onDelete(subCategory)
            }
            sx={{
              background: "#FEF2F2",

              color: "#DC2626",

              "&:hover": {
                background: "#FEE2E2",
              },
            }}
          >
            <DeleteRounded />
          </IconButton>

        </Tooltip>
      </Stack>

    </TableCell>

  </TableRow>
))}
{subCategories.length === 0 && (
  <TableRow>
    <TableCell
      colSpan={6}
      sx={{
        py: 12,
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{
            width: 110,
            height: 110,
            borderRadius: "28px",

            background: "#EEF2FF",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            mb: 3,
          }}
        >
          <CategoryRounded
            sx={{
              fontSize: 60,
              color: "#5B5FEF",
            }}
          />
        </Box>

        <Typography
          fontSize={26}
          fontWeight={800}
        >
          No Sub Categories Found
        </Typography>

        <Typography
          mt={1}
          color="text.secondary"
          textAlign="center"
        >
          Create your first sub category
          under a parent category.
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddRounded />}
          sx={{
            mt: 4,
          }}
        >
          Add First Sub Category
        </Button>
      </Box>
    </TableCell>
  </TableRow>
)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}