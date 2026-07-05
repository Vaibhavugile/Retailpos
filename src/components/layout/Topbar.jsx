import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Avatar,
  Badge,
} from "@mui/material";

import {
  MenuRounded,
  SearchRounded,
  NotificationsNoneRounded,
  DarkModeOutlined,
  KeyboardCommandKeyRounded,
  ExpandMoreRounded,
} from "@mui/icons-material";

import "./Topbar.css";

export default function Topbar({
  title = "Dashboard",
  subtitle = "",
  onMenuClick,
}) {
  return (
    <Box className="topbar-wrapper">

      {/* Left */}

      <Box className="topbar-left">

        <IconButton
          className="menu-btn"
          onClick={onMenuClick}
        >
          <MenuRounded />
        </IconButton>

        <Box>

          <Typography className="page-title">
            {title}
          </Typography>

          {subtitle && (
            <Typography className="page-subtitle">
              {subtitle}
            </Typography>
          )}

        </Box>

      </Box>

      {/* Center */}

      <Box className="search-box">

        <TextField
          fullWidth
          placeholder="Search products, categories..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded />
              </InputAdornment>
            ),

            endAdornment: (
              <Box className="search-shortcut">
                <KeyboardCommandKeyRounded
                  sx={{ fontSize: 15 }}
                />

                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  K
                </Typography>
              </Box>
            ),
          }}
        />

      </Box>

      {/* Right */}

      <Box className="topbar-right">

        <IconButton className="top-icon">

          <Badge
            badgeContent={3}
            color="primary"
          >
            <NotificationsNoneRounded />
          </Badge>

        </IconButton>

        <IconButton className="top-icon">
          <DarkModeOutlined />
        </IconButton>

        <Box className="profile-box">

          <Avatar
            src="https://i.pravatar.cc/100"
            sx={{
              width: 42,
              height: 42,
            }}
          />

          <Box>

            <Typography
              className="profile-name"
            >
              Admin User
            </Typography>

            <Typography
              className="profile-role"
            >
              Super Admin
            </Typography>

          </Box>

          <ExpandMoreRounded />

        </Box>

      </Box>

    </Box>
  );
}