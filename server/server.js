var express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message')
var app = express();

var server = http.createServer(app);

var io = socketIO(server);

const PORT = process.env.PORT || 5550;

var publicPath = path.join(__dirname,'../','/public');

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New user connected');
    
    socket.emit('salut',generateMessage('Admin','Welcome to the chat room'));

    socket.broadcast.emit('newU',generateMessage('Admin','New User Joined'));

    socket.on('createMessage',(message,callback)=>{
        console.log(message);
        io.emit('newMessage',generateMessage('user',message.text));
        callback();
    });

    socket.on('createLocationMessage',(coords)=>{
        io.emit("newLocationMessage",generateLocationMessage(coords.from,coords.latitud,coords.longitude));

    });
    
    
    socket.on('disconnect',()=>{
        console.log('User is disconnected');
    });


});


server.listen(PORT,()=>{
    console.log('App running on port 5550');
});