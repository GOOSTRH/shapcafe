import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js';
import { getFirestore, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

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
const db = getFirestore(app);

const AddMenuBtn = document.getElementById('addmenubtn');
const Name = document.getElementById('name');
const Price = document.getElementById('price');
const Description = document.getElementById('description');

const Type = document.getElementById('type');
const TypeText = Type.textContent;

AddMenuBtn.addEventListener('click', function(event) {
    // Prevent default form submission behavior
    event.preventDefault();
    // Call your signup function
    AddMenu( Name.value, Description.value, Price.value);
});


// Set up our register function, sign up function
async function AddMenu( name, description, price ){

    const data = {
        'Description' : description,
        'Price' : price,
        'Type' : TypeText
    };
    await setDoc(doc(collection(db, 'menus'), name ), data);
    //                          db     col    doc    fields
}