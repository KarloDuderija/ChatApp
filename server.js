'use strict';

const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require('path');

const server = require('http').Server(app);
const io = require('socket.io')(server);
const port =  3000;

app.engine('hbs', hbs({extname: 'hbs' , defaultLayout: 'layouts'}));

app.set('port', port);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine','hbs');



io.on('connection', (socket) => {
    console.log(socket)
});

server.listen(port, () => console.log(port));


app.get('/', (req, res, next) => {
    res.render('index', { title: 'ChatApp' });
});

app.get('/login', (req, res, next) => {
    res.render('login', { title: 'Login new user'});
});

app.get('/logout', (req, res, next) => {
    res.render('logout', { title: 'Thank you for using ChatApp'});
});