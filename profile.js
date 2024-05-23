import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, collection, doc, getDoc,getDocs, addDoc, query,updateDoc, arrayUnion, arrayRemove, setDoc} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
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
    
function getQueryParams() {

            var queryParams = {};
            var queryString = window.location.search.substring(1);
            var pairs = queryString.split('&');
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i].split('=');
queryParams[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
            }
            return queryParams;
        }

        
        var queryParams = getQueryParams();
     
     
     
        const userDoc = await getDoc(doc(db, "Users",  user.uid ));
        if (userDoc.exists()) {
            const FirstName = userDoc.data().FirstName;
            const SecondName = userDoc.data().SecondName;
            const Username = userDoc.data().Username;
            const ProfilePic = userDoc.data().ProfilePic;
            const CreatedTime = userDoc.data().CreatedAt;
            const Followers = userDoc.data().Followers;
            const Following = userDoc.data().Following;
            const MyChats = userDoc.data().Chats
        
        
            const MyuserName = document.querySelector("#MyuserName").textContent = Username;

            var MyProfileClutter = "";
            var MyProfile = document.querySelector(".MyProfile");

            MyProfileClutter += `<div class="MyProfileCont">
            <div class="MyProfilePic">
                                    <img src=${ProfilePic} alt="" id="MyProfileImg">
                                    
                        <div class="MyName">
                        <p>${FirstName} </p> 
                         <p>${SecondName}</p>
                          </div>
                                </div>
                              
                              
                                <div class="MyProfileDets">
                                    <div class="MyProfilePosts">
                                <p id="Postlength"></p>
                                        <h3>Posts</h3>
                                    </div>
                     <div class="MyProfileFollowers" id=${user.uid}>
                    <p id="FollowersCount">${Followers.length}</p>
                                        <h3>Followers</h3>
                                    </div>
                          <div class="MyProfileFollowing" id=${user.uid}>
                                   <p>${Following.length}</p>
                                        <h3>Following</h3>
                                    </div>                                                                   
                                </div>
                               </div>
                                
                               
                               `;

            MyProfile.innerHTML = MyProfileClutter;
            
       var menu = document.querySelector("#menu");
       var backBtn = document.querySelector("#side-back")
       
       var sideBar = document.querySelector(".Side-Bar") 
 menu.addEventListener("click", function(){
  sideBar.style.transform="translate(0,0)"
 })           
 backBtn.addEventListener("click", function(){
  sideBar.style.transform="translate(100%,0)"
 })           
            
            var LogOutBtn = document.querySelector('#LogOut');

            LogOutBtn.addEventListener("click", function() {
                signOut(auth).then(() => {
                    alert("Logged Out Successfully.");
                }).catch((error) => {});
            });
 const q = query(collection(db, "Users Post"));
const querySnapshot = await getDocs(q);

const uniquePostIds = new Set();

querySnapshot.forEach((doc) => {
    const PostUserId = doc.data().PostuserId;
   const PostId = doc.id;       
    if (PostUserId.includes(user.uid)) {   
        uniquePostIds.add(PostId); 
    }
});


const postLength = uniquePostIds.size;
document.querySelector("#Postlength").textContent = postLength;



            
            var postClutter = "";
            var postDiv = document.querySelector('.MyPost');

     querySnapshot.forEach((doc) => {
     const postId = doc.data().PostuserId; 
                if (postId === user.uid) {
    const PostFirstName = doc.data().PostFirstName;
    const PostSecondName = doc.data().PostSecondName;
    const PostUsername = doc.data().PostUsername;
    const PostProfilePic = doc.data().PostProfilePic;
    const PostCaption = doc.data().UserPostCaption;
    const UserPostPic = doc.data().UserPostPic;
    const TimeStamp = doc.data().CreatedAt;
    const Like = doc.data().Like;    
    const PostId = doc.id;
    const PostuserId = doc.data().PostuserId




const likedByUser = Like.includes(user.uid);

const heartIconClass = likedByUser ? "fa-solid fa-heart" : "fa-regular fa-heart";
    const heartIconColor = likedByUser ? "#FF3040" : "black";
    
    



    
    const containsLink = /(?:https?|ftp):\/\/[\n\S]+/g.test(PostCaption);
    let formattedCaption = PostCaption;
    if (containsLink) {
        formattedCaption = PostCaption.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
    }


    postClutter += `
        <div class="PostCont"> 
            <div class="PosterDets" id="${PostuserId}">
                <div class="PosterImage">
                    <img src="${PostProfilePic}" alt="">  
                </div>
                <span id="PosterName">${PostUsername}</span>
                      
            </div>                        
            <div class="PostImg">
                <img src="${UserPostPic}" alt="">  
            </div>
            
            <div class="PostInteractionCont">
                <div class="PostInteraction">
<i class="${heartIconClass} likeIt" id="${PostId}" style="color: ${heartIconColor};"></i>           
                
                    <i class="fa-regular fa-comment commentIt"></i>
                    
                </div>
                
                <div class="PostSave">
             <i class="fa-regular fa-bookmark" id="saveIt"></i>
                </div> 
            </div>
  <div class="PostLikeCount" id="likeCount_${PostId}">      
 </div>

     <div class="PostTitle">
<h4>${formattedCaption}</h4>
            </div>  
        </div>`;

}



    
            postDiv.innerHTML = postClutter;
            
})   
let likeDivProcessing = false        
async function displayLikedByUsername() {
    var likeBtns = document.querySelectorAll(".likeIt");
    var PostLikeCounts = document.querySelectorAll('.PostLikeCount');

    PostLikeCounts.forEach(async function(PostLikeCount) {
        PostLikeCount.addEventListener("click", async function() {
        if (likeDivProcessing) return;

likeDivProcessing = true         
     
            let trimmedId = PostLikeCount.id.replace("likeCount_", "");
            const docRef = doc(db, 'Users Post', trimmedId);
            const fetchDoc = await getDoc(docRef);
            
            if (fetchDoc.exists()) {
                let likes = fetchDoc.data().Like;
                
                if (Array.isArray(likes)) {
                likes.forEach (async function(like) {
                 
               
                        const docRef2 = doc(db, 'Users', like);
                        const fetchDoc2 = await getDoc(docRef2);
                        if (fetchDoc2.exists()) {
const FirstNameOfLikedUser = fetchDoc2.data().FirstName;
const SecondNameOfLikedUser = fetchDoc2.data().SecondName;
const UsernameOfLikedUser = fetchDoc2.data().Username;
const ProfilePicOfLikedUser = fetchDoc2.data().ProfilePic;
const CreatedTimeOfLikedUser = fetchDoc2.data().CreatedAt;
const UserId = like
const Followers = fetchDoc2.data().Followers;
const Following = fetchDoc2.data().Following;



var WhoLikedDiv = document.querySelector(".WhoLikedDiv")

var WhoLikedCont = document.querySelector(".WhoLikedCont")
WhoLikedDiv.style.transform="translate(0%,0%)"

document.querySelector("#DisplayLikesCountInWhoLiked").textContent=`${like.length} like`;
let WhoLikedClutter = "";
WhoLikedClutter += `
 <div class="WhoLikedUsersCont">
  <div class="WhoLikedUsersSmall" id=${UserId}>
 <div class="WhoLikedImg">
  <img src="${ProfilePicOfLikedUser}" alt="">
 </div>
 <div class="WhoLikedDets">
  <div class="WhoLikedUsername">
   <h3>${UsernameOfLikedUser}</h3>
  </div>
  <div class="WhoLikedName">
  <p>${FirstNameOfLikedUser}</p><p>${SecondNameOfLikedUser}</p>
  </div>  
 </div> 
 </div>
 <div class="WhoLikedFollow">
<button class="WhoLikedFollowButton WhoLikedFollowButton_${like}" id=${like}>Follow</button>
<button class="SeeProfile" id=${like} style="display:none;"><p>See Profile</p></button>
 </div>
</div>`



WhoLikedCont.innerHTML += WhoLikedClutter; 

         }
likeDivProcessing = false


var WhoLikedUsersConts = document.querySelectorAll(".WhoLikedUsersCont")  

var WhoLikedFollowButtons = document.querySelectorAll(`WhoLikedFollowButton_${like}`);
var FollowFlag = 0;
WhoLikedFollowButtons.forEach(async function(WhoLikedFollowButton) {
const FollowersRef = doc(db, 'Users', WhoLikedFollowButton.id);  
const FollowingRef = doc(db, 'Users', user.uid);  
const Followers = fetchDoc2.data().Followers;
const Following = fetchDoc2.data().Following;
})
var WhoLikedFollowIdButtons = document.querySelectorAll(`.WhoLikedFollowButton_${like}`);

WhoLikedFollowIdButtons.forEach(async function(WhoLikedFollowButton) {
    var FollowFlag = 0;
    const FollowersRef = doc(db, 'Users', WhoLikedFollowButton.id);  
    const FollowingRef = doc(db, 'Users', user.uid);  
    const Followers = fetchDoc2.data().Followers;
    const Following = fetchDoc2.data().Following;

    if (Followers.includes(user.uid)) {
        FollowFlag = 1;             
        
    }
var SeeProfiles = document.querySelectorAll(".SeeProfile")
    
    
  
   if (Array.isArray(likes)) {
 likes.forEach(async function(like) {
  
 
 if (like.includes(user.uid)) {
 var WhoLikedFollowIdButtons = document.querySelectorAll(`.WhoLikedFollowButton_${like}`);

WhoLikedFollowIdButtons.forEach(async function(WhoLikedFollowButton) {
WhoLikedFollowButton.textContent = "See Profile"; 

SeeProfiles.forEach(async function(SeeProfile){
if (SeeProfile.id === user.uid) {
WhoLikedFollowButton.style.display="none"
SeeProfile.style.display="initial"
SeeProfile.addEventListener("click",function(){
window.location.href="profile.html" 
})

}
}) 
})              
}else if(FollowFlag === 1) {
        WhoLikedFollowButton.textContent = "Unfollow";
        WhoLikedFollowButton.style.backgroundColor = "#EFEFEF";
        WhoLikedFollowButton.style.color = "#000";
     
WhoLikedFollowButton.style.display="initial"

    } else {
        WhoLikedFollowButton.textContent = "Follow";
        WhoLikedFollowButton.style.backgroundColor = "#0195F7";
        WhoLikedFollowButton.style.color  = "#fff";
WhoLikedFollowButton.style.display="initial"
    }
 }) 
   }


})

function SendLikeUserDets(){
var WhoLikedUsersConts = document.querySelectorAll(".WhoLikedUsersSmall") 
WhoLikedUsersConts.forEach(WhoLikedUsersCont => {
WhoLikedUsersCont.addEventListener("click",function(dets){
var PosterUserId = WhoLikedUsersCont.id;
if (PosterUserId === user.uid) {
window.location.href="profile.html"
}else {
window.location.href = 'user.html?PosterUserId='+ encodeURIComponent(PosterUserId);
} 
}) 
}) 
}
SendLikeUserDets()


document.querySelector("#back").addEventListener("click", function(){
var WhoLikedDiv = document.querySelector(".WhoLikedDiv")
WhoLikedDiv.style.transform="translate(0%,100%)"   
 WhoLikedCont.innerHTML = ""; 
})





var WhoLikedFollowButtons = document.querySelectorAll(`.WhoLikedFollowButton`);





WhoLikedFollowButtons.forEach(async function(WhoLikedFollowButton) {
var FollowFlag = 0;
const FollowersRef = doc(db, 'Users', WhoLikedFollowButton.id);  
const FollowingRef = doc(db, 'Users', user.uid);  
const Followers = fetchDoc2.data().Followers;
const Following = fetchDoc2.data().Following;
    WhoLikedFollowButton.addEventListener("click", async function() {
    
        if (FollowFlag === 0) {
       
            await updateDoc(FollowersRef, { Followers: arrayUnion(user.uid) });
            await updateDoc(FollowingRef, { Following: arrayUnion(WhoLikedFollowButton.id) });
   
   await updateDoc(FollowingRef, { 
  MyChats: arrayUnion({
    userId: userId
  })
});

            FollowFlag = 1;
        } else {
            await updateDoc(FollowersRef, { Followers: arrayRemove(user.uid) });
            await updateDoc(FollowingRef, { Following: arrayRemove(WhoLikedFollowButton.id) });
            FollowFlag = 0;
        }

        if (FollowFlag === 1) {
            WhoLikedFollowButton.textContent = "Unfollow";
            WhoLikedFollowButton.style.backgroundColor = "#EFEFEF";
            WhoLikedFollowButton.style.color = "#000";
        } else {
            WhoLikedFollowButton.textContent = "Follow";
            WhoLikedFollowButton.style.backgroundColor = "#0195F7";
            WhoLikedFollowButton.style.color = "#fff";
        }
    });
     })  
        })
      } else {
                    const docRef2 = doc(db, 'Users', likes);
                    const fetchDoc2 = await getDoc(docRef2);
                    if (fetchDoc2.exists()) {
const FirstNameOfLikedUser = fetchDoc2.data().FirstName;
const SecondNameOfLikedUser = fetchDoc2.data().SecondName;
const UsernameOfLikedUser = fetchDoc2.data().Username;
const ProfilePicOfLikedUser = fetchDoc2.data().ProfilePic;
const CreatedTimeOfLikedUser = fetchDoc2.data().CreatedAt;
const UserId = likes;
                        
                    }
                    
                    
                }
            } else {
                console.log("Post not found");
            }
            
        });
    });
}

displayLikedByUsername();

            
 let followersDivProcessing = false           
async function displayWhoHasFollowedMe() {
    const MyProfileFollowers = document.querySelector(".MyProfileFollowers");

    MyProfileFollowers.addEventListener("click", async function() {
    

if (followersDivProcessing) return;

followersDivProcessing = true
       
        const myId = MyProfileFollowers.id;
        const docRef = doc(db, "Users", myId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const Followers = docSnap.data().Followers;

            for (let i = 0; i < Followers.length; i++) {
                const fetchUsers = doc(db, "Users", Followers[i]);
                const fetchSnap = await getDoc(fetchUsers);

                if (fetchSnap.exists()) {
                    const FirstNameOfLikedUser = fetchSnap.data().FirstName;
                    const SecondNameOfLikedUser = fetchSnap.data().SecondName;
                    const UsernameOfLikedUser = fetchSnap.data().Username;
                    const ProfilePicOfLikedUser = fetchSnap.data().ProfilePic;
                    const CreatedTimeOfLikedUser = fetchSnap.data().CreatedAt;
const MyFollowersFollower = fetchSnap.data().Followers;
const UserId = Followers[i]
                    const WhoFollowedDiv = document.querySelector(".WhoFollowedDiv");
                    const WhoFollowedCont = document.querySelector(".WhoFollowedCont");
                    WhoFollowedDiv.style.transform = "translate(0%,0%)";

                    document.querySelector("#DisplayFollowersCountInWhoFollowed").textContent = `${Followers.length} Followers`;

                    const WhoLikedClutter = `
   <div class="WhoLikedUsersCont" id=${UserId}>
                            <div class="WhoLikedUsersSmall">
                                <div class="WhoLikedImg">
                                    <img src="${ProfilePicOfLikedUser}" alt="">
                                </div>
                                <div class="WhoLikedDets">
                                    <div class="WhoLikedUsername">
                                        <h3>${UsernameOfLikedUser}</h3>
                                    </div>
                                    <div class="WhoLikedName">
                                        <p>${FirstNameOfLikedUser}</p><p>${SecondNameOfLikedUser}</p>
                                    </div>  
                                </div> 
                            </div>
                            <div class="WhoLikedFollow">
 <button class="WhoFollowedFollowButton" data-userid="${Followers[i]}">Follow</button>
                            </div>
                        </div>`;


  WhoFollowedCont.insertAdjacentHTML('beforeend', WhoLikedClutter);
                    
                    

                  
                }
followersDivProcessing = false                     
 
                const MyFollowersFollower = fetchSnap.data().Followers;


for (let i = 0;i < MyFollowersFollower.length; i++ ) {
if (MyFollowersFollower[i].includes(user.uid)) {
let FollowFlag = 1;
var WhoFollowedFollowButtons = document.querySelectorAll(`.WhoFollowedFollowButton`)
WhoFollowedFollowButtons.forEach(async function(WhoFollowedFollowButton) {
if(FollowFlag === 1) {
        WhoFollowedFollowButton.textContent = "Unfollow";
        WhoFollowedFollowButton.style.backgroundColor = "#EFEFEF";
        WhoFollowedFollowButton.style.color = "#000";     
WhoFollowedFollowButton.style.display="initial"

    } else {
    
        WhoFollowedFollowButton.textContent = "Follow";
        WhoFollowedFollowButton.style.backgroundColor = "#0195F7";
        WhoFollowedFollowButton.style.color  = "#fff";
WhoFollowedFollowButton.style.display="initial"
    }
    
  })
}
}
            }
function SendFollowersUserDets(){
var WhomIFollowedConts = document.querySelectorAll(".WhoLikedUsersCont") 
WhomIFollowedConts.forEach(WhomIFollowedCont => {
WhomIFollowedCont.addEventListener("click",function(){
var WhoLikedUsersConts = document.querySelectorAll(".WhoLikedUsersCont") 
WhoLikedUsersConts.forEach(WhoLikedUsersCont => {
WhoLikedUsersCont.addEventListener("click", function(){
if (event.target.tagName !== 'BUTTON') {
 var PosterUserId = WhoLikedUsersCont.id;
l
if (PosterUserId === user.uid) {
window.location.href="profile.html"
}else {
window.location.href = 'user.html?PosterUserId='+ encodeURIComponent(PosterUserId);
} 
}
})
}) 
}) 
})
}
SendFollowersUserDets() 

            const FollowDivBack = document.querySelector("#FollowDivBack");
            FollowDivBack.addEventListener("click", function() {
                const WhoFollowedDiv = document.querySelector(".WhoFollowedDiv");
                const WhoFollowedCont = document.querySelector(".WhoFollowedCont");
                WhoFollowedCont.innerHTML = "";
                WhoFollowedDiv.style.transform = "translate(100%,0%)";
            });
            
            
            
 

            const FollowButtons = document.querySelectorAll(".WhoFollowedFollowButton");
            FollowButtons.forEach(button => {
                button.addEventListener("click", async function() {
                    const userId = button.getAttribute("data-userid");
                    const FollowersRef = doc(db, 'Users', userId);
                    const FollowingRef = doc(db, 'Users', myId);
const MyChatsRef = doc(db, 'Users', myId);

                    const isFollowing = button.textContent === "Unfollow";

                    if (isFollowing) {
    await updateDoc(FollowersRef, { Followers: arrayRemove(myId) });
    await updateDoc(FollowingRef, { Following: arrayRemove(userId) });
                        button.textContent = "Follow";
                        button.style.backgroundColor = "#0195F7";
                        button.style.color = "#fff";
                    } else {
     await updateDoc(FollowersRef, { Followers: arrayUnion(myId) });
    await updateDoc(FollowingRef, { Following: arrayUnion(userId) });    
 const combinedId = userId + myId
await updateDoc(MyChatsRef, { MyChats: arrayUnion(combinedId) });
await setDoc(doc(db, "UsersChats", combinedId), {
  Message: [],
  LastMessage:[]
});   


await setDoc(doc(db, "UsersChats", combinedId),{messages:[]})

  
                        button.textContent = "Unfollow";
                       button.style.backgroundColor = "#EFEFEF";
                       button.style.color = "#000";
                    }
                });
            });
        } else {
            console.log("No such document!");
        }
    });
}

displayWhoHasFollowedMe();





let followingDivProcessing = false

async function displayWhomIHaveFollowed() {
var MyProfileFollowing = document.querySelector(".MyProfileFollowing");

MyProfileFollowing.addEventListener("click",async function(){


if (followingDivProcessing) return;
followingDivProcessing = true          


 var WhomIFollowedDiv = document.querySelector(".WhomIFollowingDiv").style.transform="translate(0,0)"
var MyProfileFollowing = document.querySelector(".MyProfileFollowing")
 const myId = MyProfileFollowing.id;
        const docRef = doc(db, "Users", myId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const Followers = docSnap.data().Following;

            for (let i = 0; i < Followers.length; i++) {
                const fetchUsers = doc(db, "Users", Followers[i]);
                const fetchSnap = await getDoc(fetchUsers);

                if (fetchSnap.exists()) {
                    const FirstNameOfLikedUser = fetchSnap.data().FirstName;
                    const SecondNameOfLikedUser = fetchSnap.data().SecondName;
                    const UsernameOfLikedUser = fetchSnap.data().Username;
                    const ProfilePicOfLikedUser = fetchSnap.data().ProfilePic;
                    const CreatedTimeOfLikedUser = fetchSnap.data().CreatedAt;
const MyFollowersFollower = fetchSnap.data().Followers;
                    const WhoFollowedDiv = document.querySelector(".WhoFollowedDiv");
                    const WhoFollowedCont = document.querySelector(".WhomIFollowingCont");
const UserId = Followers[i]                    

                    document.querySelector("#DisplayFollowingCountInWhoFollowed").textContent = `${Followers.length} Following`;

                    const WhoLikedClutter = `
                        <div class="WhoLikedUsersCont" id=${UserId}>
                            <div class="WhoLikedUsersSmall">
                                <div class="WhoLikedImg">
                                    <img src="${ProfilePicOfLikedUser}" alt="">
                                </div>
                                <div class="WhoLikedDets">
                                    <div class="WhoLikedUsername">
                                        <h3>${UsernameOfLikedUser}</h3>
                                    </div>
                                    <div class="WhoLikedName">
                                        <p>${FirstNameOfLikedUser}</p><p>${SecondNameOfLikedUser}</p>
                                    </div>  
                                </div> 
                            </div>
                            <div class="WhoLikedFollow">
 <button class="WhoFollowedFollowButton" data-userid="${Followers[i]}">Follow</button>
                            </div>
                        </div>`;

                    WhoFollowedCont.innerHTML += WhoLikedClutter;
                }
               followingDivProcessing = false 
    
              const MyFollowersFollower = fetchSnap.data().Followers;


for (let i = 0;i < MyFollowersFollower.length; i++ ) {
if (MyFollowersFollower[i].includes(user.uid)) {
let FollowFlag = 1;
var WhoFollowedFollowButtons = document.querySelectorAll(`.WhoFollowedFollowButton`)
WhoFollowedFollowButtons.forEach(async function(WhoFollowedFollowButton) {
if(FollowFlag === 1) {
        WhoFollowedFollowButton.textContent = "Unfollow";
        WhoFollowedFollowButton.style.backgroundColor = "#EFEFEF";
        WhoFollowedFollowButton.style.color = "#000";     
WhoFollowedFollowButton.style.display="initial"

    } else {
    
        WhoFollowedFollowButton.textContent = "Follow";
        WhoFollowedFollowButton.style.backgroundColor = "#0195F7";
        WhoFollowedFollowButton.style.color  = "#fff";
WhoFollowedFollowButton.style.display="initial"
    }
    
  })
}
}
            }
function SendFollowingUserDets(){
var WhomIFollowedConts = document.querySelectorAll(".WhoLikedUsersCont") 
WhomIFollowedConts.forEach(WhomIFollowedCont => {
WhomIFollowedCont.addEventListener("click",function(){
var WhoLikedUsersConts = document.querySelectorAll(".WhoLikedUsersCont") 
WhoLikedUsersConts.forEach(WhoLikedUsersCont => {
WhoLikedUsersCont.addEventListener("click", function(){
if (event.target.tagName !== 'BUTTON') {
 var PosterUserId = WhoLikedUsersCont.id;

if (PosterUserId === user.uid) {
window.location.href="profile.html"
}else {
window.location.href = 'user.html?PosterUserId='+ encodeURIComponent(PosterUserId);
} 
}
})
}) 
}) 
})
}
SendFollowingUserDets() 
            const FollowDivBack = document.querySelector("#FollowDivBack");
            FollowDivBack.addEventListener("click", function() {
                const WhoFollowedDiv = document.querySelector(".WhoFollowedDiv");
                const WhoFollowedCont = document.querySelector(".WhoFollowedCont");
                WhoFollowedCont.innerHTML = "";
                WhoFollowedDiv.style.transform = "translate(100%,0%)";
            });

            const FollowButtons = document.querySelectorAll(".WhoFollowedFollowButton");


            FollowButtons.forEach(button => {
                button.addEventListener("click", async function() {
                
                    const userId = button.getAttribute("data-userid");
                    console.log(userId)
                    const FollowersRef = doc(db, 'Users', userId);
                    const FollowingRef = doc(db, 'Users', myId);
                    const MyChatsRef = doc(db, 'Users', myId);

                    const isFollowing = button.textContent === "Unfollow";

                    if (isFollowing) {
                        await updateDoc(FollowersRef, { Followers: arrayRemove(myId) });
                        await updateDoc(FollowingRef, { Following: arrayRemove(userId) });
                        button.textContent = "Follow";
                        button.style.backgroundColor = "#0195F7";
                        button.style.color = "#fff";
                    } else {
       await updateDoc(FollowersRef, { Followers: arrayUnion(myId) });
      await updateDoc(FollowingRef, { Following: arrayUnion(userId) });
       const combinedId = userId + myId
await updateDoc(MyChatsRef, { MyChats: arrayUnion(combinedId) });
await setDoc(doc(db, "UsersChats", combinedId), {
  Message: [],
  LastMessage:[]
});   
      
      
                        button.textContent = "Unfollow";
                       button.style.backgroundColor = "#EFEFEF";
                       button.style.color = "#000";
                    }
                });
            });
        } else {
            console.log("No such document!");
        }
    });
}




displayWhomIHaveFollowed()


  var likeBtns = document.querySelectorAll(".likeIt");
            likeBtns.forEach(async function(likeBtn) { 
               var postId = likeBtn.id;
        const docRef = doc(db, 'Users Post', postId);  
            const updatedDoc = await getDoc(docRef);
        const updatedLikeCount = updatedDoc.data().Like.length;
    const likeCountElement = document.getElementById(`likeCount_${postId}`);
           
   likeCountElement.textContent = formatLikes(updatedLikeCount);
                 
           if (updatedLikeCount <= 1) {
         
    likeCountElement.textContent = formatLikes(updatedLikeCount); 
    }
    else {
   likeCountElement.textContent = formatLikes(updatedLikeCount);  
     
    } 
    const FormatLike = formatLikes(updatedLikeCount);              
       
 })               
               
       
 
   
   

var likeFlag = 0;
                var likeBtns = document.querySelectorAll(".likeIt");


        likeBtns.forEach(function(likeBtn) { 
      likeBtn.addEventListener("click", async function() {
       
       
       
      })
    likeBtn.addEventListener("click", async function() {
    
        var postId = likeBtn.id;
        const docRef = doc(db, 'Users Post', postId);  

        if (likeFlag === 0) {  
           likeFlag = 1;
            likeBtn.classList = "fa-solid fa-heart";
            likeBtn.style.color = "#FF3040";
            const UpdateLike = await updateDoc(docRef, {
                Like: arrayUnion(user.uid)
            })  
            
        const updatedDoc = await getDoc(docRef);
        const updatedLikeCount = updatedDoc.data().Like.length;
        const likeCountElement = document.getElementById(`likeCount_${postId}`);
        likeCountElement.textContent = formatLikes(updatedLikeCount)
        if (updatedLikeCount <= 1) {
         
    likeCountElement.textContent = formatLikes(updatedLikeCount)
    }
    else {
   likeCountElement.textContent = formatLikes(updatedLikeCount)
     
    }         
        } 
        else {
           likeFlag = 0;
            likeBtn.classList = "fa-regular fa-heart";
            likeBtn.style.color = "black";
            const UpdateLike = await updateDoc(docRef, {
                Like: arrayRemove(user.uid)
            })   
           
        const updatedDoc = await getDoc(docRef);
        const updatedLikeCount = updatedDoc.data().Like.length;
        const likeCountElement = document.getElementById(`likeCount_${postId}`);
        likeCountElement.textContent = formatLikes(updatedLikeCount)
        
         if (updatedLikeCount <= 1) {
         
    likeCountElement.textContent = formatLikes(updatedLikeCount)
    }else {
   likeCountElement.textContent = formatLikes(updatedLikeCount) 
     
    }    


  
  

 
            
        }
        })
        
    
    
    
      
    
  })
                
     function formatLikes(count) {
    if (count >= 1000000000) {
        return `${(count / 1000000000).toFixed(1)}B Likes`;
    } else if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M Likes`;
    } else if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K Likes`;
    } else {
        return `${count} Likes`;
    }
}            
       
     }
    }
    else {
       window.location.href = "login.html";
    }
 }) 

    
            
const FollowingDivBack = document.querySelector("#FollowingDivBack");
FollowingDivBack.addEventListener("click", function() {         
  const WhomIFollowedDiv = document.querySelector(".WhomIFollowingDiv");
  const WhomIFollowedCont = document.querySelector(".WhomIFollowingCont");
  WhomIFollowedCont.innerHTML = "";
  WhomIFollowedDiv.style.transform = "translate(100%,0)";
 });
