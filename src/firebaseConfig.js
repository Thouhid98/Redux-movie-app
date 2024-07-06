// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOQmRMROGsNGBSYRRYbB1ObV-OCLwRbuk",
  authDomain: "movie-app-c6f35.firebaseapp.com",
  projectId: "movie-app-c6f35",
  storageBucket: "movie-app-c6f35.appspot.com",
  messagingSenderId: "787606064029",
  appId: "1:787606064029:web:dfcd2e444b0ced76d63d74",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
