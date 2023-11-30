// Import the functions you need from the SDKs you need
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC6pnNASxVT27H9apAT-Nv8aOCD1WgFlOk",
    apiKey: "AIzaSyAvrRWyzD-B_l7KgEKXaRNc0u-BQCsEC84",
    authDomain: "pacientesrf-app.firebaseapp.com",
    projectId: "pacientesrf-app",
    storageBucket: "pacientesrf-app.appspot.com",
    messagingSenderId: "351537023959",
    appId: "1:351537023959:web:8f4d2ee09fc16864d79992"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);