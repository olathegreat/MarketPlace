// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyBt5X4VcxFur_70ADcp2izYY5B_cs6xyh0",
    authDomain: "tradecore-project.firebaseapp.com",
    projectId: "tradecore-project",
    storageBucket: "tradecore-project.appspot.com",
    messagingSenderId: "980355520465",
    appId: "1:980355520465:web:8de887ed5f1c3e71d532f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
