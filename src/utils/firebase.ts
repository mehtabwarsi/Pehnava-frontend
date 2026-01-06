// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA2caatQtHEbwir83fAvg94NbRrryAWMSY",
    authDomain: "pehnava-161d2.firebaseapp.com",
    projectId: "pehnava-161d2",
    storageBucket: "pehnava-161d2.firebasestorage.app",
    messagingSenderId: "240617368176",
    appId: "1:240617368176:web:37b010fa60fbea953762b5",
    measurementId: "G-DDXJ7FW4LC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export {
    auth,
    analytics
}