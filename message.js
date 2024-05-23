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


 


UsersCont.addEventListener("click", async function(dets){

var UsersContId = UsersCont.id.toString(); 
    const LoggedinUserId = user.uid;     
  const TrimmedChatId = UsersContId.replace(LoggedinUserId, "");   
  const fetchUsers = doc(db, "Users", TrimmedChatId);
  const fetchSnap = await getDoc(fetchUsers);  
 
 
const MyChatsFirstName = fetchSnap.data().FirstName;
const MyChatsSecondName = fetchSnap.data().SecondName;
const MyChatsUsername = fetchSnap.data().Username;
const MyChatsProfilePic = fetchSnap.data().ProfilePic;
const MyChatsCreatedTime = fetchSnap.data().CreatedAt;
const MyChatsFollowers = fetchSnap.data().Followers;
const MyChatsFollowing = fetchSnap.data().Following;


document.querySelector("#ChatProfilePic").src=`${MyChatsProfilePic}`
document.querySelector("#ChatFirstName").textContent=`${MyChatsFirstName}`
/* document.querySelector("#ChatSecondName").textContent=`${MyChatsSecondName}` */
document.querySelector("#ChatUsername").textContent=`${MyChatsUsername}`
var nav = document.querySelector("nav")
nav.style.display="none"


let sendDivClutter = ""
var SendDivCont = document.querySelector(".sendCont")
sendDivClutter +=`<div class="SendDiv">
 <input type="file" id="sendImage" style="display:none;">
 <label for="sendImage">
  <i class="fa-light fa-images" id="gallery"></i>
 </label>
<input type="text" id="messageBox" placeholder="Message."> 
<div class="SendButtonDiv">
<i class="fa-sharp fa-solid fa-paper-plane" id="SendButton"></i>
</div>
</div>`

SendDivCont.innerHTML=sendDivClutter;




let sendDivImgClutter = ""
var SendDivImgCont = document.querySelector(".ImageSendDiv")
sendDivImgClutter +=`
<div class="imageCont">
  <img src="" alt="" id="displaySendingImage">
 </div>
 <div class="ImageSendButtonDiv">
<label for="sendImage">
 <div class="ImageSendingCont">
  <i class="fa-light fa-images" id="gallery"></i>
  </div>
 </label><i class="fa-sharp fa-solid fa-paper-plane" id="ImageSendButton"></i>
</div>`

SendDivImgCont.innerHTML=sendDivImgClutter;



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
if (Message.image === undefined) {
var DivSet = `
<div class="msgArea">
  <p id="msg-area">${Message.Message}</p>
  </div>
  
  ` 
}else {
var DivSet = `
<div class="messageImgCont">
<img src=${Message.image} alt="">
 </div> 
     
  `  
}  
messageClutter += `
<div class="message-content" data-userId=${Message.UserId}>
${DivSet}

 </div>            `
messageBox.innerHTML=messageClutter;

const lastMessage = messageBox.lastElementChild;
if (lastMessage) {
    lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' });
} else {
    messageBox.scrollTop = messageBox.scrollHeight;
}

})
var Back = document.querySelector("#Back")
Back.addEventListener("click", function(){
ChatBox.style.transform="translate(0,100%)";
ChatCont.style.transform="translate(0,100%)"; 
document.querySelector(".ImageSendDiv").style.display="none"
 document.querySelector(".messageCont").style.display="flex"
 document.querySelector(".sendCont").style.display="flex"
 
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
     
    const LoggedinUserId = user.uid;     
    const TrimmedChatId = UsersContId.replace(LoggedinUserId, "");   
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
})




}

 
 
 
 

var sendImage = document.querySelector("#sendImage")
var ImageSrc; 
 sendImage.addEventListener("change", function(event){
ImageSrc = ""
 document.querySelector(".ImageSendDiv").style.display="flex"
 document.querySelector(".messageCont").style.display="none"
 document.querySelector(".sendCont").style.display="none"

ImageSrc = event.target.files[0]  

if (ImageSrc) {
const reader = new FileReader()
reader.onload = function(e){
document.querySelector("#displaySendingImage").src = e.target.result 
} 
reader.readAsDataURL(ImageSrc)
}
})
var ImageSendButton = document.querySelector("#ImageSendButton")


const ChatsRef = doc(db, "UsersChats", UsersContId);
ImageSendButton.addEventListener("click",async function(){
 
var UsersChatsRef = sRef(imgDb,"Users Chats Image/" + ImageSrc.name) 
var UploadImage = await uploadBytesResumable(UsersChatsRef,ImageSrc)
var ImageURL = await getDownloadURL(UploadImage.ref)
const timestamp = new Date();    
const NewMessageImage = {
image:ImageURL,
Name: FirstName,
UserId: user.uid,
randomId: timestamp+user.uid,
Time: timestamp
}
ImageSrc = "";
document.querySelector(".ImageSendDiv").style.display="none"
document.querySelector(".messageCont").style.display="flex"
document.querySelector(".sendCont").style.display="flex"

var ImageSendingCont = document.querySelector(".ImageSendingCont") 
const MyChats = userDoc.data().MyChats

const LoggedinUserId = user.uid;     
    const TrimmedChatId = UsersContId.replace(LoggedinUserId, "");   
  const fetchUsers = doc(db, "Users", TrimmedChatId);
  const fetchSnap = await getDoc(fetchUsers);  
 const ReceiverUserMyChats = fetchSnap.data().MyChats    
const ChatsUsersRef = doc(db, "Users", TrimmedChatId);

if (ReceiverUserMyChats.includes(UsersContId)) {
await updateDoc(ChatsRef,{
    Message: arrayUnion(NewMessageImage)
}); 
}else {
await updateDoc(ChatsRef,{
    Message: arrayUnion(NewMessageImage)
}); 

await updateDoc(ChatsUsersRef, {
    MyChats: arrayUnion(UsersContId)
}); 



}

})


 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
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
        const timestamp = message.Time;

        function timeAgo(timestamp) {
            const current = new Date();
            const previous = new Date(timestamp.seconds * 1000);
            const diff = current - previous;
            const seconds = Math.floor(diff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const weeks = Math.floor(days / 7);
            const months = Math.floor(days / 30);
            const years = Math.floor(months / 12); // Corrected the years calculation

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
            } else if (months < 12) {
                return `${months} month${months > 1 ? 's' : ''} ago`;
            } else {
                return `${years} year${years > 1 ? 's' : ''} ago`;
            }
        }

        const timeAgoText = timeAgo(timestamp);
        
        const divAligner = message.UserId === currentUserId ? 'messages-content-right' : 'messages-content-left';
  
  
if (message.image === undefined) {
var DivSet = `
<div class="msgArea">
  <p id="msg-area">${message.Message}</p>
  </div>
  <p id="displayTime">${timeAgoText}</p> 
  <div class="margin-topper"></div> 
  <div class="hello"></div>    
  ` 
}else {
var DivSet = `
<div class="messageImgCont">
<img src=${message.image} alt="">
<p id="displayTime">${timeAgoText}</p>
 </div> 
 <p id="displayTime">${timeAgoText}</p>   
 <div class="margin-topper"></div>  
 <div class="hello"></div> 
  `  
}  
  
        
        messageClutter += `
            <div class="messages-container ${divAligner}">
      <div class="message-content" data-userId="${message.UserId}">
                    
${DivSet}

              
                </div>
                <div class="margin-topper"></div>
            </div>`;
    });

    messageBox.innerHTML = messageClutter;
    const lastMessage = messageBox.lastElementChild;
if (lastMessage) {
    lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' });
} else {
    messageBox.scrollTop = messageBox.scrollHeight;
}

}

// Assume user.uid is available in your scope
var sendAudio = new Audio("./sendMsg.mp3");
onSnapshot(fetchUsersChats, (docSnapshot) => {
sendAudio.play();
    const updatedMessages = docSnapshot.data().Message || [];
    displayMessages(updatedMessages, user.uid);
    
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
  
 
  
    
    
    
    
    
   
    
    
    
    
    
