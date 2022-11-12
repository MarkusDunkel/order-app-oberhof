// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaKi25uBLWDbdBxHU6SmGIkyyoa-wG4Bg",
  authDomain: "order-app-oberhof-45720.firebaseapp.com",
  databaseURL: "https://order-app-oberhof-45720-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "order-app-oberhof-45720",
  storageBucket: "order-app-oberhof-45720.appspot.com",
  messagingSenderId: "941765695304",
  appId: "1:941765695304:web:3cf58c74ffe09d44a9c57d",
  measurementId: "G-3K0G784HZ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase(app);