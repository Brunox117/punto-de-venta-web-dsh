// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTGEgI8pwvk-yqtXXxJS9bw_vehYYg9dE",
  authDomain: "punto-de-venta-web-881ad.firebaseapp.com",
  projectId: "punto-de-venta-web-881ad",
  storageBucket: "punto-de-venta-web-881ad.appspot.com",
  messagingSenderId: "952646252701",
  appId: "1:952646252701:web:a381c27c26e3d85ccfbc74"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
export const FirebaseSTORAGE = getStorage(FirebaseApp);
