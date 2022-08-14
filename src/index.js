// Import the Sass file
import './styles.scss';

import { signInBtn, signOutBtn, userInfoDisplay } from './elements';
import { appendTo, makeElement } from './utility';

import { firebaseApp, analytics, auth, provider, db } from './firebase-config';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getRedirectResult, signInWithRedirect, signOut, onAuthStateChanged, OperationType } from "firebase/auth";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";


const homePage = document.getElementById("home-page");
const header = document.querySelector('#header');
// const signInBtn = document.getElementById("sign-in-btn");
// const signOutBtn = document.getElementById("sign-out-btn");
const playBtn = document.querySelector("#play-btn");
const gameSection = document.getElementById("game");
const endGameBtn = document.querySelector("#end-game");


const startGame = function(e) {
  e.preventDefault();

  homePage.hidden = true;
  gameSection.hidden = false;
}

const endGame = function(e) {
  e.preventDefault();

  gameSection.hidden = true;
  homePage.hidden = false;
}

let unsubFromUser = undefined;

endGameBtn.addEventListener('click', endGame);

onAuthStateChanged(auth, async (user) => {
  console.log(user);
  if (user) {
    // display user-only stuff on home page
    const headerSignIn = header.querySelector('#sign-in-btn');
    if (headerSignIn) {
      header.replaceChild(userInfoDisplay(user), headerSignIn);
    } else {
      header.appendChild(userInfoDisplay(user));
    }
    playBtn.addEventListener('click', startGame);
    playBtn.removeAttribute("disabled");
    // TODO: make game-start button work when signed in

    const userDocRef = doc(db, 'users', user.uid); 
    unsubFromUser = onSnapshot(userDocRef, (doc) => {
      console.log("Current data: ", doc.data());
      if (!doc.data()) {
        setDoc(userDocRef, {
          achievements: []
        });
      }
    })

  } else {
    // Only offer default info and encourage them to sign in
    if (unsubFromUser) {
      unsubFromUser();
    }
    const headerUserInfo = header.querySelector('#user-info');
    if (headerUserInfo) {
      header.replaceChild(signInBtn(), headerUserInfo);
    } else {
      header.appendChild(signInBtn());
    }
    gameSection.hidden = true;
    playBtn.removeEventListener('click', startGame);
    playBtn.setAttribute("disabled", "")
    // TODO: make game-start button NOT work when not signed in
  }
})