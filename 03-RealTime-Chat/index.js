const http = require('http');
const express = require('express');
const socket = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socket(server);
const PORT = 3000 || process.env.PORT;
const formatMessage = require('./utils/messages');
const chatNow = 'ChatNow Bot';
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('./utils/users')

//static files 
app.use(express.static('public'));

//all io actions  
io.on('connection', function (socket) {
    socket.on('joinRoom', ({
        username,
        room
    }) => {
        const user = userJoin(socket.id, username, room)
        socket.join(user.room);
        socket.emit('message', formatMessage(chatNow, ' Welcome there'));
        console.log('a user connected');
        //Broadcasts
        socket.broadcast.to(user.room).emit('message', formatMessage(chatNow, `${username} has joined the chat`)); //Everybody except the user himself
    
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
          });
    });




    //chat message  
    socket.on('chatMessage', function (msg) {
        const user = getCurrentUser(socket.id);
        
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });
    socket.on('disconnect', function (socket) {
        const user = userLeave(socket.id);
        console.log('user disconnected');
        console.log(user)
        if(user){
            io.to(user.room).emit('message',formatMessage(chatNow, `${user.username} has left the chat`));
             
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
          });
        }
     
    });
});

//Routes
server.listen(PORT, () => {
    console.log('listening on port ${PORT}')
});