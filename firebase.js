// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
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
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()    

export {auth}