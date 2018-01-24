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

socket.on('newLocationMessage',function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);

});

var message = jQuery('[name=message]');

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',
    {from:'User',text:message.val()}, 
    function(){
        message.val('');
    });
    
});

var geo = jQuery('#geo-button');

geo.on('click',function(){
    if(!navigator.geolocation){
     return  alert('Unable to get location');
    }
    geo.attr('disabled','disabled').text('Sending info');

    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage',{
            latitud:position.coords.latitude, 
            longitude:position.coords.longitude});
            geo.removeAttr('disabled').text('Send location');
    },function(){
        alert('Unable to get geolocation');
        geo.removeAttr('disabled').text('Send location');
    });
});