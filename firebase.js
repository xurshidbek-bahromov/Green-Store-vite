// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvNTQi8yhlwRfoTKbQ8OCvTHWZhinWE3E",
  authDomain: "green-shop-ac50b.firebaseapp.com",
  projectId: "green-shop-ac50b",
  storageBucket: "green-shop-ac50b.firebasestorage.app",
  messagingSenderId: "177944906183",
  appId: "1:177944906183:web:466063592c44405c0a71e2",
  measurementId: "G-P0XWHCMLQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

export { signInWithGoogle };
