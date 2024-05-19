import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, collection, doc, getDoc,getDocs, addDoc, query,updateDoc, arrayUnion, arrayRemove,serverTimestamp, onSnapshot} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
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
    const TrimmedChatId = MyChats[i].replace(LoggedinUserId,"");
    
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
    <p id="DisplayLastMsg" id=${MyChats[i]}></p>
               </div>  
                 </div> 
                     </div>

          </div>
  </div>`

MessagingUsers.innerHTML += MessagingClutter
}


var UsersConts = document.querySelectorAll(".UsersCont")

UsersConts.forEach(async function(UsersCont) {

/* var UsersContId = UsersCont.id.toString(); 
const fetchUsersChats = doc(db, "UsersChats", UsersContId);
const fetchSnapChats = await getDoc(fetchUsersChats);  
  
const Messages = fetchSnapChats.data().Message;
const LastMessages = fetchSnapChats.data().LastMessage
console.log(LastMessages)
var DisplayLastMessages = document.querySelectorAll("#DisplayLastMsg")
DisplayLastMessages.forEach(DisplayLastMessage => {
for (let i = 0; i< MyChats.length; i++ ) {
DisplayLastMessage.innerHTML=LastMessages; 
}
}) */




UsersCont.addEventListener("click", async function(){
var nav = document.querySelector("nav")
nav.style.display="none"


let sendDivClutter = ""
var SendDivCont = document.querySelector(".sendCont")
sendDivClutter +=`<div class="SendDiv">
<input type="text" id="messageBox" placeholder="Message."> 
<div class="SendButtonDiv">
<i class="fa-sharp fa-solid fa-paper-plane" id="SendButton"></i>
</div>
</div>`

SendDivCont.innerHTML=sendDivClutter;
var UsersContId = UsersCont.id.toString(); 


const fetchUsersChats = doc(db, "UsersChats", UsersContId);
const fetchSnapChats = await getDoc(fetchUsersChats);  


  
const Messages = fetchSnapChats.data().Message;
var ChatBox = document.querySelector(".ChatBox")

ChatBox.style.transform="translate(0,0)";
if (ChatBox.style.transform="translate(0,0)") {
nav.style.display="none" 
}
var ChatCont = document.querySelector(".ChatCont")

ChatCont.style.transform="translate(0,0)";


var messageInpBox = document.querySelector("#messageBox")
var messageBox = document.querySelector(".message-box")

var messageClutter = "";
Messages.forEach(async function(Message) {
messageClutter += `<div class="message-content" data-userId=${Message.UserId}>
${Message.Message}
 </div>       `
messageBox.innerHTML=messageClutter;

const lastMessage = messageBox.lastElementChild;
      if (lastMessage) {
     lastMessage.scrollIntoView({ behavior: 'smooth' });
  }
  messageBox.scrollTop = messageBox.scrollHeight;
                    
})

var Back = document.querySelector("#Back")
Back.addEventListener("click", function(){
ChatBox.style.transform="translate(0,100%)";
ChatCont.style.transform="translate(0,100%)"; 
nav.style.display="flex"
messageBox.innerHTML=null;

})
async function SetDocuments() {

var messageInpBox = document.querySelector("#messageBox");
var UsersContId = UsersCont.id

const ChatsRef = doc(db, "UsersChats", UsersContId);
var SendButton = document.querySelector("#SendButton")

 

SendButton.addEventListener("click",async function(){

var messageInpBoxValue = document.querySelector("#messageBox").value;




   const MyChats = userDoc.data().MyChats
 const timestamp = new Date();    
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
 UserId: user.uid,
randomId: timestamp+user.uid,
Time: timestamp
}

document.querySelector("#messageBox").value = "";
if (ReceiverUserMyChats.includes(UsersContId)) {
await updateDoc(ChatsRef,{
    Message: arrayUnion(NewMessage)
}); 
await updateDoc(ChatsRef, {
    LastMessage: messageInpBoxValue
}); 
}else {
await updateDoc(ChatsRef,{
    Message: arrayUnion(NewMessage)
}); 

await updateDoc(ChatsUsersRef, {
    MyChats: arrayUnion(UsersContId)
}); 
await updateDoc(ChatsRef, {
    LastMessage: messageInpBoxValue
}); 

}






}
})
}


SetDocuments()
async function FindMessageAuthor() {


const fetchUsersChats = doc(db, "UsersChats", UsersContId);
const fetchSnapChats = await getDoc(fetchUsersChats);  

const Mess = fetchSnapChats.data().Message
for (let i= 0; i< Mess.length; i++ ) {
const MessId = Mess[i].UserId

}
}
setInterval(FindMessageAuthor,100);



function displayMessages(messages, currentUserId) {
    let messageClutter = "";
    messages.forEach(message => {
        const DivAligner = message.UserId === currentUserId ? 'messages-content-right' : 'messages-content-left';
        messageClutter += `
            <div class="messages-container ${DivAligner}">
                <div class="message-content" data-userId="${message.UserId}">
                    ${message.Message}
                </div>
                <div class="margin-topper"></div>
            </div>`;
    });
    messageBox.innerHTML = messageClutter;
    const lastMessage = messageBox.lastElementChild;
    if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: 'smooth' });
    }
    messageBox.scrollTop = messageBox.scrollHeight;
}

// Assume user.uid is available in your scope
var sendAudio = new Audio("./sendMsg.mp3")
onSnapshot(fetchUsersChats, (docSnapshot) => {
    const updatedMessages = docSnapshot.data().Message || [];
    displayMessages(updatedMessages, user.uid);
    sendAudio.play()
});


                   

var Back = document.querySelector("#Back")
Back.addEventListener("click", function(){
ChatBox.style.transform="translate(0,100%)";
ChatCont.style.transform="translate(0,100%)"; 
nav.style.display="flex"
messageBox.innerHTML=null;

})

 



})
}) 











   }
    } else {
     window.location.href="login.html"
    }
    })
  
 
  
    
    
    
    
    
   
    
    
    
    
    
