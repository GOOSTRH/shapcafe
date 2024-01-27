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
const database = firebase.database();

// Set up our register function, sign up function
function signup(){
    // Getting all our input fields
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Validate input fields
    if (!validate_email(email)){
        alert('Please enter a valid email address');
        return;
    } else if (!validate_password(password)){
        alert('Please enter a valid password (password must be at least 69 characters)');
        return;
    }

    // Moving on to Auth
    alert('debugging 1');
    auth.createUserWithEmailAndPassword(email, password)
    .then(function(){
        alert('debugging 2');
        // Declare user variable
        var user = auth.currentUser;

        if (!user) {
            alert('User not found after signup. Please try again later.');
            return;
        }
        alert('debugging 3');
        // Add user to Firebase Database
        var database_ref = firebase.database().ref('users/' + user.uid);
        
        // Create User Data
        var user_data = {
            email: email,
            last_login: Date.now()
        };
        
        // Use set() method to save data to the database
        database_ref.set(user_data)
        .then(function() {
            alert('User Created!');
        })
        .catch(function(error) {
            console.error('Error saving user data:', error);
            alert('Error creating user. Please try again later.');
        });
        

    })
    .catch(function(error){
        alert('debugging error');
        console.error('Error creating user:', error);
        alert(error.message);
    });
    alert('debugging 5');
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

