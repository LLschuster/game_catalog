import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { config as firebaseConfig  } from "../firebaseconfig"

// Initialize Firebase
console.log("init firestore");
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db