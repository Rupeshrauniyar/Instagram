import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, collection, doc, getDoc,getDocs, addDoc, query } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
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
const db = getFirestore();
const imgDb = getStorage(app);


onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDoc = await getDoc(doc(db, "Users", user.uid));
        if (userDoc.exists()) {
            const FirstName = userDoc.data().FirstName;
            const SecondName = userDoc.data().SecondName;
            const Username = userDoc.data().Username;
            const ProfilePic = userDoc.data().ProfilePic;
            const CreatedTime = userDoc.data().CreatedAt;


const MyuserName = document.querySelector("#MyuserName").textContent=Username;       
            
 
 
var MyProfileClutter=""
var MyProfile = document.querySelector(".MyProfile");

MyProfileClutter +=`<div class="MyProfilePic">
  <img src=${ProfilePic} alt="" id="MyProfileImg">
  <div class="MyName">
 <p>${FirstName} </p> 
 <p> ${SecondName}</p>
 </div>
 </div>
 <div class="MyProfileDets">
<div class="MyProfilePosts">
  <p>100</p>
  <h3>Posts</h3>
  </div>
  
  <div class="MyProfileFollowers">
  <p>100</p>
  <h3>Followers</h3>
  </div>
  
  <div class="MyProfileFollowing">
  <p>100</p>
  <h3>following</h3>
  </div>


 </div>`
 
 
MyProfile.innerHTML=MyProfileClutter; 
 
            
            
 var LogOutBtn = document.querySelector('#LogOut')
 
 LogOutBtn.addEventListener("click", function(){
 const auth = getAuth();
signOut(auth).then(() => {
alert("Logged Out Successfully.")  
}).catch((error) => {
  
}); 
 })
 

}
}else {
 window.location.href="login.html"
}
})
