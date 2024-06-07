

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, collection, doc, getDoc,getDocs, addDoc, setDoc, query,updateDoc, arrayUnion, arrayRemove,serverTimestamp, onSnapshot} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
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
     const Followers = userDoc.data().Followers;
     const Following = userDoc.data().Following;
     const MyChats = userDoc.data().MyChats
     
     


async function LoadSwiperData() {
 

const q = query(collection(db, "Users Reel"));
const querySnapshot = await getDocs(q);
var ReelClutter = "";
querySnapshot.forEach(doc => {
    const PostFirstName = doc.data().PostFirstName;
    const PostSecondName = doc.data().PostSecondName;
    const PostUsername = doc.data().PostUsername;
    const PostProfilePic = doc.data().PostProfilePic;
    const PostCaption = doc.data().UserPostCaption;
    const UserPostPic = doc.data().UserPostPic;
    const TimeStamp = doc.data().CreatedAt;
    const Like = doc.data().Like;    
    const PostId = doc.id;
    const PostuserId = doc.data().PostuserId;
  
    

    ReelClutter += `
    <div class="swiper-slide" role="group" aria-label="1 / 2" style="height: 660px;">
        <div class="videoCont">
   <video src="${UserPostPic}"  loop id="ReelVideo"></video> 
        </div>
        
        <div class="ReelBottomCont">
        <div class="ReelBottom">
            <div class="PosterDets" id=${PostuserId}>
             <div class="ProfilePicCont">
                <img src=${PostProfilePic} alt="">
                </div> 
                <h3 id="ReelUsername">${PostUsername}</h3>
 <button class="FollowThem" id=${PostuserId} >Follow</button>
 <button class="SeeProfile" id=${PostuserId} style="display:none;">See Profile</button> 
              </div> 
            
            <div class="ReelTitle">
                <p>${PostCaption}</p>
            
            </div> 
            </div>
        </div>
    </div>`;
});

var SwiperInner = document.querySelector(".swiper-wrapper");
SwiperInner.innerHTML += ReelClutter; 


async function DisplayButtonPurpose() {
var WhoLikedFollowButtons = document.querySelectorAll(".FollowThem");
WhoLikedFollowButtons.forEach(async function(WhoLikedFollowButton) {
const FollowThemId = WhoLikedFollowButton.id
let isFollowing = false;
for (let i = 0; i < Following.length; i++ ) {

if (Following[i].includes(FollowThemId) ) {
 isFollowing = true;
break; 
}
}
    
    if (isFollowing) {
        WhoLikedFollowButton.textContent = "Unfollow";
        WhoLikedFollowButton.style.backgroundColor = "#EFEFEF";
        WhoLikedFollowButton.style.color = "#000";
    } else {
        WhoLikedFollowButton.textContent = "Follow";
        WhoLikedFollowButton.style.backgroundColor = "#0195F7";
        WhoLikedFollowButton.style.color = "#fff";
    } 
}) 
}
DisplayButtonPurpose()




function SendUserDets(){
var PosterDets = document.querySelectorAll(".PosterDets") 
PosterDets.forEach(PosterDet => {
PosterDet.addEventListener("click",function(dets){

if (dets.target.tagName === "BUTTON") {
 return;
}

console.log("clicked")
var PosterUserId = PosterDet.id;
if (PosterUserId === user.uid) {
window.location.href="profile.html"
}else {
window.location.href = 'user.html?PosterUserId='+ encodeURIComponent(PosterUserId);
} 
}) 
}) 
}
SendUserDets()


async function FollowSystem() {
 


var WhoLikedFollowButtons = document.querySelectorAll(".FollowThem");
WhoLikedFollowButtons.forEach(async function(WhoLikedFollowButton) {



    
var FollowFlag = 0;
const FollowersRef = doc(db, 'Users', WhoLikedFollowButton.id);  
const FollowingRef = doc(db, 'Users', user.uid);  


const MyChatsRef = doc(db, 'Users', user.uid);  

if (WhoLikedFollowButton.id !== user.uid) {
WhoLikedFollowButton.addEventListener("click", async function() {
console.log("clicked")    
        if (FollowFlag === 0) {
  await updateDoc(FollowersRef, { Followers: arrayUnion(user.uid) });
 await updateDoc(FollowingRef, { Following: arrayUnion(WhoLikedFollowButton.id) });

const combinedId = user.uid + WhoLikedFollowButton.id
await updateDoc(MyChatsRef, { MyChats: arrayUnion(combinedId) });
await setDoc(doc(db, "UsersChats", combinedId), {
  Message: [],
  LastMessage:[]
});   
   
            FollowFlag = 1;
        } else {
            await updateDoc(FollowersRef, { Followers: arrayRemove(user.uid) });
            await updateDoc(FollowingRef, { Following: arrayRemove(WhoLikedFollowButton.id) });
            FollowFlag = 0;
        }


    
 WhoLikedFollowButtons.forEach(async function(WhoLikedFollowButton) {
SeeProfiles.forEach(async function(SeeProfile) {
if (SeeProfile.id === user.uid) {
WhoLikedFollowButton.style.display="none"
SeeProfile.style.display="initial"
SeeProfile.addEventListener("click",function(){
window.location.href="profile.html" 
})

}else if (FollowFlag === 1) {
            WhoLikedFollowButton.textContent = "Unfollow";
            WhoLikedFollowButton.style.backgroundColor = "#EFEFEF";
            WhoLikedFollowButton.style.color = "#000";
        } else {
            WhoLikedFollowButton.textContent = "Follow";
            WhoLikedFollowButton.style.backgroundColor = "#0195F7";
            WhoLikedFollowButton.style.color = "#fff";
        } 
     })   
   
}) 
})  

    


  

}
})
    
     
     

        
    
}
FollowSystem()     
    
     
    
    
   var swiper = new Swiper(".mySwiper", {
   
      direction: "vertical",
      
        
        on: {
         slideChange: function SlideChangeFunc() {

  var ReelVideos = document.querySelectorAll("#ReelVideo") 

ReelVideos.forEach(async function(ReelVideo) {
 ReelVideo.pause()
 ReelVideo.currentTime = 0
})


const activeSlide = this.slides[this.activeIndex]
const activeVideo = activeSlide.querySelector("#ReelVideo")
if (activeVideo) {
 activeVideo.play();
}

}

}
})
VideoPlayer()

}  






function VideoPlayer() {

var MuteFlag = 0;
var ReelVideos = document.querySelectorAll("#ReelVideo") 
if (ReelVideos.length > 0) {
ReelVideos[0].setAttribute("autoplay","true") 
}
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

ReelVideo.addEventListener("touchstart", function(){
ReelVideo.pause() 
})

ReelVideo.addEventListener("touchend", function(){
ReelVideo.play() 
})

})
}   
   





    
      
 var ReelVideos = document.querySelectorAll("#ReelVideo") 
if (ReelVideos.length > 0) {
ReelVideos[0].setAttribute("autoplay","true") 
ReelVideos[0].play()
}   
    
    

LoadSwiperData()   



}else{
     window.location.href="login.html" 
     }
                    
                    
                
             
            }
            })
            
      




