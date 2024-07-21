import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "akdeliveryapp.firebaseapp.com",
  projectId: "akdeliveryapp",
  storageBucket: "akdeliveryapp.appspot.com",
  messagingSenderId: "79761871165",
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: "G-YED14H6BL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();