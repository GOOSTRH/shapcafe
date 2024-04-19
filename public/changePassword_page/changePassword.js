import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js';
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

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
const SendEmailBtn = document.getElementById('SendEmailBtn');

// Add event listener to the button

SendEmailBtn.addEventListener('click', function(event) {
    // Prevent default form submission behavior
    event.preventDefault();
    // Call your signup function
    ChangePW();
});

// Set up our register function, sign up function
function ChangePW(){
    
    // Getting all our input fields
    var email = document.getElementById('email').value;

    // Validate input fields
    if (!validate_email(email)){
        alert('Please enter your shap email address correctly');
        return;
    }

    showLoadingScreen();
        
    sendPasswordResetEmail(auth,email)
    .then(() => {
        console.log("Password reset email sent successfully!");
        alert("Email Sent");
        GoLogin();
    })
    .catch((error) => {
        hideLoadingScreen();
        console.error("Error sending password reset email:", error.message);
        console.error("Error code: ", error.code);
    });

}

function validate_email(email){
    if(email == "ShapCafeAdmin2024@proton.me") return true;
    let expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if(expression.test(email) == false ) return false;
    if(email.substr(email.length - 12) != "@shap.edu.ph" ) return false;
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

function GoLogin(){
    window.location.href = "../index.html";
}

window.addEventListener('DOMContentLoaded', function() {
    var mobileContent = document.getElementById('mobile-content');
    var pcContent = document.getElementById('pc-content');

    if (window.innerWidth <= 431) { // if window width is <= 431px
        // Display mobile content
        mobileContent.style.display = 'block';
        pcContent.style.display = 'none';
    } else { // if wider
        // Display PC content
        mobileContent.style.display = 'none';
        pcContent.style.display = 'block';
    }
});