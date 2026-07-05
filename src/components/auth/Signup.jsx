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
  MenuItem,
} from "@mui/material";

import {
  PersonRounded,
  EmailRounded,
  LockRounded,
  BadgeRounded,
  Visibility,
  VisibilityOff,
  PersonAddRounded,
} from "@mui/icons-material";

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "../../firebase";

import { signOut } from "firebase/auth";

import "./Login.css";
export default function Signup() {
    const navigate = useNavigate();
const [loading, setLoading] = useState(false);

const [showPassword, setShowPassword] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);

const [error, setError] = useState("");
const [success, setSuccess] = useState("");

const [form, setForm] = useState({
  fullName: "",
  email: "",
  role: "cashier",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
});

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

const handleSignup = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  if (!form.fullName.trim()) {
    setError("Full name is required.");
    return;
  }

  if (!form.email.trim()) {
    setError("Email is required.");
    return;
  }

  if (!form.password.trim()) {
    setError("Password is required.");
    return;
  }

  if (form.password.length < 6) {
    setError("Password must be at least 6 characters.");
    return;
  }

  if (form.password !== form.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  if (!form.acceptTerms) {
    setError("Please accept Terms & Conditions.");
    return;
  }

  try {
    setLoading(true);

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

    const user = userCredential.user;

    await updateProfile(user, {
      displayName: form.fullName,
    });

    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        fullName: form.fullName,
        email: form.email,

        role: form.role,

        status: "active",

        createdAt: serverTimestamp(),
      }
    );

    // For development only:
    // Sign out immediately so the user goes back to Login.

    await signOut(auth);

    setSuccess("Account created successfully.");

    setTimeout(() => {
      navigate("/login");
    }, 1500);

  } catch (err) {

    switch (err.code) {

      case "auth/email-already-in-use":
        setError("Email already exists.");
        break;

      case "auth/invalid-email":
        setError("Invalid email address.");
        break;

      case "auth/weak-password":
        setError("Password is too weak.");
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
        {/* LEFT PANEL */}

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
                New Store Setup
              </Typography>

              <Typography className="preview-value">
                Create Your Account
              </Typography>
            </Box>

            <Box className="preview-row">
              <Box className="small-card">
                <Typography className="small-label">
                  Inventory
                </Typography>

                <Typography className="small-value">
                  Ready
                </Typography>
              </Box>

              <Box className="small-card">
                <Typography className="small-label">
                  Billing
                </Typography>

                <Typography className="small-value">
                  Ready
                </Typography>
              </Box>
            </Box>

            <Box className="graph-card">
              <Typography className="graph-title">
                Cloud Based POS
              </Typography>

              <Typography
                sx={{
                  opacity: .85,
                  lineHeight: 1.8,
                }}
              >
                Secure inventory management, barcode generation,
                billing and reporting for your clothing store.
              </Typography>
            </Box>
          </Box>

          <Typography className="left-bottom-text">
            Inventory • Billing • Barcode • Reports
          </Typography>
        </Box>

        {/* RIGHT PANEL */}

        <Box
          component="form"
          className="login-right"
          onSubmit={handleSignup}
        >
          <Typography className="welcome-title">
            Create Account 🚀
          </Typography>

          <Typography className="welcome-subtitle">
            Create your RetailPOS account to get started.
          </Typography>

          <Stack spacing={3} mt={4}>
            {error && (
              <Alert severity="error">
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Full Name"
              value={form.fullName}
              onChange={(e) =>
                handleChange("fullName", e.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonRounded />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={form.email}
              onChange={(e) =>
                handleChange("email", e.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailRounded />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              select
              label="Role"
              value={form.role}
              onChange={(e) =>
                handleChange("role", e.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeRounded />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="cashier">
                Cashier
              </MenuItem>

              <MenuItem value="manager">
                Manager
              </MenuItem>

              <MenuItem value="admin">
                Admin
              </MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) =>
                handleChange("password", e.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRounded />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
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

            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirm ? "text" : "password"}
              value={form.confirmPassword}
              onChange={(e) =>
                handleChange(
                  "confirmPassword",
                  e.target.value
                )
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRounded />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirm(!showConfirm)
                      }
                    >
                      {showConfirm ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={form.acceptTerms}
                  onChange={(e) =>
                    handleChange(
                      "acceptTerms",
                      e.target.checked
                    )
                  }
                />
              }
              label="I agree to the Terms & Conditions"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="login-button"
              disabled={loading}
              startIcon={
                !loading && <PersonAddRounded />
              }
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  color="inherit"
                />
              ) : (
                "Create Account"
              )}
            </Button>

            <Typography
              align="center"
              color="text.secondary"
            >
              Already have an account?{" "}
              <Link
                component={Link}
                to="/login"
                className="signup-link"
              >
                Sign In
              </Link>
            </Typography>
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

    <Snackbar
      open={Boolean(success)}
      autoHideDuration={3000}
      onClose={handleCloseSnackbar}
    >
      <Alert
        severity="success"
        variant="filled"
      >
        {success}
      </Alert>
    </Snackbar>
  </Box>
);
}