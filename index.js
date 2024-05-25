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
        const userDoc = await getDoc(doc(db, "Users", user.uid));
       
        if (userDoc.exists()) {
            const FirstName = userDoc.data().FirstName;
            const SecondName = userDoc.data().SecondName;
            const Username = userDoc.data().Username;
            const ProfilePic = userDoc.data().ProfilePic;
            const CreatedTime = userDoc.data().CreatedAt;

            var storyDiv = document.querySelector('.story')            
            var storyClutter = "";

            storyClutter += `
            <div class="personalStory">
                <div class="personalStoryImg">
                    <img src=${ProfilePic} alt="">
                </div>
                <span>Your Story</span>
            </div>` 

            storyDiv.innerHTML = storyClutter;          

            const q = query(collection(db, "Users Post"));
            const querySnapshot = await getDocs(q);
            
            var postDiv = document.querySelector('.Post');
            var postClutter = "";

            querySnapshot.forEach((doc) => {
            
     
            
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
                <h5>${timeAgo(TimeStamp)}</h5>            
            </div>                        
            <div class="PostImg">
                <img src="${UserPostPic}" alt="" class="blurry-image">  
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
<h4 id="PostWholeTitle">${formattedCaption}</h4>
            </div>  
        </div>`;


})


    
            postDiv.innerHTML = postClutter;
  
  
function SendUserDets(){
var PosterDets = document.querySelectorAll(".PosterDets") 
PosterDets.forEach(PosterDet => {
PosterDet.addEventListener("click",function(dets){

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
  
  
  let LikesProcessing = false;
async function displayLikedByUsername() {
    var likeBtns = document.querySelectorAll(".likeIt");
    var PostLikeCounts = document.querySelectorAll('.PostLikeCount');

    PostLikeCounts.forEach(async function(PostLikeCount) {
        PostLikeCount.addEventListener("click", async function() {
LikesProcessing = true;        
            let trimmedId = PostLikeCount.id.replace("likeCount_", "");
            const docRef = doc(db, 'Users Post', trimmedId);
            const fetchDoc = await getDoc(docRef);
            
            if (fetchDoc.exists()) {
                let likes = fetchDoc.data().Like;
                   
                if (Array.isArray(likes)) {
                   
                    
for (let i = 0; i < likes.length; i++ ) {
console.log(likes[i]) 
                                 
                        const docRef2 = doc(db, 'Users', likes[i]);
                        const fetchDoc2 = await getDoc(docRef2);
                        if (fetchDoc2.exists()) {
const FirstNameOfLikedUser = fetchDoc2.data().FirstName;
const SecondNameOfLikedUser = fetchDoc2.data().SecondName;
const UsernameOfLikedUser = fetchDoc2.data().Username;
const ProfilePicOfLikedUser = fetchDoc2.data().ProfilePic;
const CreatedTimeOfLikedUser = fetchDoc2.data().CreatedAt;
const UserId = likes[i]
const Followers = fetchDoc2.data().Followers;
const Following = fetchDoc2.data().Following;



var WhoLikedDiv = document.querySelector(".WhoLikedDiv")

var WhoLikedCont = document.querySelector(".WhoLikedCont")
WhoLikedDiv.style.transform="translate(0%,0%)"

document.querySelector("#DisplayLikesCountInWhoLiked").textContent=`${likes.length} likes`;
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
<button class="WhoLikedFollowButton WhoLikedFollowButton_${likes[i]}" id=${likes[i]}>Follow</button>
<button class="SeeProfile" id=${likes[i]} style="display:none;"><p>See Profile</p></button>
 </div>
</div>`



WhoLikedCont.innerHTML += WhoLikedClutter; 

         }
LikesProcessing = false;


var WhoLikedUsersConts = document.querySelectorAll(".WhoLikedUsersCont")  

var WhoLikedFollowButtons = document.querySelectorAll(`WhoLikedFollowButton_${likes[i]}`);
var FollowFlag = 0;
WhoLikedFollowButtons.forEach(async function(WhoLikedFollowButton) {
const FollowersRef = doc(db, 'Users', WhoLikedFollowButton.id);  
const FollowingRef = doc(db, 'Users', user.uid);  
const Followers = fetchDoc2.data().Followers;
const Following = fetchDoc2.data().Following;
})
var WhoLikedFollowIdButtons = document.querySelectorAll(`.WhoLikedFollowButton_${likes[i]}`);

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
 for (let i = 0; i < likes.length; i++){
 if (likes[i].includes(user.uid)) {
 var WhoLikedFollowIdButtons = document.querySelectorAll(`.WhoLikedFollowButton_${likes[i]}`);

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
 }  
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
const MyChatsRef = doc(db, 'Users', user.uid);  
const Followers = fetchDoc2.data().Followers;
const Following = fetchDoc2.data().Following;
    WhoLikedFollowButton.addEventListener("click", async function() {
    
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
        }
      } else {
                    const docRef2 = doc(db, 'Users', likes[i]);
                    const fetchDoc2 = await getDoc(docRef2);
                    if (fetchDoc2.exists()) {
const FirstNameOfLikedUser = fetchDoc2.data().FirstName;
const SecondNameOfLikedUser = fetchDoc2.data().SecondName;
const UsernameOfLikedUser = fetchDoc2.data().Username;
const ProfilePicOfLikedUser = fetchDoc2.data().ProfilePic;
const CreatedTimeOfLikedUser = fetchDoc2.data().CreatedAt;
const UserId = likes[i];
                        
                    }
                    
                    
                }
            } else {
                console.log("Post not found");
            }
            
        });
    });
}

displayLikedByUsername();




    
             function displayLikes() {
            
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
            }    
        
   displayLikes();
   
   

var likeFlag = 0;
                var likeBtns = document.querySelectorAll(".likeIt");


                likeBtns.forEach(function(likeBtn) { 
      
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
      ;   
    likeCountElement.textContent = formatLikes(updatedLikeCount)
    }else {
    
   likeCountElement.textContent = formatLikes(updatedLikeCount) 
     
    }    
        }
    
    
    
      })
    })
  } 
                
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
                function timeAgo(timestamp) {
                    if (!timestamp || !timestamp.seconds) {
                        return 'Invalid timestamp';
                    }

                    const current = new Date();
                    const previous = new Date(timestamp.seconds * 1000);
                    const diff = current - previous;
                    const seconds = Math.floor(diff / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours = Math.floor(minutes / 60);
                    const days = Math.floor(hours / 24);
                    const weeks = Math.floor(days / 7);
                    const months = Math.floor(days / 30);
                    const years = Math.floor(months / 365)

                    if (seconds < 60) {
                        return 'just now';
                    } else if (minutes < 60) {
                        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
                    } else if (hours < 24) {
                        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
                    } else if (days < 7) {
                        return `${days} day${days > 1 ? 's' : ''} ago`;
                    } else if (weeks < 4) {
                        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
                    } else {
                        return `${months} month${months > 1 ? 's' : ''} ago`;
                    }
                }

               
        } 
        else {
            window.location.href = "login.html";
        } 
    })
       




  function removeImageBlur() {
    const images = document.querySelectorAll('img.blurry-image');
    images.forEach(image => {      
        if (image.complete) {
            // Image is already loaded
            image.classList.remove('blurry-image'); 
        } else {
            // Image is not loaded yet, wait for the 'load' event
            image.addEventListener('load', () => {
                image.classList.remove('blurry-image'); 
            });
        }
    });
}
window.addEventListener("load",removeImageBlur())

