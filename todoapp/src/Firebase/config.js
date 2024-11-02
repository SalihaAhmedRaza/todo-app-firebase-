// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB9tGkY9dwy5BKOLS65v_Jl89SqILe8U-8",
//   authDomain: "todoapp-firebase-92e37.firebaseapp.com",
//   projectId: "todoapp-firebase-92e37",
//   storageBucket: "todoapp-firebase-92e37.firebasestorage.app",
//   messagingSenderId: "667750159708",
//   appId: "1:667750159708:web:1844bfffd1eeede02edd99",
//   measurementId: "G-07904VGWZC"
// };

// // Initialize Firebase




// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app)



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import for Firebase Auth
import { getFirestore } from "firebase/firestore"; // Import for Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9tGkY9dwy5BKOLS65v_Jl89SqILe8U-8",
  authDomain: "todoapp-firebase-92e37.firebaseapp.com",
  projectId: "todoapp-firebase-92e37",
  storageBucket: "todoapp-firebase-92e37.appspot.com",
  messagingSenderId: "667750159708",
  appId: "1:667750159708:web:1844bfffd1eeede02edd99",
  measurementId: "G-07904VGWZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
