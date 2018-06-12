export const SOCKETIO_EVENTS = {
    SNDMSG: 'SNDMSG',
    ROOMENTRY: 'ROOMENTRY',
};


socket.on("join-user", (obj) => {
    console.log(obj.username + ' with username');

    socket.broadcast.emit('user-joined', "User + " + obj.username);
})