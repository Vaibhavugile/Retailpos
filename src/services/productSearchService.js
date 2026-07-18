import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const productsRef = collection(db, "products");

export const searchProduct = async (searchText) => {

  const value = searchText.trim().toUpperCase();

  if (!value) return null;

  // Product Code
  if (!value.includes("-")) {

    const q = query(
      productsRef,
      where("productCode", "==", value)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    return {
      type: "product",
      product: {
        id: snapshot.docs[0].id,
        ...snapshot.docs[0].data(),
      },
    };
  }

  // Variant Code
  const productCode = value.split("-")[0];

  const q = query(
    productsRef,
    where("productCode", "==", productCode)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  const product = {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  };

  const variant = product.variants.find(
    (v) => v.id === value
  );

  if (!variant) return null;

  return {
    type: "variant",
    product,
    variant,
  };
};