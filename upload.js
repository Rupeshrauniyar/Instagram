import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, collection, doc, getDoc,getDocs, addDoc, query, serverTimestamp, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
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




function UploadReel() {
var addReelInp = document.querySelector("#selectReel")

addReelInp.addEventListener("change", function(event){

const VideoFile = event.target.files[0] 
if (VideoFile) {
const ReelReader = new FileReader()  
ReelReader.onload = function(e) {
document.querySelector("#previewReel").src = e.target.result 
}
ReelReader.readAsDataURL(VideoFile)
}


const CurrentTime = new Date()
var uploadReel = document.querySelector("#uploadReel")
uploadReel.addEventListener("click", async function(){
var ReelStorage = sRef(imgDb,"Users Reel/" + VideoFile.name + CurrentTime)
var ReelUpload = await uploadBytesResumable(ReelStorage, VideoFile)
var ReelUrl = await getDownloadURL(ReelUpload.ref)


var ReelCaption = document.querySelector("#reelCaption").value
console.log(ReelCaption)

const UploadReel = await addDoc(collection(db,"Users Reel"),{
PostFirstName: FirstName,
PostSecondName: SecondName,                
PostUsername: Username, 
PostProfilePic:ProfilePic,               
UserPostPic: ReelUrl,
UserPostCaption: ReelCaption,
PostuserId: user.uid,
CreatedAt: serverTimestamp(),
Like: [], 
Comment:[]
})
})
})


 

}


UploadReel()





var addPicFile;
var addPostPic = document.getElementById('addPostFileInp')




addPostPic.addEventListener('change', function(event) {
var showDiv = document.querySelector(".showDiv")
var imgCont = document.querySelector(".imgCont")
showDiv.style.display="none"
imgCont.style.backgroundColor="#000"
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
shareBtn.addEventListener("click", async function(){
var addPostText = document.querySelector("#addPostText").value;
const timestamp = new Date()
const PostPicStorageRef = sRef(imgDb, "Users Post/" + addPicFile.name + timestamp);
const PostPicSnapshot = await uploadBytesResumable(PostPicStorageRef, addPicFile);
const PostPicDownloadUrl = await getDownloadURL(PostPicSnapshot.ref);

var AddPostImg = document.querySelector("#AddPostImg")
const PostRef = await doc(db, 'Users', user.uid);  




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
                
  
})




if (upload) {
 window.location.href="index.html"
}




})
}






}
})




var topBtn = document.querySelector("#top")
var bottomBtn = document.querySelector("#bottom")
var centerBtn = document.querySelector("#center")



const photoBtn = document.querySelector("#photoBtn")
photoBtn.addEventListener("click", function(){
document.querySelector(".UploadPhoto").style.transform="translate(0,0)"
document.querySelector(".UploadReel").style.transform="translate(100%,0)"
var ReelVideos = document.querySelectorAll("#previewReel") 
ReelVideos.forEach(async function (ReelVideo) {
 ReelVideo.src=""
})
})
const reelBtn = document.querySelector("#reelBtn")
reelBtn.addEventListener("click", function(){
document.querySelector(".UploadReel").style.transform="translate(0,0)"
document.querySelector(".UploadPhoto").style.transform="translate(100%,0)"
})


function VideoPlayer() {
var MuteFlag = 0;
var ReelVideos = document.querySelectorAll("#previewReel") 
ReelVideos.forEach(async function (ReelVideo) {


ReelVideo.addEventListener("click", function(){
if (MuteFlag === 0) {
ReelVideo.muted = false;
MuteFlag = 1
}
else {
ReelVideo.muted = true;   
MuteFlag = 0  
}
})


})
}   
VideoPlayer()   
