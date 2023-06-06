import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC84gFhptge3XFk8JF-OR_tplW9d_fpBx8",
  authDomain: "alumniconnect-fd233.firebaseapp.com",
  projectId: "alumniconnect-fd233",
  storageBucket: "alumniconnect-fd233.appspot.com",
  messagingSenderId: "820378945842",
  appId: "1:820378945842:web:aa985de11de88fe409af2b",
  measurementId: "G-4PDD2HPK94",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
