import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwqPYQ8aGIuOUnk32DxPVyPpgH5BsGFc", //
  authDomain: "content-shield-cyzio.firebaseapp.com",
  projectId: "content-shield-cyzio",
  storageBucket: "content-shield-cyzio.firebasestorage.app",
  messagingSenderId: "160615821508",
  appId: "1:160615821508:web:4f6e7a9e1bca4706429991",
  measurementId: "G-60YJWGFHBM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();