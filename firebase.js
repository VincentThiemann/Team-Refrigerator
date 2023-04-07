// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjaQF5fyf85izyYBlUNfLGdUrSHShlybM",
    authDomain: "fir-auth-60b56.firebaseapp.com",
    projectId: "fir-auth-60b56",
    storageBucket: "fir-auth-60b56.appspot.com",
    messagingSenderId: "675071634893",
    appId: "1:675071634893:web:1358a051453765069f6884"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

export const auth = getAuth(app);
console.log("Auth from getAuth" + " " + auth);




