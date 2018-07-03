const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const port = 3000;
const users = [];
// const rooms = [];
const io = require('socket.io')(server);
function Room(roomId, messages, roomClients) {
    this.roomId = roomId;
    this.messages = [messages];
    this.roomClients = roomClients;
}
const roomExmpl = [];
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layouts'}));
app.set('port', port);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/static', express.static(path.join(__dirname, 'public')));

//create the room object and change the template to iterate the room.id , room.clients and room.messages
// room.id should be on triggerTalk and on enterRoom
io.on('connection', (socket) => {
    let obj = {};
    socket.on('reqForUsers' , (data) => {
        io.emit('resForUsers' , users, roomExmpl);  //---> users from POST req
    }); //this renders the templates

    socket.on('createSpecificRoom', (data) => {
        obj['roomId'] = data;
        obj['message'] = 'Welcome';
        obj['roomUsers'] = 0;
        // rooms.push(data);
        roomCreation(obj);
        io.emit('resForUsers' , users, roomExmpl);
    }); //create room for users

    socket.on('roomJoin' , (name , user) => {
        obj['roomId'] = name;
        obj['message'] = 'Welcome ' + user;
        obj['roomUsers'] = 1;
        updateRoomState(obj);
        socket.join('ROOM:'+name);
        io.sockets.in('ROOM:'+name).emit('message', 'Welcome ' + user);
        io.emit('resForRooms' , users, roomExmpl);
        //BDC that new user entered here
    });

    socket.on('leaveRoom' , (name, user) => {
        obj['roomId'] = name;
        obj['message'] = user + ' has left the room';
        obj['roomUsers'] = -1;
        updateRoomState(obj);
       socket.leave('ROOM:'+name , function(err) {
           io.sockets.in('ROOM:'+name).emit('message', user + ' has left the room');
         //BDC that new user left here
       });
        // io.emit('resForUsers' , users, roomExmpl);
    });

    socket.on('reqForMsg' , (name, user, message) => {
            obj['message']= user+ ': ' +message;
            createHistory(obj);
            console.log(roomExmpl);
           io.sockets.in('ROOM:'+name).emit('message', user+ ': ' +message);
        //BDC that new message(message) arrived at that room(name) from that user (user)
    });

    socket.on('remove' , (user) => {
        let index = users.indexOf(user);
        if (index > -1) {
            console.log("Removing "+user);
            users.splice(index, 1);
        }
        // io.emit('resForUsers' , users, roomExmpl);
    }); //we remove specific user from the 'database' of users, user that logged out

    socket.on('findSpecific' , (target, me) => {
       io.emit('lookingFor' , target, me);
    }); //triggering the event in which we seek for the user to PM

    socket.on('privateRoomJoin' , (target , me) => {
        socket.join('ROOM:'+ target + me);
        io.sockets.in('ROOM:'+ target + me).emit('message', 'Welcome');
    }); //both PM users join the room
});

//all the http requests & responses are here

app.get('/', (req, res, next) => {
    res.render('index',{bigtitle:'ChatApp'});
});

app.post('/', (req, res, next) => {
    clearDuplicates(req.body.username);
    users.push(req.body.username);
    res.render('index', {bigtitle:'ChatApp'});
});

app.get('/login', (req, res, next) => {
    res.render('login', {title: 'Login new user'});
});

app.get('/logout', (req, res, next) => {
    res.render('logout', {title: 'Thank you for using ChatApp'});
});

function clearDuplicates(clear) {
    for( let i=0; i<users.length; i++) {
        if(clear === users[i])
            users.splice(i,1);
    }
}
function roomCreation(obj) {
   roomExmpl.push(new Room (obj.roomId, obj.message, obj.roomUsers));
}
function updateRoomState(obj) {
    for (let i = 0; i < roomExmpl.length; i++) {
        if (roomExmpl[i].roomId === obj.roomId) {
            roomExmpl[i].roomClients = roomExmpl[i].roomClients + obj.roomUsers;
            roomExmpl[i].messages.push(obj.message);
        }
    }
}
function createHistory(obj) {
    if(roomExmpl.length > 0)
    for(let i=0; i<roomExmpl.length; i++) {
        if(roomExmpl[i].roomId === obj.roomId)
             roomExmpl[i].messages.push(obj.message);
    }
    else
        roomExmpl.push(new Room (obj.roomId, obj.message, obj.roomUsers));
}


server.listen(port, () => console.log(port));
