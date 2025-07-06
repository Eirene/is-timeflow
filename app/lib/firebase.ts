import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDMIr5KCSUPub6XogT6gTFXUFrzr3eRD9Q",
    authDomain: "is-timeflow.firebaseapp.com",
    projectId: "is-timeflow",
    storageBucket: "is-timeflow.firebasestorage.app",
    messagingSenderId: "1006370744533",
    appId: "1:1006370744533:web:a289f81a787d99a714da5c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
