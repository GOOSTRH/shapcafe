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
      const dbUserRef = ref(database, 'users/' + user.uid + '/user');
      onValue(dbUserRef, (snapshot) => {
        console.log("user permission:"+snapshot.val());
        if(snapshot.val() == "admin"){ // if the user is admin, send him the to the admin pages
        }else{
          window.location.href = "../index.html";
        }
      });

      // initialize a const value for refing the users last login
      const dbLastLoginRef = ref(database, 'users/' + user.uid + '/last_login');
      onValue(dbLastLoginRef, (snapshot) => {
        // if last login history was 15 mins ago, send the user back to index.html
        // which means, log in again
        if(Date.now() - snapshot.val() > 900000){
            window.location.href = "../index.html"
        }
      });
    } else {
      console.log("User is logged out");
      window.location.href = "../index.html";
      return;
    }
});