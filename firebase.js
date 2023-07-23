// // Import the functions you need from the SDKs you need

import { initializeApp, firebase, browserLocalPersistence } from "firebase/app";
import { getAuth, indexedDBLocalPersistence, setPersistence, getReactNativePersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyBB1eAQtEk5rXWotfmKUbNKgN4PujnVXDQ",
  authDomain: "smartfoodrecommendationsystem.firebaseapp.com",
  databaseURL:
    "https://smartfoodrecommendationsystem-default-rtdb.firebaseio.com",
  projectId: "smartfoodrecommendationsystem",
  storageBucket: "smartfoodrecommendationsystem.appspot.com",
  messagingSenderId: "297065963148",
  appId: "1:297065963148:web:52849f624e29ca5f6e25a9",
  measurementId: "G-X1TB3L5M5Q",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const storage = getStorage(app);
const realTimeDb = getDatabase(app);
const db = getFirestore(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export { auth };
export { storage };
export { db };
export { realTimeDb };
