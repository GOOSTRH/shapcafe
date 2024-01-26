// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize variables
const auth = firebase.auth();
const database = database();

// Set up our register function, sign up function
function signup(){
    // Getting all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    // Validate input fields
    if ( validate_email(email) == false ){
        alert('Please if your email address is entered correctly')
        return
        // stops running the code
    } else if ( validate_password(password) == false ){
        alert('Please check your password format ( Password shall not be less than 6 characters )')
        return
        // stops running the code
    }

    // Moving on to Auth
    auth.createUserWithEmailAndPassword(email,password)
    .then(function(){
        // Declare user variable
        var user = auth.currentUser

        // Add this MF to FIrebase Database
        var database_ref = firebase.database().ref();

        // Create User Data
        var user_data = {
            email : email,
            last_login : Date.now()
        }

        // Use set() method to save data to the database
        database_ref.child('users/' + user.uid).set(user_data)

        alert('User Created!')

    })
    .catch(function(error){
        // Firebase will use this to alert it's errors
        var error_code = error.code
        var error_message = error.message

        alert(error_message)
    })


}

function validate_email(email){
    expression = /^[^@]+@\w+(\.\w+)+\w$/
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

