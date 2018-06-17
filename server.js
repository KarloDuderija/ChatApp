// 'use strict';
let ISUSERLOGGED = false;
const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require('path');
// const sessions = require('express-session');
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const port = 3000;
//REQUIRES CLASS - implement with new instance
const users = [];
const io = require('socket.io')(server);
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layouts'}));

app.set('port', port);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/static', express.static(path.join(__dirname, 'public')));


io.on('connection', (socket) => {
    console.log('Server side is connected ' + socket.id);
    socket.on('TEST', (obj) => {
        console.log('Test IO connection with object', obj);
    });
    socket.on('user', (user) => {
       users.push(user);
       console.log('His name is:', user);
    });
    socket.on('newUser', (data) => {
        io.emit('LoggedIn' , users, data);
        console.log(users);
    });
    socket.on('create' , (data1, data2) => {
        socket.join('ROOM:' + data1 + data2);
        socket.on('leaveChatBox' , (userExiting) => {
            socket.leave('ROOM:' + data1 + data2);
            io.sockets.in('ROOM:' + data1 + data2).emit('newMsg' , ' left the chat' ,userExiting);
        });
        socket.on('messages' , (message , username) => {
            io.sockets.in('ROOM:' + data1 + data2).emit('newMsg' , message, username);
        });
        console.log('ROOM:' + data1 + data2);
    });
    socket.on('findHim' , (data , name) => {
       socket.broadcast.emit('finding' , data, name);
    });
    socket.on('remove' , (user , data) => {
        var index = users.indexOf(user);
        if (index > -1) {
            console.log("Removing "+user);
            users.splice(index, 1);
            console.log(users);
            socket.on('disconnect', () => {
                io.emit('LoggedIn' , users, data);
            });
        }
    });
    // socket.leave('ROOM:' +data2);
    // socket.broadcast.to('ROOM:' +data2).emit('newMsg' , 'Welcome');
});



app.get('/', (req, res, next) => {
    res.render('index', {title: 'ChatApp'});
});

app.post('/', (req, res, next) => {
    res.render('admin', {title:'ChatApp'});
});

app.get('/login', (req, res, next) => {
    res.render('login', {title: 'Login new user'});
});

app.post('/login', (req, res, next) => {
    //res.end(JSON.stringify(req.body));
    // if(!!req.body.username && !!req.body.password)
    // {
    //     ISUSERLOGGED = true;
    //     // res.redirect('http:localhost:3000');
    // }
    // else { res.end('You shall not pass!!')}
});

app.get('/logout', (req, res, next) => {
    res.render('logout', {title: 'Thank you for using ChatApp'});
});

server.listen(port, () => console.log(port));

