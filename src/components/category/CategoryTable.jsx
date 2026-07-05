import {
  Box,
  Avatar,
  Button,
  Chip,
  IconButton,
  Paper,
  Stack,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  AddRounded,
  DeleteRounded,
  EditRounded,
  Inventory2Rounded,
  VisibilityRounded,
} from "@mui/icons-material";

export default function CategoryTable({
  categories = [],
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

        "&::-webkit-scrollbar-track": {
          background: "transparent",
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
            <TableCell width={340}>
              Category
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
            {categories.map((category) => (
  <TableRow
    key={category.id}
    hover
    sx={{
      transition: "all .25s ease",

      "&:hover": {
        background: "#FAFBFF",
      },

      "& td": {
        py: 2.5,
        borderBottom: "1px solid #F3F4F6",
      },
    }}
  >
    {/* CATEGORY */}

    <TableCell>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
      >

       <Avatar
  src={category.image || undefined}
  variant="rounded"
  sx={{
    width: 58,
    height: 58,
    borderRadius: "18px",
  }}
>
  {!category.image && category.name?.charAt(0)?.toUpperCase()}
</Avatar>

        <Box>

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 16,
              color: "#111827",
            }}
          >
            {category.name}
          </Typography>

          <Typography
            sx={{
              mt: .5,
              fontSize: 13,
              color: "#94A3B8",
            }}
          >
            Created Recently
          </Typography>

        </Box>

      </Stack>

    </TableCell>

    {/* DESCRIPTION */}

    <TableCell>

      <Typography
        sx={{
          color: "#64748B",
          fontSize: 14,
          maxWidth: 360,
          lineHeight: 1.7,
        }}
      >
        {category.description || "-"}
      </Typography>

    </TableCell>

    {/* PRODUCTS */}

    <TableCell align="center">

      <Chip
        icon={<Inventory2Rounded />}
        label={`${category.productCount || 0} Products`}
        sx={{
          height: 38,
          px: 1,
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

    {/* STATUS */}

    <TableCell align="center">

      <Chip
        label={
          category.status
            ? "Active"
            : "Inactive"
        }
        sx={{
          minWidth: 100,
          height: 36,
          borderRadius: "10px",
          fontWeight: 700,

          background: category.status
            ? "#ECFDF3"
            : "#FEF2F2",

          color: category.status
            ? "#16A34A"
            : "#DC2626",
        }}
      />

    </TableCell>

    {/* ACTIONS */}

    <TableCell align="center">

      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
      >

        <Tooltip title="View">

          <IconButton
            sx={{
              width: 42,
              height: 42,
              borderRadius: "12px",
              background: "#F8FAFC",

              "&:hover": {
                background: "#EEF2FF",
              },
            }}
          >
            <VisibilityRounded fontSize="small" />
          </IconButton>

        </Tooltip>

        <Tooltip title="Edit">

          <IconButton
            onClick={() => onEdit(category)}
            sx={{
              width: 42,
              height: 42,
              borderRadius: "12px",
              background: "#EEF2FF",
              color: "#5B5FEF",

              "&:hover": {
                background: "#DDE6FF",
              },
            }}
          >
            <EditRounded fontSize="small" />
          </IconButton>

        </Tooltip>

        <Tooltip title="Delete">

          <IconButton
            onClick={() => onDelete(category)}
            sx={{
              width: 42,
              height: 42,
              borderRadius: "12px",
              background: "#FEF2F2",
              color: "#DC2626",

              "&:hover": {
                background: "#FEE2E2",
              },
            }}
          >
            <DeleteRounded fontSize="small" />
          </IconButton>

        </Tooltip>

      </Stack>

    </TableCell>

  </TableRow>
))}
{categories.length === 0 && (
  <TableRow>
    <TableCell
      colSpan={5}
      sx={{
        py: 12,
        borderBottom: "none",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: "32px",
            background:
              "linear-gradient(135deg,#EEF2FF,#F8FAFC)",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            mb: 4,

            boxShadow:
              "0 20px 45px rgba(91,95,239,.12)",
          }}
        >
          <Inventory2Rounded
            sx={{
              fontSize: 64,
              color: "#5B5FEF",
            }}
          />
        </Box>

        <Typography
          sx={{
            fontSize: 28,
            fontWeight: 800,
            color: "#111827",
          }}
        >
          No Categories Yet
        </Typography>

        <Typography
          sx={{
            mt: 1,
            mb: 4,
            color: "#6B7280",
            maxWidth: 420,
            textAlign: "center",
            lineHeight: 1.7,
          }}
        >
          Create your first category to organize products,
          inventory, billing and reports.
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddRounded />}
          sx={{
            height: 52,
            px: 4,
            borderRadius: "16px",
            fontWeight: 700,
          }}
        >
          Add First Category
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