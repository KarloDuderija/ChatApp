
const socket = io('http://localhost:3000');


function testClick() {
    console.log("test click", socket);
    socket.emit("TEST", {foo: 'bar'})
}

function triggerSocketForUser (){
    console.log("Client has logged in successfully: ");
    socket.emit('user', document.getElementById('login-username').value);
}

function loginInfo() {
    console.log("Client side log User");
    socket.on('LoggedIn', data => {
        console.log("happened")
    })
}
//
// function addingUser(username){
//     console.log("Trying to append element into list!");
//     let parentEl = document.getElementById('ListOfUsers');
//     let newEl = document.createElement('li');
//     let user_id = document.createTextNode(username);
//     newEl.appendChild(user_id);
//     parentEl.appendChild(newEl);
// }
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
// var el = document.querySelector("#js-test-broadcast");
// if (el) {
//     el.addEventListener("click", function(e) {
//         socket.emit('join-user', {
//             username: "kris:" + new Date().getTime()
//         });
//     });
//
//     socket.on('user-joined', function(data) {
//         console.log("User Joined: Yahoooooooo");
//         console.log(data);
//     });
// }
