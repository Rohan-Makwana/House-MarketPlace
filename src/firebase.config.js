// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL5YesfrwARCtc1YnC7r_5xBXU42bVqSs",
  authDomain: "react-house-marketplace-c9631.firebaseapp.com",
  projectId: "react-house-marketplace-c9631",
  storageBucket: "react-house-marketplace-c9631.appspot.com",
  messagingSenderId: "878427390158",
  appId: "1:878427390158:web:253e476a3988aa2176909f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();