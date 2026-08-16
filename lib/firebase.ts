"use client";

// Firebase configuration & initialization (v9 modular) — same project as the
// original static site, so all existing Firestore data / Auth users keep working.
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updatePassword,
  type User,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFxri2DgFHOc5tprcWggyJfiaRrTsFBIs",
  authDomain: "portfoliowebsite-5a29a.firebaseapp.com",
  projectId: "portfoliowebsite-5a29a",
  storageBucket: "portfoliowebsite-5a29a.firebasestorage.app",
  messagingSenderId: "611577603088",
  appId: "1:611577603088:web:c30b1a9966b29e434a1695",
  measurementId: "G-3RCSQ65ZHK",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updatePassword,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
};
export type { User };
