// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0_zFU_p3_MzGbZ1kO6Rn6bfh9Kg2rm6Q",
  authDomain: "whats-the-weather-d8e89.firebaseapp.com",
  projectId: "whats-the-weather-d8e89",
  storageBucket: "whats-the-weather-d8e89.appspot.com",
  messagingSenderId: "897486666796",
  appId: "1:897486666796:web:e0c4a58f8416ff954ce589",
  measurementId: "G-XMDWWCD72C"
};

// Initialize Firebase, Firebase auth, Firestore
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
export const auth = getAuth(firebaseApp);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(firebaseApp);