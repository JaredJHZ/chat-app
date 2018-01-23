var socket = io();
socket.on('connect',()=>{
    console.log('Connected to server');
    
});

socket.on('newMessage',(message)=>{
        console.log('Message');
        console.log(message);
        var li = jQuery('<li></li>');
        li.text(message.from+": "+message.text);
        jQuery('#messages').append(li);
    });

socket.on('salut',(salut)=>{
        console.log(salut);
        var li = jQuery('<li></li>');
        li.text(salut.from+": "+salut.text);
        jQuery('#messages').append(li);
    });

socket.on('newU',(join)=>{
        console.log(join);
        var li = jQuery('<li></li>');
        li.text(join.from+": "+join.text);
        jQuery('#messages').append(li);
    });
jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',{from:'User',text:jQuery('[name=message]').val()}, function(){});

});