import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import { db, storage } from "../firebase";

/* ===================================================
   COLLECTION
=================================================== */

const categoryCollection = collection(
  db,
  "categories"
);

/* ===================================================
   UPLOAD IMAGE
=================================================== */

export const uploadCategoryImage = async (
  file
) => {
  const fileName = `${Date.now()}-${file.name}`;

  const imageRef = ref(
    storage,
    `categories/${fileName}`
  );

  await uploadBytes(imageRef, file);

  const imageUrl =
    await getDownloadURL(imageRef);

  return {
    imageUrl,
    imagePath: imageRef.fullPath,
  };
};

/* ===================================================
   ADD CATEGORY
=================================================== */

export const addCategory = async (
  category
) => {
  return await addDoc(categoryCollection, {
    ...category,

    productCount: category.productCount ?? 0,

    createdAt: serverTimestamp(),

    updatedAt: serverTimestamp(),
  });
};

/* ===================================================
   REALTIME LISTENER
=================================================== */

export const subscribeCategories = (
  callback
) => {
  const q = query(
    categoryCollection,
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const categories = snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

    callback(categories);
  });
};

/* ===================================================
   GET ALL
=================================================== */

export const getCategories = async () => {
  const q = query(
    categoryCollection,
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/* ===================================================
   GET SINGLE CATEGORY
=================================================== */

export const getCategory = async (id) => {
  const snapshot = await getDoc(
    doc(db, "categories", id)
  );

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

/* ===================================================
   UPDATE CATEGORY
=================================================== */

export const updateCategory = async (
  id,
  data
) => {
  await updateDoc(
    doc(db, "categories", id),
    {
      ...data,

      updatedAt: serverTimestamp(),
    }
  );
};

/* ===================================================
   REPLACE CATEGORY IMAGE
=================================================== */

export const replaceCategoryImage =
  async (
    oldImagePath,
    newFile
  ) => {
    if (oldImagePath) {
      try {
        await deleteObject(
          ref(storage, oldImagePath)
        );
      } catch (e) {
        console.log(e);
      }
    }

    return await uploadCategoryImage(
      newFile
    );
  };

/* ===================================================
   DELETE CATEGORY
=================================================== */

export const deleteCategory = async (
  id,
  imagePath = ""
) => {
  try {
    if (imagePath) {
      await deleteObject(
        ref(storage, imagePath)
      );
    }
  } catch (e) {
    console.log(e);
  }

  await deleteDoc(
    doc(db, "categories", id)
  );
};