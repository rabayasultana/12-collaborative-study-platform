// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3__1UZrzWGBbQglo6MeNJHJ0b6BDlsP8",
  authDomain: "collaborative-study-platfrm.firebaseapp.com",
  projectId: "collaborative-study-platfrm",
  storageBucket: "collaborative-study-platfrm.appspot.com",
  messagingSenderId: "28211580438",
  appId: "1:28211580438:web:d82db1df1c8c66cd58af37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;