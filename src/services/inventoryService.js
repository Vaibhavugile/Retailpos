import {
  doc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

/**
 * Returns product document reference
 */
export const getProductRef = (productId) => {

  return doc(
    db,
    "products",
    productId
  );

};

/**
 * Returns inventory history document reference
 */
export const getInventoryHistoryRef = () => {

  return doc(
    collection(
      db,
      "inventoryHistory"
    )
  );

};

/**
 * Validates stock and prepares updated product.
 * Does NOT write to Firestore.
 */
export const prepareStockUpdate = (
  product,
  item
) => {

  const variants = [...product.variants];

  const variantIndex = variants.findIndex(
    (v) => v.id === item.variantId
  );

  if (variantIndex === -1) {

    throw new Error(
      `Variant "${item.variantName}" not found`
    );

  }

  const variant = {

    ...variants[variantIndex],

  };

  if (variant.stock < item.qty) {

    throw new Error(
      `Insufficient stock for ${item.productName} (${item.variantName})`
    );

  }

  const stockBefore = variant.stock;

  variant.stock -= item.qty;

  const stockAfter = variant.stock;

  variants[variantIndex] = variant;

  const totalStock =
    (product.totalStock || 0) - item.qty;

  if (totalStock < 0) {

    throw new Error(
      `Invalid total stock for ${item.productName}`
    );

  }

  return {

    updatedProduct: {

      variants,

      totalStock,

    },

    history: {

      productId: item.productId,

      productCode: item.productCode,

      productName: item.productName,

      variantId: item.variantId,

      variantName: item.variantName,

      barcode: item.barcode,

      type: "SALE",

      quantity: item.qty,

      stockBefore,

      stockAfter,

      createdAt: serverTimestamp(),

    },

  };

};