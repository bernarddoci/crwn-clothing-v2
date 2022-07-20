import { initializeApp } from "firebase/app";
import { 
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth, 
  additionalInformation = {}
) => {
  if(!userAuth) return;
  
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  
  if(!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (error) {
    console.log("🚀🚀🚀🚀🚀🚀🚀🚀 ~ file: firebase.utils.js ~ line 52 ~ createUserDocumentFromAuth ~ error", error.message)
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
} 

export const signInAuthWithEmailAndPassword = async(email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback);