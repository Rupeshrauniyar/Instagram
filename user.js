import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, collection, doc, getDoc,getDocs, addDoc, query,updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
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
     var UserId = queryParams.PosterUserId;
console.log(UserId)     
     
        const userDoc = await getDoc(doc(db, "Users",  UserId ));
        if (userDoc.exists()) {
            const FirstName = userDoc.data().FirstName;
            const SecondName = userDoc.data().SecondName;
            const Username = userDoc.data().Username;
            const ProfilePic = userDoc.data().ProfilePic;
            const CreatedTime = userDoc.data().CreatedAt;
            const Followers = userDoc.data().Followers;
            const Following = userDoc.data().Following;
       
        
        
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
                                    <div class="MyProfileFollowers">
                    <p id="FollowersCount">${Followers.length}</p>
                                        <h3>Followers</h3>
                                    </div>
                                    <div class="MyProfileFollowing">
                                   <p>${Following.length}</p>
                                        <h3>Following</h3>
                                    </div>                                                                   
                                </div>
                               </div>
                                <div class="FollowFollowing">
                                <button id="FollowThem">Follow</button>
                                <button id="MessageThem">Message</button>
                               </div>
                               
                               `;

            MyProfile.innerHTML = MyProfileClutter;

const q = query(collection(db, "Users Post"));
const querySnapshot = await getDocs(q);

const uniquePostIds = new Set();

querySnapshot.forEach((doc) => {
    const PostUserId = doc.data().PostuserId;

    if (PostUserId.includes(UserId)) {
        const PostId = doc.id;
        uniquePostIds.add(PostId); 
    }
});


const postLength = uniquePostIds.size;
document.querySelector("#Postlength").textContent = postLength;

var FollowThem = document.querySelector("#FollowThem")
var FollowFlag = 0;
const FollowersRef = doc(db, 'Users', UserId);  
const FollowingRef = doc(db, 'Users', user.uid);  



if (Followers.includes(user.uid)) {
 FollowFlag=1
FollowThem.textContent="Unfollow" 
FollowThem.style.backgroundColor="#EFEFEF";
FollowThem.style.color="#000";
}else {
FollowFlag=0 
FollowThem.textContent="Follow" 
FollowThem.style.backgroundColor="#0195F7";
FollowThem.style.color="#fff";
}

FollowThem.addEventListener("click", async function(){
if (FollowFlag === 0) {


const UpdateFollowers = await updateDoc(FollowersRef, {
     Followers: arrayUnion(user.uid)
      }) 
      
 const UpdateFollowing = await updateDoc(FollowingRef, {
     Following: arrayUnion(UserId)
      }) 
      
      
      
      
       
      FollowFlag=1;  
      const updatedDoc = await getDoc(FollowersRef);
      const updatedFollowers = updatedDoc.data().Followers.length;
      FollowThem.textContent="Unfollow" 
      FollowThem.style.backgroundColor="#EFEFEF";
      FollowThem.style.color="#000";
 document.querySelector("#FollowersCount").textContent=`${updatedFollowers}`
}


else {


const UpdateFollowers = await updateDoc(FollowersRef, {
     Followers: arrayRemove(user.uid)
      })  
      
      
const UpdateFollowing = await updateDoc(FollowingRef, {
     Following: arrayRemove(UserId)
      }) 
      FollowFlag=0; 
      const updatedDoc = await getDoc(FollowersRef);
      const updatedFollowers = updatedDoc.data().Followers.length;
      FollowThem.textContent="Follow"  
      FollowThem.style.backgroundColor="#0195F7";
      FollowThem.style.color="#fff";
document.querySelector("#FollowersCount").textContent=`${updatedFollowers}` 
} 


})


 

            
            var postClutter = "";
            var postDiv = document.querySelector('.MyPost');

            querySnapshot.forEach((doc) => {
            const postId = doc.data().PostuserId; 
             if (postId === UserId) {
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

   
    const heartIconClass = likedByUser ? "ri-heart-fill" : "ri-heart-line";
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
                
                    <i class="ri-chat-3-line commentIt" id=""></i>
                    
                </div>
                
                <div class="PostSave">
                    <i class="ri-bookmark-line" id="saveIt"></i>
                </div> 
            </div>
  <div class="PostLikeCount" id="likeCount_${PostId}">
    <p></p>
</div>

     <div class="PostTitle">
<h4>${formattedCaption}</h4>
            </div>  
        </div>`;

}
})



    
            postDiv.innerHTML = postClutter;
}


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
            likeBtn.classList = "ri-heart-fill";
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
            likeBtn.classList = "ri-heart-line";
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
       
     }else {
       window.location.href = "login.html";
    }
    })
    
  

    
            
