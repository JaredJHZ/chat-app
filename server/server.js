var express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation');

var {Users} = require('./utils/users');

var app = express();

var server = http.createServer(app);

var io = socketIO(server);

var users = new Users();

const PORT = process.env.PORT || 5550;

var publicPath = path.join(__dirname,'../','/public');

app.use(express.static(publicPath));

io.on('connection',(socket)=>{


    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);
        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        socket.emit('newMessage',generateMessage('Admin','Welcome to the chat room'));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',params.name+' has Joined'));

        callback();
    });
    
    socket.on('createMessage',(message,callback)=>{
        console.log(message);
        io.emit('newMessage',generateMessage('user',message.text));
        callback();
    });

    socket.on('createLocationMessage',(coords)=>{
        io.emit("newLocationMessage",generateLocationMessage(coords.from,coords.latitud,coords.longitude));

    });
    
    
    socket.on('disconnect',()=>{
        var user = users.removeUser(socket.id);
        console.log(user);
        if(users){
            io.to(user.room).emit("updateUserList",users.getUserList(user.room));
            io.to(user.room).emit("newMessage",generateMessage('Admin',user.name+' user has left'));
        }
    });


});


server.listen(PORT,()=>{
    console.log('App running on port 5550');
});