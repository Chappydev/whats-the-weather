import './firebase-config'
import { appendTo, makeElement } from "./utility";

import { firebaseApp, analytics, auth, provider, db } from './firebase-config';

import { signInWithRedirect, signOut } from "firebase/auth";


export { signInBtn, signOutBtn, userInfoDisplay };




function signInBtn() {
  const btn = makeElement('button', 'Sign In', '.button', '#sign-in-btn');
  btn.addEventListener('click', async function(e) {
    await signInWithRedirect(auth, provider);
  });
  return btn;
}

function signOutBtn() {
  const btn = makeElement('button', 'Sign Out', '.button', '#sign-out-btn');
  btn.addEventListener('click', e => {
    signOut(auth);
  });
  return btn;
}

// TODO: add parameter(s) for data needed (display name, etc.)
//       and add that to the appropriate elements.
function userInfoDisplay() {
  return appendTo(
    makeElement('div', '', '#user-info'), 
      makeElement('div', '', '.display-name'), 
      signOutBtn()
  );
}