// Import the Sass file
import './styles.scss';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getFirestore } from "firebase/firestore";

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

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);

console.log(firebaseApp);
console.log(auth);

const whenSignedIn = document.getElementById("whenSignedIn");
const whenSignedOut = document.getElementById("whenSignedOut");
const signInBtn = document.getElementById("signInBtn");
const signOutBtn = document.getElementById("signOutBtn");

const userDetails = document.getElementById("userDetails");


signInBtn.addEventListener('click', e => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  })
});