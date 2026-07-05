import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import {
  CloseRounded,
  CloudUploadRounded,
  SaveRounded,
} from "@mui/icons-material";

import { motion } from "framer-motion";

import {
  addCategory,
  uploadCategoryImage,
} from "../../services/categoryService";

export default function AddCategoryDrawer({
  open,
  onClose,
  onSuccess,
}) {
  /* ===========================================
      STATES
  =========================================== */

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [image, setImage] =
    useState(null);

  const [imageFile, setImageFile] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: true,
  });

  /* ===========================================
      IMAGE PICKER
  =========================================== */

  const handleImage = (e) => {
    if (!e.target.files.length) return;

    const file = e.target.files[0];

    setImageFile(file);

    setImage(
      URL.createObjectURL(file)
    );
  };

  /* ===========================================
      FORM CHANGE
  =========================================== */

  const handleChange = (
    key,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /* ===========================================
      RESET FORM
  =========================================== */

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      status: true,
    });

    setImage(null);

    setImageFile(null);

    setError("");

    setSuccess("");
  };

  /* ===========================================
      CLOSE
  =========================================== */

  const handleClose = () => {
    if (loading) return;

    resetForm();

    onClose();
  };

  /* ===========================================
      SAVE CATEGORY
      (Part 2)
  =========================================== */

/* ===========================================
    SAVE CATEGORY
=========================================== */

const handleSaveCategory = async () => {
  try {
    setError("");
    setSuccess("");

    // Validation
    if (!form.name.trim()) {
      setError("Category name is required.");
      return;
    }

    if (!form.description.trim()) {
      setError("Category description is required.");
      return;
    }

   

    setLoading(true);

    /* -----------------------------
       Upload Image
    ----------------------------- */
let imageUrl = null;
let imagePath = null;

if (imageFile) {
  const uploadResult = await uploadCategoryImage(imageFile);

  imageUrl = uploadResult.imageUrl;
  imagePath = uploadResult.imagePath;
}

    /* -----------------------------
       Create Slug
    ----------------------------- */

    const slug = form.name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    /* -----------------------------
       Save Firestore
    ----------------------------- */

   await addCategory({
  name: form.name.trim(),

  slug,

  description: form.description.trim(),

  image: imageUrl,

  imagePath: imagePath,

  status: form.status,

  productCount: 0,
});

    setSuccess("Category added successfully.");

    resetForm();

    if (onSuccess) {
      await onSuccess();
    }

    setTimeout(() => {
      handleClose();
    }, 800);

  } catch (err) {
    console.error(err);

    setError(
      err.message ||
        "Something went wrong while saving the category."
    );
  } finally {
    setLoading(false);
  }
};

/* ===========================================
    SNACKBAR CLOSE
=========================================== */

const handleSnackbarClose = () => {
  setError("");
  setSuccess("");
};

  return (
  <>
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: 500,
          borderTopLeftRadius: 28,
          borderBottomLeftRadius: 28,
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
          }}
        >
          <Typography
            variant="h5"
            fontWeight={800}
          >
            Add Category
          </Typography>

          <IconButton
            onClick={handleClose}
            disabled={loading}
          >
            <CloseRounded />
          </IconButton>
        </Box>

        <Divider />

        {/* Body */}

        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            p: 3,
          }}
        >
          <Stack spacing={3}>
            {/* Upload */}

            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Box
                sx={{
                  height: 230,
                  border: "2px dashed #CBD5E1",
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  overflow: "hidden",
                  background: "#F8FAFC",
                }}
              >
                {image ? (
                  <img
                    src={image}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Box textAlign="center">
                    <CloudUploadRounded
                      sx={{
                        fontSize: 65,
                        color: "#5B5FEF",
                      }}
                    />

                    <Typography
                      mt={2}
                      fontWeight={700}
                    >
                      Click to Upload Image
                    </Typography>

                    <Typography
                      color="text.secondary"
                      fontSize={14}
                    >
                      JPG, PNG, WEBP
                    </Typography>
                  </Box>
                )}
              </Box>

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
            </motion.label>

            {/* Name */}

            <TextField
              label="Category Name"
              value={form.name}
              onChange={(e) =>
                handleChange(
                  "name",
                  e.target.value
                )
              }
            />

            {/* Description */}

           <TextField
  label="Description"
  multiline
  rows={4}
  fullWidth
  value={form.description}
  onChange={(e) =>
    setForm({
      ...form,
      description: e.target.value,
    })
  }
  InputLabelProps={{
    shrink: true,
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      alignItems: "flex-start",
      paddingTop: "12px",
    },

    "& .MuiOutlinedInput-inputMultiline": {
      padding: 0,
      color: "#111827",
      lineHeight: 1.6,
    },
  }}
/>

            {/* Status */}

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                fontWeight={700}
              >
                Active Category
              </Typography>

              <Switch
                checked={form.status}
                onChange={(e) =>
                  handleChange(
                    "status",
                    e.target.checked
                  )
                }
              />
            </Box>
          </Stack>
        </Box>

        <Divider />

        {/* Footer */}

        <Box
          sx={{
            p: 3,
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            fullWidth
            variant="contained"
            startIcon={
              loading ? null : <SaveRounded />
            }
            disabled={loading}
            onClick={handleSaveCategory}
          >
            {loading ? (
              <CircularProgress
                size={22}
                color="inherit"
              />
            ) : (
              "Save Category"
            )}
          </Button>
        </Box>
      </Box>
    </Drawer>

    {/* Success */}

    <Snackbar
      open={Boolean(success)}
      autoHideDuration={2500}
      onClose={handleSnackbarClose}
    >
      <Alert
        severity="success"
        variant="filled"
      >
        {success}
      </Alert>
    </Snackbar>

    {/* Error */}

    <Snackbar
      open={Boolean(error)}
      autoHideDuration={3500}
      onClose={handleSnackbarClose}
    >
      <Alert
        severity="error"
        variant="filled"
      >
        {error}
      </Alert>
    </Snackbar>
  </>
);
}