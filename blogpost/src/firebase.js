// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
