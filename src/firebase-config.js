import { initializeApp } from "firebase/app";
import { browserSessionPersistence, getAuth, setPersistence } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore'
 
const firebaseConfig = {
  apiKey: "AIzaSyDVvKayR--YIBj-zaHK7gUCU1E4eF2VcuA",
  authDomain: "social-drawing-app-abbb1.firebaseapp.com",
  projectId: "social-drawing-app-abbb1",
  storageBucket: "social-drawing-app-abbb1.appspot.com",
  messagingSenderId: "575312364825",
  appId: "1:575312364825:web:29d9c50646154b8ec13188",
  measurementId: "G-B0GP0DKMEF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);
export const storage = getStorage(app);
export const database = getFirestore(app);