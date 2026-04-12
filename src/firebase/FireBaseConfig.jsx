import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "authexample-19c32.firebaseapp.com",
  projectId: "authexample-19c32",
  storageBucket: "authexample-19c32.firebasestorage.app",
  messagingSenderId: "621589089847",
  appId: "1:621589089847:web:f03c45ee3010416c8af9b2",
  measurementId: "G-Q0Q7Y37G0B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth= getAuth(app);