import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { signInWithEmailAndPassword, getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB3Y5uyUMYf-dyotLVowbHpxyAK6g_wz1E",
    authDomain: "instagram-4b0e8.firebaseapp.com",
    projectId: "instagram-4b0e8",
    storageBucket: "instagram-4b0e8.appspot.com",
    messagingSenderId: "577043136770",
    appId: "1:577043136770:web:feb2919df6844a54b2421b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

var login = document.querySelector("#signin");

login.addEventListener('click', async function(e) {
    e.preventDefault();
    
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;

    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    

    alert("User loggedIn successfully!");
    window.location.href = "index.html";

    // Fetch the user's document from Firestore using email
    const userRef = collection(db, 'Users');
    const userQuery = query(userRef, where('Email', '==', email));
    const querySnapshot = await getDocs(userQuery);    

})  
var showHidePassword = document.querySelector('#showHidePassword');
var passwordInput = document.querySelector('#password');
var PassFlag = 0;
showHidePassword.addEventListener('click', function() {
    if (PassFlag === 0) {
        passwordInput.type = "text";
        PassFlag = 1;
        showHidePassword.classList = "ri-eye-line";
    } else {
        passwordInput.type = "password";
        PassFlag = 0;
        showHidePassword.classList = "ri-eye-close-line";
    }
});
