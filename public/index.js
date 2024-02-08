import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js';
import { getDatabase, ref, update, onValue} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
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
            const user = userCredential.user;

            // if the users email is verified
            if (user.emailVerified) {
                // The user is signed in successfully
                // initialize the permission with initial data of 'user'
                var permission = "user";
                if( // admin list
                    email == "ShapCafeAdmin@proton.me"
                    ||
                    email == "jeehwan.park@shap.edu.ph"
                    ||
                    email == "rosario.artanisren@shap.edu.ph"
                    ||
                    email == "oblea.revjonezekieljerome@shap.ehu.ph"
                    ||
                    email == "dienzo.osmundniles@shap.edu.ph"
                    ||
                    email == "caseydylan.verzo@shap.edu.ph"
                    ){
                    permission = "admin"
                }

                // initialize users data
                const user_data = {
                    email: email,
                    user : permission,
                    last_login: Date.now()
                };
                
                // Save user data to the database
                update(ref(database, 'users/' + user.uid), user_data)
                    .then(() => {
                        console.log('User data saved successfully');
                        // check if the user is an admin or a user
                        CheckUser(user);
                    })
                    .catch(error => { // here's for when firebase have problem ( or other problem
                        hideLoadingScreen();
                        console.error('Error saving user data:', error);
                        alert('Error Loggin in user. Please try again later.');
                });
            }else{ // here's for when the email is not verified
                hideLoadingScreen();
                alert("Your email hasn't been verified.");
            }
            
        })
        .catch((error) => { // here's when there is a problem with the user's auth
            hideLoadingScreen();
            console.error('Error Sign in user:', error);
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/invalid-credential') {
                alert('Wrong password or Invalid Email.');
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
    if(email == "ShapCafeAdmin@proton.me") return true; // returns true for admin only account
    let expression = /^[^@]+@\w+(\.\w+)+\w$/; // initializing the expression to be formatted for the email format
    if(expression.test(email) == false ) return false; // return false when the email is in the wrong format
    if(email.substr(email.length - 12) != "@shap.edu.ph" ) return false; // if the email is not shap mail
    return true;
}

function validate_password(password){
    if(password.length <= 6) return false;// Firebase only accepts passwords over 6 characters
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
    // info: when the field type is password, the data inside is hidden, if else, it's not
    if (PswdField.type === "password") { // if the type is password
        PswdField.type = "text";
        ToggleBtnImg = "shown.png";
    } else { // if else
        PswdField.type = "password";
        ToggleBtnImg = "hidden.png";
    }
}


function GoHome(){
    window.location.href = "/home_page/home.html";
}

function GoAdmin(){
    window.location.href = "/admin_page/home_page/home.html";
}

function CheckUser(user){
    // initializing the dbref
    const dbref = ref(database, 'users/' + user.uid + '/user');
          
    onValue(dbref, (snapshot) => {
        const perm = snapshot.val();
        console.log("user permission:"+perm);
        if (perm == "admin") {
            let message = ("Welcome! Admin");
            alert(message);
            GoAdmin();
        }else{
            GoHome();
        }
    });
    
}
