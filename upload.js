import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, collection, doc, getDoc,getDocs, addDoc, query, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
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


var addPicFile;
var addPostPic = document.getElementById('addPostFileInp')




addPostPic.addEventListener('change', function(event) {
    addPicFile = event.target.files[0];
    if (addPicFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('AddPostImg').src = e.target.result;
        };
        reader.readAsDataURL(addPicFile);
    }
});


var shareBtn = document.querySelector("#AddPostButton");
shareBtn.addEventListener("click",async function(){
var addPostText = document.querySelector("#addPostText").value;

 const PostPicStorageRef = sRef(imgDb, "Users Post/" + addPicFile.name);
const PostPicSnapshot = await uploadBytesResumable(PostPicStorageRef, addPicFile);
const PostPicDownloadUrl = await getDownloadURL(PostPicSnapshot.ref);

var AddPostImg = document.querySelector("#AddPostImg")






const upload = await addDoc(collection(db, "Users Post"), {

                PostFirstName: FirstName,
                PostSecondName: SecondName,                
                PostUsername: Username, 
                PostProfilePic:ProfilePic,               
                UserPostPic: PostPicDownloadUrl,
                UserPostCaption: addPostText,
                PostuserId: user.uid,
                CreatedAt: serverTimestamp(),
                Like: [],
                
  
});

if (upload) {
 window.location.href="index.html"
}

})
}

}else {
 window.location.href="login.html";
}
})
var topBtn = document.querySelector("#top")
var bottomBtn = document.querySelector("#bottom")
var centerBtn = document.querySelector("#center")




