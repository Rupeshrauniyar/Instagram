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
var searchClutter=""; 
 var displayUsersDiv = document.querySelector(".displayUsers")     

const q = query(collection(db, "Users"));
            const querySnapshot = await getDocs(q);                                  
            querySnapshot.forEach((doc) => {   
            const FirstName = doc.data().FirstName;
            const SecondName = doc.data().SecondName;                     
            const Username = doc.data().Username;
            const ProfilePic = doc.data().ProfilePic;
const UsersId = doc.id


     
function fetchUser() {
 searchClutter += `
 <div class="UsersCont" id="${UsersId}">
 <div class="UsersProfileImg">
  <img src="${ProfilePic}" alt="">
 </div>
 <div class="UsersUsername">
  <h3>${Username}</h3>
  <div class="name">
  <p id="FirstName">${FirstName}</p>
  <p>${SecondName}</p>
  </div>
 </div>
</div> `
displayUsersDiv.innerHTML= searchClutter; 
}
fetchUser();
var searchBar = document.querySelector("#searchInp");
searchBar.addEventListener("input", function() {

    const searchTerm = this.value.toLowerCase();
    var Usernames = document.querySelectorAll('.UsersUsername h3');
    

    Usernames.forEach(user => {
        const username = user.textContent.toLowerCase();
        const userContainer = user.closest('.UsersCont'); 
        
   
        
  if (username.includes(searchTerm)) {
            userContainer.style.display = "flex";
            
        } else {
            userContainer.style.display = "none";
            
        }
    });
});


 function SendUserDets(){
var UsersConts = document.querySelectorAll(".UsersCont") 
UsersConts.forEach(UsersCont => {
UsersCont.addEventListener("click",function(dets){

var PosterUserId = UsersCont.id;
if (PosterUserId === user.uid) {
 window.location.href="profile.html"
}else {

 window.location.href = 'user.html?PosterUserId='+ encodeURIComponent(PosterUserId);
}
}) 
}) 
  }
  SendUserDets()
 
 
 })
 }
         
    }else{
     window.location.href="login.html"
    }
})

