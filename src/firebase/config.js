import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAM6CdQbN4fmcvV8bsl9VqeOEvBkqtNjMI",
  authDomain: "posts-562c5.firebaseapp.com",
  projectId: "posts-562c5",
  storageBucket: "posts-562c5.appspot.com",
  messagingSenderId: "1063331470076",
  appId: "1:1063331470076:web:6cc167a1dc363d90a81579",
  measurementId: "G-CFMZP020WM",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
