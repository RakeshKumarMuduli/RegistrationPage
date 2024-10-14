
import { initializeApp } from "firebase/app";

import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB5EzIC5s2S90CiHVF8KAv0XZt_zZ5RxbI",
  authDomain: "registration-6d6a7.firebaseapp.com",
  projectId: "registration-6d6a7",
  storageBucket: "registration-6d6a7.appspot.com",
  messagingSenderId: "471124282294",
  appId: "1:471124282294:web:9c8f48f7c02e7f42f64f17",
  measurementId: "G-T4H0CGG21L"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth, RecaptchaVerifier, signInWithPhoneNumber };

