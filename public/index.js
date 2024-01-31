import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js';
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

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
const loadingScreen = document.querySelector('.loading-screen');


const SignInBtn = document.getElementById('LoginBtn');

// Add event listener to the button

SignInBtn.addEventListener('click', function(event) {
    // Prevent default form submission behavior
    event.preventDefault();
    // Call your signup function
    signin();
});




// Set up our register function, sign up function
function signin(){
    
    // Getting all our input fields
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Validate input fields
    if (!validate_email(email)){
        alert('Please enter your shap email address correctly');
        return;
    } else if (!validate_password(password)){
        alert('Please enter a valid password (password must be at least 6 characters)');
        return;
    }

    showLoadingScreen();
    // Moving on to Auth
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // The user is signed in successfully
            const user = userCredential.user;
            const user_data = {
                last_login: Date.now()
            };

            // Save user data to the database
            update(ref(database, 'users/' + user.uid), user_data)
                .then(() => {
                    console.log('User data saved successfully');
                    GoHome();
                })
                .catch(error => {
                    hideLoadingScreen();
                    console.error('Error saving user data:', error);
                    alert('Error Loggin in user. Please try again later.');
                });
        })
        .catch((error) => {
            hideLoadingScreen();
            console.error('Error Sign in user:', error);
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/invalid-credential') {
                alert('Invalid Email, Please sign up before Logging in');
            } else if (errorCode == 'auth/internal-error') {
                alert('Internal Error, please try again later.');
            } else if (errorCode == 'auth/user-not-found') {
                alert('No user found.');
            } else  {
                alert(errorMessage);
            }
        });
}


function validate_email(email){

    let expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if(expression.test(email) == false ) return false;
    if(email.substr(email.length - 12) != "@shap.edu.ph" ) return false;
    if(email == "ShapCafeAdmin2024@proton.me") return true;
    return true;
}

function validate_password(password){
    // Firebase only accepts passwords over 6 characters
    if(password.length <= 6) return false;
    return true;
}

// Function to show the loading screen
function showLoadingScreen() {
    loadingScreen.classList.add('visible'); // Add the 'visible' class to show the loading screen
}

// Function to hide the loading screen
function hideLoadingScreen() {
    loadingScreen.classList.remove('visible'); // Remove the 'visible' class to hide the loading screen
}

const PswdToggleBtn = document.getElementById('ToggleBtn');

// Add event listener to the button

PswdToggleBtn.addEventListener('click', function(event) {
    // Prevent default form submission behavior
    event.preventDefault();
    // Call your signup function
    togglePasswordVisibility();
});


function togglePasswordVisibility() {
    var PswdField = document.getElementById("password");
    var ToggleBtnImg = document.getElementById("ToggleIcon");
  
    if (PswdField.type === "password") {
        PswdField.type = "text";
        ToggleBtnImg = "shown.png";
    } else {
        PswdField.type = "password";
        ToggleBtnImg = "hidden.png";
    }
}


function GoHome(){
    window.location.href = "/home_page/home.html";
}