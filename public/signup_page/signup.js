import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js';
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

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


const SignUpBtn = document.getElementById('RegisterBtn');

// Add event listener to the button

SignUpBtn.addEventListener('click', function(event) {
    // Prevent default form submission behavior
    event.preventDefault();
    // Call your signup function
    signup();
});


// Set up our register function, sign up function
function signup(){
    
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
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        if (!user.emailVerified) {
            hideLoadingScreen();
            // Send email verification
            sendEmailVerification(user)
            .then(() => {
                // Email verification sent
                console.log("Email verification sent to", email);
                alert("A verification email has been sent to your email address.\nPlease verify your email before logging in.");
                GoLogin();
            })
            .catch((error) => {
                console.error("Error sending email verification:", error.message);
                console.error("Error code: ", error.code);
            });

        }
    })
    .catch((error) => {
        hideLoadingScreen();
        console.error('Error creating user:', error);
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/weak-password') {
            alert('The password is too weak.');
        } else if (errorCode === 'auth/email-already-in-use') {
            alert('The email address is already in use.');
        } else {
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
        ToggleBtnImg = "../shown.png";
    } else {
        PswdField.type = "password";
        ToggleBtnImg = "../hidden.png";
    }
}


function GoLogin(){
    window.location.href = "../index.html";
}