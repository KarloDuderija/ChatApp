const socket = io("http://localhost:3000");

let el = document.querySelector('#ListOfRooms');
if(el) {


}

function bakeCookieForUser() {
    let username;
    username =  document.getElementById("login-username").value;
    document.cookie = "ChatAppUser=" + username;
} //here we set cookie of the user on submit form button click

function getCookie() {
    let re = /(;\s*|^)ChatAppUser=(\w+)/;
    let matches = document.cookie.match(re);
    return matches ? matches[matches.length-1] : null;
}

function logoutThisUser() {
    let me = getCookie();
    socket.emit('remove' ,me);
    socket.disconnect();
    deleteCookie('ChatAppUser='+me);
}

function deleteCookie (name) {
    console.log('deleting cookies...');
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function sendMessages() {
    let msg = document.getElementById('rm-messages');
    let me = getCookie();
    let name = localStorage.getItem(socket.id);
    socket.emit('reqForMsg' , name, me, msg.value);
    msg.value='';
}

function exitRoom() {
    let me = getCookie();
    let modal = document.querySelector(".room-modal");
    modal.style.display = "none";
    let name = localStorage.getItem(socket.id);
    console.log(name);
    socket.emit('leaveRoom' , name, me);
    localStorage.removeItem(socket.id);
}

function roomCreation() {
    let modal = document.querySelector(".cr-room-modal");
    modal.style.display = "block";
}

function create() {
    let modal = document.querySelector(".cr-room-modal");
    let roomId =  document.getElementById("roomid");
    modal.style.display = "none";
    socket.emit('createSpecificRoom' , roomId.value);
    roomId.value = '';
}

function enterRoom(name) {
    let me = getCookie();                   //get my username
    if(name.innerHTML)                      // get the value not the dom element
        name = name.innerHTML;
    socket.emit('roomJoin' , name , me);    // send that info to the server
    let modals = document.querySelector(".room-modal");
    modals.style.display = "block";
    localStorage.setItem(socket.id, name);  //set the current room on socket id
}

