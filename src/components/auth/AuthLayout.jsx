import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#09090B 0%, #111827 45%, #312E81 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      {/* Background Glow */}
      <Box
        sx={{
          position: "absolute",
          width: 350,
          height: 350,
          bgcolor: "#6366F1",
          borderRadius: "50%",
          filter: "blur(140px)",
          opacity: 0.25,
          top: 80,
          left: 100,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          bgcolor: "#06B6D4",
          borderRadius: "50%",
          filter: "blur(140px)",
          opacity: 0.2,
          bottom: 80,
          right: 80,
        }}
      />

      <Card
        sx={{
          width: "100%",
          maxWidth: 1200,
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <Grid container>
          {/* Left Side */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 6,
              background:
                "linear-gradient(160deg,#4F46E5,#7C3AED,#06B6D4)",
            }}
          >
            <StorefrontRoundedIcon
              sx={{
                fontSize: 90,
                color: "#fff",
                mb: 3,
              }}
            />

            <Typography
              variant="h3"
              fontWeight="bold"
              color="white"
              textAlign="center"
            >
              RetailPOS
            </Typography>

            <Typography
              sx={{
                mt: 2,
                color: "rgba(255,255,255,.85)",
                textAlign: "center",
                maxWidth: 380,
                fontSize: 18,
              }}
            >
              Modern Cloud POS for Clothing Stores.
              Inventory, Billing, Barcode & Reports —
              all in one place.
            </Typography>
          </Grid>

          {/* Right Side */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: { xs: 3, md: 6 },
            }}
          >
            <Box width="100%" maxWidth={420}>
              <Stack spacing={1} mb={4}>
                <Typography variant="h4" fontWeight={700}>
                  {title}
                </Typography>

                <Typography color="text.secondary">
                  {subtitle}
                </Typography>
              </Stack>

              {children}
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}