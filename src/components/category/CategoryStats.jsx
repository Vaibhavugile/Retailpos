import { Grid, Paper, Typography, Box } from "@mui/material";
import {
  CategoryRounded,
  CheckCircleRounded,
  Inventory2Rounded,
  BlockRounded,
} from "@mui/icons-material";
import { motion } from "framer-motion";

export default function CategoryStats({ categories = [] }) {
  const totalCategories = categories.length;

  const activeCategories = categories.filter(
    (c) => c.status === true
  ).length;

  const inactiveCategories = totalCategories - activeCategories;

  const totalProducts = categories.reduce(
    (total, category) =>
      total + (category.productCount || 0),
    0
  );

  const stats = [
    {
      title: "Total Categories",
      value: totalCategories,
      subtitle: "All Categories",
      icon: <CategoryRounded />,
      color: "#5B5FEF",
      bg: "#EEF2FF",
    },
    {
      title: "Active Categories",
      value: activeCategories,
      subtitle: "Currently Active",
      icon: <CheckCircleRounded />,
      color: "#16A34A",
      bg: "#ECFDF3",
    },
    {
      title: "Inactive Categories",
      value: inactiveCategories,
      subtitle: "Disabled",
      icon: <BlockRounded />,
      color: "#EF4444",
      bg: "#FEF2F2",
    },
    {
      title: "Products",
      value: totalProducts,
      subtitle: "Under Categories",
      icon: <Inventory2Rounded />,
      color: "#EA580C",
      bg: "#FFF7ED",
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {stats.map((item, index) => (
        <Grid
          key={index}
          size={{
            xs: 12,
            sm: 6,
            md: 6,
            lg: 3,
          }}
        >
          <motion.div
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "24px",
                height: 165,
                border: "1px solid #EEF2F7",
                background: "#FFF",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: ".3s",
                boxShadow:
                  "0 10px 35px rgba(15,23,42,.05)",

                "&:hover": {
                  boxShadow:
                    "0 20px 50px rgba(91,95,239,.12)",
                },
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: 14,
                    color: "#6B7280",
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 40,
                    fontWeight: 800,
                    color: "#111827",
                    lineHeight: 1,
                  }}
                >
                  {item.value}
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    color: "#9CA3AF",
                    fontSize: 13,
                  }}
                >
                  {item.subtitle}
                </Typography>
              </Box>

              <Box
                sx={{
                  width: 78,
                  height: 78,
                  borderRadius: "22px",
                  background: item.bg,
                  color: item.color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                  "& svg": {
                    fontSize: 38,
                  },
                }}
              >
                {item.icon}
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
}