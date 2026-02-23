// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwqpYQ8aGIu0OuNk32DxPvYpPgH5BsGFc",
  authDomain: "content-shield-cyzio.firebaseapp.com",
  projectId: "content-shield-cyzio",
  storageBucket: "content-shield-cyzio.firebasestorage.app",
  messagingSenderId: "160615821508",
  appId: "1:160615821508:web:4f6e7a9e1bca4706429991",
  measurementId: "G-60YJWGFHBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);