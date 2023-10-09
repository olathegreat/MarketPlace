// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyC43sfJTxnsTgHJFYT80qMJgptyVnXesCE",
    authDomain: "newtradecore.firebaseapp.com",
    projectId: "newtradecore",
    storageBucket: "newtradecore.appspot.com",
    messagingSenderId: "555724009407",
    appId: "1:555724009407:web:2cc6c4717612d2e471bb0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
