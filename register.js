import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";



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
const db = getFirestore(app);
const imgDb = getStorage(app);

var register = document.querySelector("#register");
var profilePicFile; // Store the selected profile picture file

var sleectProfilePic = document.getElementById('selectProfilePic')


selectProfilePic.addEventListener('change', function(event) {
    profilePicFile = event.target.files[0];
    const displayProfilePic = document.getElementById('displayProfilePic');

    if (profilePicFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            displayProfilePic.src = e.target.result;
        };
        reader.readAsDataURL(profilePicFile);
    } else {
        // Set default profile picture if no picture is selected
        displayProfilePic.src = 'user.jpg';
    }
});



register.addEventListener('click', async function(e) {
    e.preventDefault();
    
    var firstName = document.querySelector('#firstName').value;
    var secondName = document.querySelector('#secondName').value;
    var email = document.querySelector('#email').value;
    var username = document.querySelector('#userName').value;
    var password = document.querySelector('#password').value;
    const currentTime = new Date(Date.now());
    var createdTime = currentTime.toLocaleTimeString();

    const userRef = collection(db, 'Users');
    const userQuery = query(userRef, where('Email', '==', email));
    const querySnapshot = await getDocs(userQuery);
    
    if (!querySnapshot.empty) {
        alert('User with this email already exists!');
        return;
    }

    try {
        let profilePicDownloadUrl = 'user.jpg';  // Default profile picture URL

        if (profilePicFile) {
            const profilePicStorageRef = sRef(imgDb, "Users Profile Picture/" + profilePicFile.name);
            const profilePicSnapshot = await uploadBytesResumable(profilePicStorageRef, profilePicFile);
            profilePicDownloadUrl = await getDownloadURL(profilePicSnapshot.ref);
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                // Use user.uid as document ID
                await setDoc(doc(db, "Users", user.uid), {
                    FirstName: firstName,
                    SecondName: secondName,
                    Email: email,
                    Username: username,
                    CreatedAt: createdTime,
                    ProfilePic: profilePicDownloadUrl,
                    userId: user.uid
                });

                alert("Account Registered successfully!");
            })
            .catch(error => {
                console.error("Error registering account:", error);
                alert("Registration failed. Please try again.");
            });

    } catch (error) {
        console.error("Error uploading profile picture:", error);
        alert("Registration failed. Please try again.");
    }
});
