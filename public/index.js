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
                    alert('User Logged in!');
                    GoHome();
                })
                .catch(error => {
                    console.error('Error saving user data:', error);
                    alert('Error Loggin in user. Please try again later.');
                });
        })
        .catch((error) => {
                console.error('Error Sign in user:', error);
                if (errorCode === 'auth/invalid-credential') {
                    alert('Invalid Email, Please sign up before Logging in');
                } else {
                    alert(errorMessage);
                }
                const errorCode = error.code;
                const errorMessage = error.message;
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
        ToggleBtnImg.src = "shown.png";
    } else {
        PswdField.type = "password";
        ToggleBtnImg.src = "hidden.png";
    }
}


function GoHome(){
    window.location.href = "/home_page/home.html";
}