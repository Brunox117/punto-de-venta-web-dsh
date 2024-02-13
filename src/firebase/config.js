// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTGEgI8pwvk-yqtXXxJS9bw_vehYYg9dE",
  authDomain: "punto-de-venta-web-881ad.firebaseapp.com",
  projectId: "punto-de-venta-web-881ad",
  storageBucket: "punto-de-venta-web-881ad.appspot.com",
  messagingSenderId: "952646252701",
  appId: "1:952646252701:web:05321a8d753083cfcfbc74",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
//!! export const FirebaseAuth = getAuth(FirebaseApp); SI QUEREMOS USAR AUTENTICACION CON ESTO SE HACE
export const FirebaseDB = getFirestore(FirebaseApp);
