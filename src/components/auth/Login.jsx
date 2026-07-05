import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  EmailRounded,
  LockRounded,
  LoginRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

import "./Login.css";

export default function Login() {
    const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [rememberMe, setRememberMe] = useState(true);

const [showPassword, setShowPassword] = useState(false);

const [loading, setLoading] = useState(false);

const [error, setError] = useState("");

const [success, setSuccess] = useState("");
const handleLogin = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  if (!email.trim()) {
    setError("Email is required.");
    return;
  }

  if (!password.trim()) {
    setError("Password is required.");
    return;
  }

  try {
    setLoading(true);

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    setSuccess("Login Successful!");

    setTimeout(() => {
      navigate("/dashboard");
    }, 800);

  } catch (err) {

    switch (err.code) {
      case "auth/user-not-found":
        setError("User not found.");
        break;

      case "auth/wrong-password":
        setError("Incorrect password.");
        break;

      case "auth/invalid-email":
        setError("Invalid email address.");
        break;

      case "auth/too-many-requests":
        setError("Too many attempts. Try again later.");
        break;

      default:
        setError(err.message);
    }

  } finally {
    setLoading(false);
  }
};
const handleCloseSnackbar = () => {
  setError("");
  setSuccess("");
};
return (
  <Box className="login-page">
    <Box className="login-overlay" />

    <Box className="login-container">
      <Box className="login-card">
        {/* LEFT SIDE */}

        <Box className="login-left">
          <Typography className="logo-title">
            RetailPOS
          </Typography>

          <Typography className="logo-subtitle">
            Modern Cloud POS for Clothing Stores
          </Typography>
<Box className="dashboard-preview">

  <Box className="preview-card">
    <Typography className="preview-title">
      Today's Sales
    </Typography>

    <Typography className="preview-value">
      ₹48,560
    </Typography>
  </Box>

  <Box className="preview-row">

    <Box className="small-card">
      <Typography className="small-label">
        Orders
      </Typography>

      <Typography className="small-value">
        126
      </Typography>
    </Box>

    <Box className="small-card">
      <Typography className="small-label">
        Products
      </Typography>

      <Typography className="small-value">
        2,845
      </Typography>
    </Box>

  </Box>

  <Box className="graph-card">

    <Typography className="graph-title">
      Weekly Revenue
    </Typography>

    <Box className="graph-bars">

      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>

    </Box>

  </Box>

</Box>

<Typography className="left-bottom-text">
  Built for modern clothing retailers.
</Typography>
        </Box>

        {/* RIGHT SIDE */}

        <Box
          component="form"
          className="login-right"
          onSubmit={handleLogin}
        >
          <Typography className="welcome-title">
            Welcome Back 👋
          </Typography>

          <Typography className="welcome-subtitle">
            Login to continue managing your business.
          </Typography>

          <Stack spacing={3} mt={4}>
            {error && (
              <Alert severity="error">
                {error}
              </Alert>
            )}

            {/* EMAIL */}

            <TextField
              fullWidth
              variant="outlined"
              label="Email Address"
              type="email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailRounded />
                  </InputAdornment>
                ),
              }}
            />

            {/* PASSWORD */}

            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRounded />
                  </InputAdornment>
                ),

                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                  />
                }
                label="Remember Me"
              />

              <Typography
                className="forgot-password"
              >
                Forgot Password?
              </Typography>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="login-button"
              startIcon={
                !loading && <LoginRounded />
              }
              disabled={loading}
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  color="inherit"
                />
              ) : (
                "Sign In"
              )}
            </Button>

            <Typography
              align="center"
              color="text.secondary"
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="signup-link"
              >
                Create Account
              </Link>
            </Typography>

            <Box
              sx={{
                mt: 1,
                p: 2,
                borderRadius: "16px",
                background:
                  "rgba(99,102,241,.08)",
                border:
                  "1px solid rgba(99,102,241,.15)",
              }}
            >
              <Typography
                variant="body2"
                textAlign="center"
                color="text.secondary"
              >
                🔒 Your store data is securely
                encrypted with Firebase.
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>

    <Snackbar
      open={Boolean(error)}
      autoHideDuration={4000}
      onClose={handleCloseSnackbar}
    >
      <Alert
        severity="error"
        variant="filled"
      >
        {error}
      </Alert>
    </Snackbar>
  </Box>
);
}