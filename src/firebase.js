// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "makemywebsite-ai.firebaseapp.com",
  projectId: "makemywebsite-ai",
  storageBucket: "makemywebsite-ai.firebasestorage.app",
  messagingSenderId: "578864185918",
  appId: "1:578864185918:web:f799c3464c96626439876f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };