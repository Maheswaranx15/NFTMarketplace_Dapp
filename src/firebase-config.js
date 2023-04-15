// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvWRPd4QbYC35FiVMpGF3D7hhXhMRPIAA",
  authDomain: "fir-e7755.firebaseapp.com",
  databaseURL: "https://fir-e7755.firebaseio.com",
  projectId: "fir-e7755",
  storageBucket: "fir-e7755.appspot.com",
  messagingSenderId: "215940572194",
  appId: "1:215940572194:web:d236208f32587dad93d67b",
  measurementId: "G-S5KBZ2C8L2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
