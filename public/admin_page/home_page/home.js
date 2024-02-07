import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js';
import { getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD9MsZE2sTpVoBosSDcbyXPDdN79IlVUUM",
  authDomain: "shapcafe-eb9f5.firebaseapp.com",
  databaseURL: "https://shapcafe-eb9f5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shapcafe-eb9f5",
  storageBucket: "shapcafe-eb9f5.appspot.com",
  messagingSenderId: "59729342111",
  appId: "1:59729342111:web:8664c7357840a23ae3bcaa",
  measurementId: "G-CR7GGCCC30"
};

// Initializing firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

auth.onAuthStateChanged(function(user) {
    if (user) {
    console.log("User is logged in:", user);
  } else {
    console.log("User is logged out");
    return;
  }
});