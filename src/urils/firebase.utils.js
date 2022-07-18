import { initializeApp } from "firebase/app";
import { 
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
 } from "firebase/auth";
 import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
 } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAc6hRTuRWkkIItCj50Zc_D5i6-ha9ZM64",
  authDomain: "crwn-clothing-db-2bf7b.firebaseapp.com",
  projectId: "crwn-clothing-db-2bf7b",
  storageBucket: "crwn-clothing-db-2bf7b.appspot.com",
  messagingSenderId: "101088123693",
  appId: "1:101088123693:web:3b056b0b8fc9e1eef951a4"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  
  if(!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
    console.log("🚀🚀🚀🚀🚀🚀🚀🚀 ~ file: firebase.utils.js ~ line 52 ~ createUserDocumentFromAuth ~ error", error.message)
    }
  }

  return userDocRef;
}