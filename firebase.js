// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
    keys
} from "./apiKeys"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: keys.FIREBASE_API_KEY,
    authDomain:  keys.FIREBASE_AUTH_DOMAIN,
    projectId:  keys.FIREBASE_PROJECT_ID,
    storageBucket:  keys.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: keys.FIREBASE_MESSENGER_SENDER_ID,
    appId: keys.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


