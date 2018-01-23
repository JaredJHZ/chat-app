var express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
var app = express();

var server = http.createServer(app);

var io = socketIO(server);

const PORT = process.env.PORT || 5550;

var publicPath = path.join(__dirname,'../','/public');

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New user connected');
    
    socket.on('createMessage',(message)=>{
        console.log(message);
        io.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: new Date().getHours
        });
    });
    
    
    socket.on('disconnect',()=>{
        console.log('User is disconnected');
    });


});


server.listen(PORT,()=>{
    console.log('App running on port 5550');
});