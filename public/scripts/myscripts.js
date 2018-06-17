const socket = io("http://localhost:3000");
let username;
function testClick() {
  console.log("test click", socket);
  socket.emit("TEST", { foo: "bar" });
}

function triggerSocketForUser() {
  console.log("Client has logged in successfully: ");
  username = document.getElementById("login-username").value;
  socket.emit("user", username);
  document.cookie = "ChatAppUser=" + username;
  localStorage.setItem('username', username);
  console.log(username);
}

var user_id = null;
var newUser = true;
let temp;
var el = document.querySelector("#TestBDC");
var parentEl = document.querySelector("#ListOfUsers");
if (el) {
    window.addEventListener("load", function (e) {
        socket.emit("newUser", socket.id);
        var user = localStorage.getItem('username');
        localStorage.setItem(socket.id, user);
    });
    socket.on("LoggedIn", function (data) {
        console.log(data);
        updateUsers();
        console.log(localStorage.getItem(socket.id));
        temp = localStorage.getItem(socket.id);
        // temp = getCookie();
        // console.log(temp);
        for (var i = 0; i < data.length; i++) {
            if(temp !== data[i]){
                user_id = document.createTextNode(data[i]);
                var newEl = document.createElement("li");
                newEl.setAttribute("id", data[i]);
                newEl.setAttribute("onclick", "triggerTalk(this.id)");
                newEl.appendChild(user_id);
                parentEl.appendChild(newEl);
            }
        }
    });
        //every user listens for PM req
    socket.on('finding' , (data, name) => {
        if(''+localStorage.getItem(socket.id) === ''+data) {
            console.log(''+localStorage.getItem(socket.id)+data+name);
            console.log("im in!");
            socket.emit('create' , data , name );
            var modal = document.querySelector(".room-modal");
            modal.style.display = "block";
            receiveMsg();
        }
    });

}
function receiveMsg() {
    socket.on('newMsg' ,(message , sender) => {
        var par = document.getElementById('room-output');
        var text = document.createTextNode(sender + ': ' + message);
        var newEl = document.createElement("strong");
        newEl.appendChild(text);
        var newE = document.createElement("p");
        newE.appendChild(newEl);
        par.appendChild(newE);
    });
}

function triggerTalk(name) {
    findUser(name);
    console.log("im in!");
    socket.emit('create' , name , localStorage.getItem(socket.id));
    var modals = document.querySelector(".room-modal");
    modals.style.display = "block";
  receiveMsg();
}

function findUser (name) {
    socket.emit('findHim' , name, localStorage.getItem(socket.id));
}

function logoutThisUser() {
    socket.emit('remove' , localStorage.getItem(socket.id) , socket.id );
    socket.disconnect();
}

function sendMessages() {
    var msg = document.getElementById('rm-messages');
    socket.emit('messages' , msg.value , localStorage.getItem(socket.id));
    msg.value='';
}

function exitRoom() {
    clearAllMessages();
  var modal = document.querySelector(".room-modal");
  modal.style.display = "none";
  socket.emit('leaveChatBox' ,localStorage.getItem(socket.id));

}

function updateUsers() {
  var myNode = document.getElementById("ListOfUsers");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

function getCookie() {
    var re = /(;\s*|^)ChatAppUser=(\w+)/;
    var matches = document.cookie.match(re);
    return matches ? matches[matches.length-1] : null;
}

function roomCreation() {
    var modal = document.querySelector(".cr-room-modal");
    modal.style.display = "block";
}

function clearAllMessages() {
    var myNode = document.getElementById("room-output");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function create() {
    var modal = document.querySelector(".cr-room-modal");
}