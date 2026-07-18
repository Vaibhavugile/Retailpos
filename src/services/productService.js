import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  getDoc,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { db, storage } from "../firebase";

const productsCollection = collection(
  db,
  "products"
);
/* ===========================================
    NEXT PRODUCT CODE
=========================================== */

export const getNextProductCode =
  async () => {
    const counterRef = doc(
      db,
      "productCounters",
      "main"
    );

    return await runTransaction(
      db,
      async (transaction) => {
        const snapshot =
          await transaction.get(counterRef);

        let current = 0;

        if (snapshot.exists()) {
          current =
            snapshot.data()
              .currentProductNumber || 0;
        }

        const next = current + 1;

        transaction.set(
          counterRef,
          {
            currentProductNumber: next,
          },
          {
            merge: true,
          }
        );

        return `P${String(next).padStart(
          6,
          "0"
        )}`;
      }
    );
  };
  /* ===========================================
    UPLOAD PRODUCT IMAGES
=========================================== */
/* ===========================================
    PREVIEW PRODUCT CODE
=========================================== */

export const getPreviewProductCode =
  async () => {
    const counterRef = doc(
      db,
      "productCounters",
      "main"
    );

    const snapshot = await getDoc(
      counterRef
    );

    let current = 0;

    if (snapshot.exists()) {
      current =
        snapshot.data()
          .currentProductNumber || 0;
    }

    const next = current + 1;

    return `P${String(next).padStart(
      6,
      "0"
    )}`;
  };
export const uploadProductImages = async (
  productCode,
  images = []
) => {
  // No Images
  if (!images.length) {
    return [];
  }

  const uploadedImages = [];

  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    // Ignore already uploaded images
    if (!image.file) continue;

    const extension =
      image.file.name.split(".").pop();

    const fileName =
      image.isCover
        ? `cover.${extension}`
        : `image-${i + 1}.${extension}`;

    const storageRef = ref(
      storage,
      `products/${productCode}/${fileName}`
    );

    await uploadBytes(
      storageRef,
      image.file
    );

    const downloadURL =
      await getDownloadURL(storageRef);

    uploadedImages.push({
      url: downloadURL,

      path: storageRef.fullPath,

      isCover: image.isCover,
    });
  }

  return uploadedImages;
};
/* ===========================================
    ADD PRODUCT
=========================================== */

export const addProduct = async (
  product
) => {
  try {
    /* ---------------------------------------
        Generate Product Code
    --------------------------------------- */

    const productCode =
      await getNextProductCode();

    /* ---------------------------------------
        Upload Images
    --------------------------------------- */

    const uploadedImages =
      await uploadProductImages(
        productCode,
        product.images || []
      );

    /* ---------------------------------------
        Update Variants
    --------------------------------------- */

    const variants = (
      product.variants || []
    ).map((variant, index) => {
      const variantCode = `${productCode}-${String(
        index + 1
      ).padStart(2, "0")}`;

      return {
        ...variant,

        id: variantCode,

        barcode: variantCode,

        sku: variantCode,

        productCode,
      };
    });

    /* ---------------------------------------
        Calculate Totals
    --------------------------------------- */

    const totalStock =
      variants.reduce(
        (sum, item) =>
          sum + Number(item.stock || 0),
        0
      );

    const totalVariants =
      variants.length;

    /* ---------------------------------------
        Slug
    --------------------------------------- */

    const slug =
      product.name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");

    /* ---------------------------------------
        Save Firestore
    --------------------------------------- */

    await setDoc(
      doc(
        db,
        "products",
        productCode
      ),
      {
        id: productCode,

        productCode,

        slug,

        name:
          product.name.trim(),

        description:
          product.description.trim(),

        categoryId:
          product.categoryId,

        categoryName:
          product.categoryName,

        subCategoryId:
          product.subCategoryId,

        subCategoryName:
          product.subCategoryName,

        images: uploadedImages,

        totalStock,

        totalVariants,

        variants,

        status: "active",

        createdAt:
          serverTimestamp(),

        updatedAt:
          serverTimestamp(),
      }
    );

    return productCode;

  } catch (error) {

    console.error(error);

    throw error;

  }
};
/* ===========================================
    SUBSCRIBE PRODUCTS
=========================================== */

export const subscribeProducts = (
  callback
) => {
  const q = query(
    productsCollection,
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const products =
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      callback(products);
    },
    (error) => {
      console.error(error);
    }
  );
};
/* ===========================================
    UPDATE PRODUCT
=========================================== */

export const updateProduct = async (
  productId,
  data
) => {
  try {
    const variants =
      data.variants || [];

    const totalStock =
      variants.reduce(
        (sum, item) =>
          sum +
          Number(item.stock || 0),
        0
      );

    await updateDoc(
      doc(db, "products", productId),
      {
        ...data,

        totalStock,

        totalVariants:
          variants.length,

        updatedAt:
          serverTimestamp(),
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};
/* ===========================================
    DELETE PRODUCT
=========================================== */

export const deleteProduct = async (
  productId
) => {
  try {
    await deleteDoc(
      doc(db, "products", productId)
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};
