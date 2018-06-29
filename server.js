const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const port = 3000;
const users = [];
const rooms = [];
const io = require('socket.io')(server);
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layouts'}));

app.set('port', port);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/static', express.static(path.join(__dirname, 'public')));


io.on('connection', (socket) => {
    socket.on('reqForUsers' , (data) => {
        io.emit('resForUsers' , users, rooms);
    });
    socket.on('createSpecificRoom', (data) => {
        rooms.push(data);
        io.emit('resForUsers' , users, rooms);
    });
    socket.on('roomJoin' , (name , user) => {
        socket.join('ROOM:'+name);
        io.sockets.in('ROOM:'+name).emit('message', 'Welcome ' + user);
        //BDC that new user entered here
    });
    socket.on('leaveRoom' , (name, user) => {
       socket.leave('ROOM:'+name , function(err) {
         console.log(err);
           io.sockets.in('ROOM:'+name).emit('message', user + ' has left the room');
         //BDC that new user left here
       });
    });
    socket.on('reqForMsg' , (name, user, message) => {
           io.sockets.in('ROOM:'+name).emit('message', user+ ': ' +message);
        //BDC that new message(message) arrived at that room(name) from that user (user)
    });
    socket.on('remove' , (user) => {
        let index = users.indexOf(user);
        if (index > -1) {
            console.log("Removing "+user);
            users.splice(index, 1);
        }
        console.log(users);
        io.emit('resForUsers' , users, rooms);
    });
});

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

server.listen(port, () => console.log(port));
