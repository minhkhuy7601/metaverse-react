import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCrpBPHSoFBrdiqRqEdyQM3Jvrsy9SBhsE",
  authDomain: "test-e443f.firebaseapp.com",
  databaseURL:
    "https://test-e443f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-e443f",
  storageBucket: "test-e443f.appspot.com",
  messagingSenderId: "537268769176",
  appId: "1:537268769176:web:068bddc8328a1917c59bed",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
