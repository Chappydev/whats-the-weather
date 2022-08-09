// Import the Sass file
import './styles.scss';

import { signInBtn, signOutBtn, userInfoDisplay } from './elements';
import { appendTo, makeElement } from './utility';

import { firebaseApp, analytics, auth, provider, db } from './firebase-config';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getRedirectResult, signInWithRedirect, signOut, onAuthStateChanged, OperationType } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";


const homePage = document.getElementById("home-page");
const header = document.querySelector('#header');
// const signInBtn = document.getElementById("sign-in-btn");
// const signOutBtn = document.getElementById("sign-out-btn");
const playBtn = document.querySelector("#play-btn");
const gameSection = document.getElementById("game");

onAuthStateChanged(auth, async (user) => {
  console.log(user);
  if (user) {
    // display user-only stuff on home page
    console.log(user.photoURL);
    console.log(user.email, user.displayName, user.photoURL);
    const headerSignIn = header.querySelector('#sign-in-btn');
    if (headerSignIn) {
      header.replaceChild(userInfoDisplay(user), headerSignIn);
    } else {
      header.appendChild(userInfoDisplay(user));
    }
    playBtn.removeAttribute("disabled");
    // TODO: make game-start button work when signed in

    // TODO: determine the appropriate if condition for this
    setDoc(doc(db, 'users', user.uid), {
      achievements: []
    })
    
  } else {
    // Only offer default info and encourage them to sign in
    const headerUserInfo = header.querySelector('#user-info');
    if (headerUserInfo) {
      header.replaceChild(signInBtn(), headerUserInfo);
    } else {
      header.appendChild(signInBtn());
    }
    gameSection.hidden = true;
    playBtn.setAttribute("disabled", "")
    // TODO: make game-start button NOT work when not signed in
  }
})