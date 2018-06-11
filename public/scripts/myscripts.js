
const socket = io('http://localhost:3000');


function testClick() {
    console.log("test click", socket);
    socket.emit("TEST", {foo: 'bar'})
}

function triggerSocket (){
    console.log("Client has logged in successfully!", socket.id);
    socket.emit('UserName', document.getElementById('login-username').value); //has to be broadcasted
}
