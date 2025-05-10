import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeI2NexrcJVt_C3L1BcoKnxaAsgXEar4U",
  authDomain: "ellm-project-4c108.firebaseapp.com",
  projectId: "ellm-project-4c108",
  storageBucket: "ellm-project-4c108.firebasestorage.app",
  messagingSenderId: "292213277717",
  appId: "1:292213277717:web:eaa8bd4780dcfad659ba1c",
  measurementId: "G-ZHK7LQT955"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Export the services you need
export { auth, db };