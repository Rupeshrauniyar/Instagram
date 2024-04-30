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

            const MyuserName = document.querySelector("#MyuserName").textContent = Username;

            var MyProfileClutter = "";
            var MyProfile = document.querySelector(".MyProfile");

            MyProfileClutter += `<div class="MyProfilePic">
                                    <img src=${ProfilePic} alt="" id="MyProfileImg">
                                    <div class="MyName">
                        <p>${FirstName} </p> 
                                       <p>${SecondName}</p>
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
                                        <h3>Following</h3>
                                    </div>
                                </div>`;

            MyProfile.innerHTML = MyProfileClutter;

            const q = query(collection(db, "Users Post"));
            const querySnapshot = await getDocs(q);

            var MyPostClutter = ""; // Move the initialization outside the forEach loop
            var MyPostDiv = document.querySelector('.MyPost');

            querySnapshot.forEach((doc) => {
                var postId = doc.data().PostuserId;

                if (postId === user.uid) {
                    const PostFirstName = doc.data().PostFirstName;
                    const PostSecondName = doc.data().PostSecondName;
                    const PostUsername = doc.data().PostUsername;
                    const PostProfilePic = doc.data().PostProfilePic;
                    const PostCaption = doc.data().UserPostCaption;
                    const UserPostPic = doc.data().UserPostPic;
                    const CreatedTime = userDoc.data().CreatedAt;

                    MyPostClutter += `<div class="PostCont"> 
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
                                            <p>${PostCaption}</p>
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
                }
            });

            MyPostDiv.innerHTML = MyPostClutter; 

            var LogOutBtn = document.querySelector('#LogOut');

            LogOutBtn.addEventListener("click", function() {
                signOut(auth).then(() => {
                    alert("Logged Out Successfully.");
                }).catch((error) => {});
            });
        }
    } else {
        window.location.href = "login.html";
    }
});
    
