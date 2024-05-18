import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, collection, doc, getDoc,getDocs, addDoc, query,updateDoc, arrayUnion, arrayRemove, FieldValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
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
     
     for (let i = 0; i< MyChats.length; i++ ) {
    const LoggedinUserId = user.uid;     
    const TrimmedChatId = MyChats[i].replace(LoggedinUserId, "");
    
   
  const fetchUsers = doc(db, "Users", TrimmedChatId);
  const fetchSnap = await getDoc(fetchUsers);  
  
const MyChatsFirstName = fetchSnap.data().FirstName;
const MyChatsSecondName = fetchSnap.data().SecondName;
const MyChatsUsername = fetchSnap.data().Username;
const MyChatsProfilePic = fetchSnap.data().ProfilePic;
const MyChatsCreatedTime = fetchSnap.data().CreatedAt;
const MyChatsFollowers = fetchSnap.data().Followers;
const MyChatsFollowing = fetchSnap.data().Following;


 
 
 
    
  
     
     
     
     
var MessagingClutter ="";
var MessagingUsers = document.querySelector(".MessagingUsers")

 

MessagingClutter = `<div class="UsersCont" id=${MyChats[i]}>
   <div class="WhoLikedUsersCont" >
   <div class="WhoLikedUsersSmall">
   <div class="WhoLikedImg">
  <img src=${MyChatsProfilePic} alt="">
   </div>
 <div class="WhoLikedDets">
    <div class="WhoLikedUsername">
  <h3>${MyChatsUsername}</h3>
         </div>
    <div class="WhoLikedName">
    <p>Hello Hello Mic Check Check Check...</p>
               </div>  
                 </div> 
                     </div>

          </div>
  </div>`

MessagingUsers.innerHTML += MessagingClutter
}


var UsersConts = document.querySelectorAll(".UsersCont")

UsersConts.forEach(async function(UsersCont) {
UsersCont.addEventListener("click", async function(){

const UsersContId = UsersCont.id.toString(); 

const fetchUsersChats = doc(db, "UsersChats", UsersContId);
const fetchSnapChats = await getDoc(fetchUsersChats);  
  
const Messages = fetchSnapChats.data().Message;
var ChatBox = document.querySelector(".ChatBox")

ChatBox.style.transform="translate(0,0)";
var messageInpBox = document.querySelector("#messageBox")
var messageBox = document.querySelector(".message-box")

var messageClutter = "";
function fetchDoc() {
 

Messages.forEach(async function(Message) {
messageClutter += `<div class="message-content" data-userId=${Message.UserId}>
<p id="Message_Name">${Message.Message}</p>
 </div>       `
messageBox.innerHTML=messageClutter;
})
}
fetchDoc()
async function SetDocuments() {

var messageInpBox = document.querySelector("#messageBox");


 





var UsersContId = UsersCont.id

const ChatsRef = doc(db, "UsersChats", UsersContId);
var SendButton = document.querySelector("#SendButton")

 

SendButton.addEventListener("click",async function(){
var messageInpBoxValue = document.querySelector("#messageBox").value;


   const MyChats = userDoc.data().MyChats
     
     for (let i = 0; i< MyChats.length; i++ ) {
    const LoggedinUserId = user.uid;     
    const TrimmedChatId = MyChats[i].replace(LoggedinUserId, "");   
  const fetchUsers = doc(db, "Users", TrimmedChatId);
  const fetchSnap = await getDoc(fetchUsers);  
 const ReceiverUserMyChats = fetchSnap.data().MyChats
 
 
 const ChatsUsersRef = doc(db, "Users", TrimmedChatId); 


const NewMessage = {
 Message:messageInpBoxValue,
 Name: FirstName,
 UserId: user.uid
}

if (ReceiverUserMyChats.includes(UsersContId)) {
await updateDoc(ChatsRef,{
    Message: arrayUnion(NewMessage)
}); 
  
}else {
await updateDoc(ChatsRef,{
    Message: arrayUnion(NewMessage)
}); 
await updateDoc(ChatsUsersRef, {
    MyChats: arrayUnion(UsersContId)
}); 

}






}
})
}


SetDocuments()
async function FindMessageAuthor() {
  const messageContents = document.querySelectorAll(".message-content");
  const fetchUsersChats = doc(db, "UsersChats", UsersContId);
  const fetchSnapChats = await getDoc(fetchUsersChats);    
  const Messages = fetchSnapChats.data().Message;

  messageContents.forEach(messageContent => {
    const messagerUserId = messageContent.getAttribute("data-userid");

    if (messagerUserId === user.uid) {
      messageContent.classList.add("message-right");
      messageContent.classList.remove("message-left");
      console.log("yess")
    } else {
      messageContent.classList.add("message-left");
      messageContent.classList.remove("message-right");
    }
  });
}
FindMessageAuthor()
setInterval(FindMessageAuthor, 1000);

async function fetchAndUpdateMessages() {
  try {
    const updatedDoc = await getDoc(fetchUsersChats);
    const updatedMessages = updatedDoc.data().Message || [];
    let messageClutter = "";
    updatedMessages.forEach(message => {
      messageClutter += `
        <div class="message-content"><p id="Message_Name">${message.Name}</p>${message.Message}</div>`;
    });
    messageBox.innerHTML = messageClutter;
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}

// Call the function every second
setInterval(fetchAndUpdateMessages, 1000);

// Optionally, call the function immediately to fetch messages on page load
fetchAndUpdateMessages();
                            

document.querySelector("#messageBox").addEventListener("keypress", (e) => {
if (e.key === 'Enter') {
 SetDocuments();
                        }
                    });
})
}) 











   }
    } else {
     window.location.href="login.html"
    }
    })
  
 
  
    
    
    
    
    
   
    
    
    
    
    
