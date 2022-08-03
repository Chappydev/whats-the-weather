// Import the Sass file
import './styles.scss';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";
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

const whenSignedIn = document.getElementById("when-signed-in");
const whenSignedOut = document.getElementById("when-signed-out");
const signInBtn = document.getElementById("sign-in-btn");
const signOutBtn = document.getElementById("sign-out-btn");
const playBtn = document.querySelector("#play-btn");
const gameSection = document.getElementById("game");


// Sign-in with the sign-in button
signInBtn.addEventListener('click', e => {
  signInWithRedirect(auth, provider);
});

signOutBtn.addEventListener('click', e => {
  signOut(auth);
})

onAuthStateChanged(auth, user => {
  console.log(user);
  if (user) {
    // display user-only stuff on home page
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;
    playBtn.removeAttribute("disabled");
    // TODO: make game-start button work when signed in
  } else {
    // Only offer default info and encourage them to sign in
    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;
    gameSection.hidden = true;
    playBtn.setAttribute("disabled", "")
    // TODO: make game-start button NOT work when not signed in
  }
})