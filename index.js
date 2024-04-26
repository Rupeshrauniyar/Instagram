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



            
var storyDiv = document.querySelector('.story')            
var storyClutter = "";

storyClutter += `
<div class="personalStory">
 <div class="personalStoryImg">
  <img src=${ProfilePic} alt="">
 </div>
 <span>Your Story</span>
</div>` 

storyDiv.innerHTML= storyClutter;          
            
            
            
         

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

   
    const containsLink = /(?:https?|ftp):\/\/[\n\S]+/g.test(PostCaption);

   
    let formattedCaption = PostCaption;
    if (containsLink) {
        formattedCaption = PostCaption.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
    }

    postClutter += `
    <div class="PostCont"> 
        <div class="PosterDets">
            <div class="PosterImage">
                <img src="${PostProfilePic}" alt="">  
            </div>
            <span id="PosterName">${PostUsername}</span>  
        </div>
        <div class="PostImg">
            <img src="${UserPostPic}" alt="">  
        </div>
        <div class="PostTitle">
            <p>${formattedCaption}</p>
        </div>
        <div class="PostInteractionCont">
            <div class="PostInteraction">
                <i class="ri-heart-line" id="likeIt"></i> 
                <i class="ri-chat-3-line" id="commentIt"></i>
            </div>
            <div class="PostSave">
                <i class="ri-bookmark-line" id="saveIt"></i>
            </div> 
        </div>
    </div>`;
});

            postDiv.innerHTML = postClutter;
        } 
    } else {
        
        window.location.href = "login.html";
    }
});
