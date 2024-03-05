// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogpost-2364f.firebaseapp.com",
  projectId: "blogpost-2364f",
  storageBucket: "blogpost-2364f.appspot.com",
  messagingSenderId: "1057694275415",
  appId: "1:1057694275415:web:3488600441ca4c81a6d012",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
