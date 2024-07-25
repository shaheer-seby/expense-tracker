'use client';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNJQespU4EstOYhShiT1o2TqiVrute0HA",
  authDomain: "expense-tracker-nextjs-2952e.firebaseapp.com",
  projectId: "expense-tracker-nextjs-2952e",
  storageBucket: "expense-tracker-nextjs-2952e.appspot.com",
  messagingSenderId: "106448447449",
  appId: "1:106448447449:web:3fe67d94fe1fe6a60edbc8",
  measurementId: "G-SFT4WN291J"
};

let app, analytics, db;

if (typeof window !== 'undefined') {
  // Initialize Firebase only on the client side
  app = initializeApp(firebaseConfig);

  if (app.name && typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }

  db = getFirestore(app);
}

export { db, collection, getDocs, addDoc, deleteDoc, doc };
