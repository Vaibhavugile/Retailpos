import { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  MenuItem,
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
  addSubCategory,
  uploadSubCategoryImage,
} from "../../services/subCategoryService";

import {
  subscribeCategories,
} from "../../services/categoryService";

export default function AddSubCategoryDrawer({
  open,
  onClose,
  onSuccess,
}) {
  /* ===========================
      STATES
  =========================== */

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [categories, setCategories] =
    useState([]);

  const [image, setImage] =
    useState(null);

  const [imageFile, setImageFile] =
    useState(null);

  const [form, setForm] = useState({
    categoryId: "",
    categoryName: "",
    name: "",
    description: "",
    status: true,
  });
  useEffect(() => {
  const unsubscribe =
    subscribeCategories((list) => {
      setCategories(list);
    });

  return unsubscribe;
}, []);
const handleImage = (e) => {
  if (!e.target.files.length) return;

  const file = e.target.files[0];

  setImageFile(file);

  setImage(
    URL.createObjectURL(file)
  );
};
const handleChange = (
  key,
  value
) => {
  setForm((prev) => ({
    ...prev,
    [key]: value,
  }));
};
const resetForm = () => {
  setForm({
    categoryId: "",
    categoryName: "",
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
    SAVE SUB CATEGORY
=========================================== */

const handleSaveSubCategory = async () => {
  try {
    setError("");
    setSuccess("");

    if (!form.categoryId) {
      setError("Please select a parent category.");
      return;
    }

    if (!form.name.trim()) {
      setError("Sub Category name is required.");
      return;
    }

    if (!form.description.trim()) {
      setError("Description is required.");
      return;
    }

    setLoading(true);

    let imageUrl = null;
    let imagePath = null;

    if (imageFile) {
      const upload =
        await uploadSubCategoryImage(imageFile);

      imageUrl = upload.imageUrl;
      imagePath = upload.imagePath;
    }

    const slug = form.name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    await addSubCategory({
      categoryId: form.categoryId,
      categoryName: form.categoryName,

      name: form.name.trim(),
      slug,

      description:
        form.description.trim(),

      image: imageUrl,
      imagePath,

      status: form.status,

      productCount: 0,
    });

    setSuccess(
      "Sub Category added successfully."
    );

    resetForm();

    if (onSuccess) {
      await onSuccess();
    }

    setTimeout(() => {
      onClose();
    }, 700);
  } catch (err) {
    console.error(err);

    setError(
      err.message ||
        "Unable to save sub category."
    );
  } finally {
    setLoading(false);
  }
};

/* ===========================================
    SNACKBAR
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
      onClose={onClose}
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
        {/* ================= HEADER ================= */}

        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={800}
          >
            Add Sub Category
          </Typography>

          <IconButton onClick={onClose}>
            <CloseRounded />
          </IconButton>
        </Box>

        <Divider />

        {/* ================= BODY ================= */}

        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            p: 3,
          }}
        >
          <Stack spacing={3}>
            {/* IMAGE */}

            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Box
                sx={{
                  height: 220,
                  borderRadius: "22px",
                  border: "2px dashed #CBD5E1",
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
                        fontSize: 60,
                        color: "#5B5FEF",
                      }}
                    />

                    <Typography
                      mt={2}
                      fontWeight={700}
                    >
                      Upload Image (Optional)
                    </Typography>

                    <Typography
                      fontSize={13}
                      color="text.secondary"
                    >
                      JPG • PNG • WEBP
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

            {/* PARENT CATEGORY */}

            <TextField
              select
              label="Parent Category"
              value={form.categoryId}
              onChange={(e) => {
                const selected =
                  categories.find(
                    (c) =>
                      c.id === e.target.value
                  );

                setForm({
                  ...form,
                  categoryId: selected?.id || "",
                  categoryName:
                    selected?.name || "",
                });
              }}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </MenuItem>
              ))}
            </TextField>

            {/* SUB CATEGORY NAME */}

            <TextField
              label="Sub Category Name"
              value={form.name}
              onChange={(e) =>
                handleChange(
                  "name",
                  e.target.value
                )
              }
            />

            {/* DESCRIPTION */}

            <TextField
              multiline
              rows={4}
              label="Description"
              value={form.description}
              onChange={(e) =>
                handleChange(
                  "description",
                  e.target.value
                )
              }
            />

            {/* STATUS */}

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                fontWeight={700}
              >
                Active Sub Category
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
    disabled={loading}
    onClick={onClose}
  >
    Cancel
  </Button>

  <Button
    fullWidth
    variant="contained"
    disabled={loading}
    startIcon={
      loading ? null : <SaveRounded />
    }
    onClick={handleSaveSubCategory}
  >
    {loading ? (
      <CircularProgress
        size={22}
        color="inherit"
      />
    ) : (
      "Save Sub Category"
    )}
  </Button>
</Box>
</Box>
</Drawer>
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