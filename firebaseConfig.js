// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJFZCK6a6q9qoqgOVLhTVm-BqAGMWLnHQ",
  authDomain: "gasapp-811d2.firebaseapp.com",
  projectId: "gasapp-811d2",
  storageBucket: "gasapp-811d2.appspot.com",
  messagingSenderId: "690848410304",
  appId: "1:690848410304:web:f7ad7583cf035a7ced1b25",
  measurementId: "G-85957D5YLY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };