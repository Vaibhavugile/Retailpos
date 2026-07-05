import {
  addDoc,
  collection,
  deleteDoc,
  doc,
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

/* ==========================================
   COLLECTION
========================================== */

const subCategoryCollection = collection(
  db,
  "subCategories"
);

/* ==========================================
   IMAGE UPLOAD (OPTIONAL)
========================================== */

export const uploadSubCategoryImage = async (
  file
) => {
  const fileName = `${Date.now()}-${file.name}`;

  const imageRef = ref(
    storage,
    `subCategories/${fileName}`
  );

  await uploadBytes(imageRef, file);

  const imageUrl =
    await getDownloadURL(imageRef);

  return {
    imageUrl,
    imagePath: imageRef.fullPath,
  };
};

/* ==========================================
   ADD SUB CATEGORY
========================================== */

export const addSubCategory = async (
  data
) => {
  return await addDoc(
    subCategoryCollection,
    {
      ...data,

      createdAt: serverTimestamp(),

      updatedAt: serverTimestamp(),
    }
  );
};

/* ==========================================
   REALTIME LISTENER
========================================== */

export const subscribeSubCategories = (
  callback
) => {
  const q = query(
    subCategoryCollection,
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const list = snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

    callback(list);
  });
};

/* ==========================================
   UPDATE
========================================== */

export const updateSubCategory =
  async (id, data) => {
    await updateDoc(
      doc(db, "subCategories", id),
      {
        ...data,
        updatedAt: serverTimestamp(),
      }
    );
  };

/* ==========================================
   DELETE
========================================== */

export const deleteSubCategory =
  async (id, imagePath) => {
    if (imagePath) {
      try {
        await deleteObject(
          ref(storage, imagePath)
        );
      } catch (err) {
        console.log(err);
      }
    }

    await deleteDoc(
      doc(db, "subCategories", id)
    );
  };