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
  console.log(username);
  return username;
}

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
var parentEl = document.querySelector("#ListOfUsers");
if (el) {
  window.addEventListener("load", function(e) {
    socket.emit("newUser", {
      username: username
    });
  });
  // socket.on('disconnect', function(){
  //     //ELIMINATE THE USER WHO DC
  // });
  socket.on("LoggedIn", function(data) {
    updateUsers();
    data.map(el => {
      user_id = document.createTextNode(el);
      var newEl = document.createElement("li");
      newEl.setAttribute("id", el);
      newEl.setAttribute("onclick", "triggerTalk(this.id)");
      newEl.appendChild(user_id);
      parentEl.appendChild(newEl);
    });
  });
      socket.on("conversation-private-post", function(data) {
        var modal = document.querySelector(".room-modal");
        modal.style.display = "block";
        console.log({ message: data.message });
      });
}

function triggerTalk(name) {
  var modal = document.querySelector(".room-modal");
  modal.style.display = "block";
  socket.emit("subscribe", name);
  socket.emit("send-msg", {
    room: name,
    message: "some message"
  });
}

function logoutThisUser() {
  console.log("change with erasing from array in server!");
}
function roomCreation() {
  var modal = document.querySelector(".room-modal");
  modal.style.display = "block";
}

function exitRoom() {
  var modal = document.querySelector(".room-modal");
  //empty all messages
  modal.style.display = "none";
}

function updateUsers() {
  var myNode = document.getElementById("ListOfUsers");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}
