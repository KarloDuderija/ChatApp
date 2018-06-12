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
let aUser;
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
       aUser = user;
       console.log('His name is:', user);
    });
    socket.broadcast.emit('LoggedIn' , aUser);
});



app.get('/', (req, res, next) => {
    res.render('index', {title: 'ChatApp'});
});

app.post('/', (req, res, next) => {
    res.render('admin', {title:'ChatApp', user: req.body.username});
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

