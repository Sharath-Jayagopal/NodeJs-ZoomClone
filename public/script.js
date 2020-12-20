// this is the fron end js , this is where we
// will be rendering the video or
// Add func

//get video and audio upload from browser
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;
const socket = io('/');

let peer = new Peer(undefined,{
    path:'/peerjs',
    host:'/',
    port:'3030',
});

// create a variable for the video Stream 
let myVideoStream;
// use the getUserMedia fn from naviagator return 
//media device instances , we get promise with a stream,
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true,
}).then((stream)=>{
    myVideoStream = stream;
    addVideoStream(myVideo,myVideoStream);

    //New user 
    socket.on('user-connected',(userId)=>{
        connectToNewUser(userId , stream);
    })

    // answer peer call 
    peer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream' , userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })
})

// fn to pass a videoStream to srcObjec in the videoTag
const addVideoStream = (video, stream) => { 
    video.srcObject = stream;
    video.addEventListener('loadedmetadata',()=> {
        video.play();
    })
    videoGrid.append(video);
    console.log("appended the video!!!!");
}

// on open will launch when you successfully 
//connect to PeerServer
// we will get an id when a peer connect to server
peer.on('open', id =>{
    console.log(id)
    socket.emit('join-room',ROOM_ID,id);
})

// Basically connect to another user and 
//get his video and
// audio stream and render it in our page.
const connectToNewUser = (userId , stream) =>{
    console.log("New user joined with id : "+userId)
    // call to user
    const call = peer.call(userId, stream);
    const video = document.createElement('video');

    //Show stream in some video/canvas element.
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
}

// let message = document.getElementById('chat_message')

// message.addEventListener('keydown',(e) => {
//     if(e.key == "Enter" && message.value.length !== 0){
//         console.log(message.value)
//         socket.emit('message',message.value);
//         message.value = "";
//     }
// })

 let message = $('input')
 $('html').keydown((e) => {
     //e.which is like e.keycode in js
     if(e.which == 13 && message.val().length !== 0) {
         console.log(message.val())
         socket.emit('message', message.val());
         message.val('');
     }
 })
 
 socket.on('createMessage', message => {
    let messageContainer = document.getElementById('messages');
    // messageContainer.append("<li class='message'>"+message+"</li>");
    messageContainer.insertAdjacentHTML('afterbegin',`<li class="message">${message}</li>`)
    console.log("from server ", message);
 })


const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if(enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        setUnmuteButton();
    }
    else {
        setMuteButton();
        myVideoStream.getAudioTracks()[0].enabled = true;
    }
}

const setUnmuteButton = () => {
    const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
    `
    document.querySelector('.main_mute_button').innerHTML = html;
}

const setMuteButton = () => {
    const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
    `
    document.querySelector('.main_mute_button').innerHTML = html;
}

const playStop = () => {
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    if(enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        setPlayVideo();
    }
    else {
        setStopVideo()
        myVideoStream.getVideoTracks()[0].enabled = true;
    }
}

const setPlayVideo = () => {
    const html = `
    <i class="stop fas fa-video-slash"></i>
    <span>Play Video</span>
    `
    document.querySelector('.main_video_button').innerHTML = html;
}

const setStopVideo = () => {
    const html = `
    <i class="fas fa-video"></i>
    <span>Stop Video</span>
    `
    document.querySelector('.main_video_button').innerHTML = html;
}