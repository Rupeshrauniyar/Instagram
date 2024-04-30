import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, collection, doc, getDoc,getDocs, addDoc, query,updateDoc, arrayUnion, arrayRemove} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
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





const likedByUser = Like.includes(user.uid);

    // Determine the heart icon class based on whether the user has liked the post or not
    const heartIconClass = likedByUser ? "ri-heart-fill" : "ri-heart-line";
    const heartIconColor = likedByUser ? "#FF3040" : "black";

    // Generate post HTML content



    // Check if the post has a link in its caption
    const containsLink = /(?:https?|ftp):\/\/[\n\S]+/g.test(PostCaption);
    let formattedCaption = PostCaption;
    if (containsLink) {
        formattedCaption = PostCaption.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
    }

    // Generate post HTML content
    postClutter += `
        <div class="PostCont"> 
            <div class="PosterDets">
                <div class="PosterImage">
                    <img src="${PostProfilePic}" alt="">  
                </div>
                <span id="PosterName">${PostUsername}</span>
                <h5>${timeAgo(TimeStamp)}</h5>            
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
    <p>${Like.length} Likes</p>
</div>

     <div class="PostTitle">
<h4>${formattedCaption}</h4>
            </div>  
        </div>`;

})



    
            postDiv.innerHTML = postClutter;
            


                var likeBtns = document.querySelectorAll(".likeIt");
var likeFlag = 0;

                likeBtns.forEach(function(likeBtn) { 
                
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
             // Update like count in frontend
        const updatedDoc = await getDoc(docRef);
        const updatedLikeCount = updatedDoc.data().Like.length;
        const likeCountElement = document.getElementById(`likeCount_${postId}`);
        likeCountElement.textContent = `${updatedLikeCount} Likes`;
        if (updatedLikeCount <= 1) {
         
    likeCountElement.textContent = `${updatedLikeCount} Like`; 
    }else {
   likeCountElement.textContent = `${updatedLikeCount} Likes`;  
     
    }         
        } 
        else {
           likeFlag = 0;
            likeBtn.classList = "ri-heart-line";
            likeBtn.style.color = "black";
            const UpdateLike = await updateDoc(docRef, {
                Like: arrayRemove(user.uid)
            })   
            // Update like count in frontend
        const updatedDoc = await getDoc(docRef);
        const updatedLikeCount = updatedDoc.data().Like.length;
        const likeCountElement = document.getElementById(`likeCount_${postId}`);
        likeCountElement.textContent = `${updatedLikeCount} Likes`;
        
         if (updatedLikeCount <= 1) {
         
    likeCountElement.textContent = `${updatedLikeCount} Like`; 
    }else {
   likeCountElement.textContent = `${updatedLikeCount} Likes`;  
     
    }    
        }
    
    
    
      })
    })
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

