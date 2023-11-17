import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCsWKHK-LA7n8HK77HRiw-lNG50Q0NphLs",
  authDomain: "snapchat-clone-9b948.firebaseapp.com",
  projectId: "snapchat-clone-9b948",
  storageBucket: "snapchat-clone-9b948.appspot.com",
  messagingSenderId: "296117969730",
  appId: "1:296117969730:web:59212e3458477b2b079edb",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const provider = new GoogleAuthProvider(app);
