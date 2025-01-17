// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDYtJCqMw2BNvFQ6QUqOmV5-aofq0Wo4oc",
  authDomain: "movieapp-baa92.firebaseapp.com",
  projectId: "movieapp-baa92",
  storageBucket: "movieapp-baa92.appspot.com",
  messagingSenderId: "380466957517",
  appId: "1:380466957517:web:63528a2cec2b3c254d6d84",
  measurementId: "G-S86P24QE1E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInWithEmailAndPassword };