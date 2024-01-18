// firebase.js
// we can also use .env file to safe this api access
// but since it is an submiting project and you might try to rerun it , i.e why i am not changing the keys

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBL1vvcQ8LAExt93C2pko6gmc85X2gzz8M",
  authDomain: "alemenoproject-dac9d.firebaseapp.com",
  projectId: "alemenoproject-dac9d",
  storageBucket: "alemenoproject-dac9d.appspot.com",
  messagingSenderId: "645992371110",
  appId: "1:645992371110:web:b7f0f4489c00a426cc7567"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;

