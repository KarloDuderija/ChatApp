'use strict';

const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require('path');

const server = require('http').createServer(app);
const port =  3000;

const io = require('socket.io')(server);

app.engine('hbs', hbs({extname: 'hbs' , defaultLayout: 'layouts'}));

app.set('port', port);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine','hbs');



io.on('connection', (socket) => {
   console.log('Server side is connected');
});

app.get('/', (req, res, next) => {
    res.render('index', { title: 'ChatApp' });
});

app.get('/login', (req, res, next) => {
    res.render('login', { title: 'Login new user'});
});

app.get('/logout', (req, res, next) => {
    res.render('logout', { title: 'Thank you for using ChatApp'});
});

server.listen(port, () => console.log(port));