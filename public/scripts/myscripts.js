
const socket = io('http://localhost:3000');
let username;

function testClick() {
    console.log("test click", socket);
    socket.emit("TEST", {foo: 'bar'})
}

function triggerSocketForUser (){
    console.log("Client has logged in successfully: ");
    username = document.getElementById('login-username').value;
    socket.emit('user', username);
}



//
function addingUser(username){
    console.log("Trying to append element into list!");
    let parentEl = document.getElementById('ListOfUsers');
    let newEl = document.createElement('li');
    let user_id = document.createTextNode(username);
    newEl.appendChild(user_id);
    parentEl.appendChild(newEl);
}
//
// function listenersIndexPage() {
//     console.log('listenersIndexPage');
//     socket.on('LoggedUsers' , (message) => {
//         console.log(message)
//     });
// }

// function eventSndMsg () {
//     let message = document.getElementById('message');
//     let handle = document.getElementById('handle');
//
//
//
//     let output = document.getElementById('output');
//     socket.emit('chat', {
//         message: message.value,
//         handle: handle.value
//     });
//     socket.on('LoggedUsers', (data) => {
//         console.log('Dolazim sa klijenta');
//         output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + ':</p>'
//     });
// }
//

var user_id = null;
var newUser = true;
var el = document.querySelector("#TestBDC");
var parentEl = document.querySelector('#ListOfUsers');
if (el) {
    window.addEventListener("load", function(e) {
        socket.emit('newUser', {
            username: username
        });
    });

    socket.on('LoggedIn', function(data) {
        if(data.length !== 0)
        console.log("User Joined: ", data[data.length-1]);
        console.log(data);
        newUser = false;
        user_id = document.createTextNode(data[data.length-1]);
        var newEl = document.createElement('li');
        newEl.setAttribute("onclick", "triggerTalk(user_id)");
        newEl.appendChild(user_id);
        parentEl.appendChild(newEl);
    });
    if(newUser) {
        socket.on('FirstLog', function(data) {
            for(var i=0; i<data.length-1 ; i++){
                user_id = document.createTextNode(data[i]);
                var newEl = document.createElement('li');
                newEl.setAttribute("onclick", "triggerTalk()");
                newEl.appendChild(user_id);
                parentEl.appendChild(newEl);
            }
            if(data.length !== 0)
                console.log("User Joined: ", data[data.length-1]);
            console.log(data);
        newUser = false;
        });
    }
    var usersToChat = document.getElementsByClassName('user');
    usersToChat.onclick = function() {
        alert("This works");
    };
}

function triggerTalk() {
    console.log("works");
}

var roomId = document.querySelector("#room");
if(roomId) {
    var modal = document.querySelector(".room-modal");
    roomId.addEventListener("click" ,function(){
        modal.display="block";
    });
}


