const socket = io("http://localhost:3000");

let el = document.querySelector('#ListOfRooms');
if(el) {


}

function bakeCookieForUser() {
    let username;
    username =  document.getElementById("login-username").value;
    document.cookie = "ChatAppUser=" + username;
}

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
} //name refers to the room name, me is my username

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
    let me = getCookie();
    if(name.innerHTML)
    {
        name = name.innerHTML;
    }
    socket.emit('roomJoin' , name , me);
    let modals = document.querySelector(".room-modal");
    modals.style.display = "block";
    localStorage.setItem(socket.id, name);
}

function triggerTalk(target) {
    let me = getCookie();
    if(target.innerHTML)
    {
        target = target.innerHTML;
    }
    socket.emit('privateRoomJoin' , target , me);
    let modals = document.querySelector(".room-modal");
    modals.style.display = "block";
    socket.emit('findSpecific' , target, me);
    localStorage.setItem(socket.id, target + '' + me);
}

function foundUser (target , name) {
        socket.emit('privateRoomJoin' , target , name);
        localStorage.setItem(socket.id, target + '' + name);
        let modals = document.querySelector(".room-modal");
        modals.style.display = "block";
}