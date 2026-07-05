import { initializeApp } from "firebase/app";
import {
  getFirestore,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDevhxaW0PrqBTVnJfVW4KfFD6yz1FCKpk",
  authDomain: "retailpos-395c0.firebaseapp.com",
  projectId: "retailpos-395c0",
  storageBucket: "retailpos-395c0.firebasestorage.app",
  messagingSenderId: "388846245935",
  appId: "1:388846245935:web:244fc13a690e24cfb2ceda",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };