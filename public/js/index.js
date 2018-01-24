var socket = io();
socket.on('connect',()=>{
    console.log('Connected to server');
    
});

socket.on('newMessage',(message)=>{
        var template = jQuery('#message-template').html();
        var formattedTime = moment(message.createdAt).format('HH:mm A');
        var html = Mustache.render(template,{
            text:message.text,
            from:message.from,
            time:formattedTime
        });
        $('#messages').append(html);
       
   
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
    var formattedTime = moment(message.createdAt).format('HH:mm A');
    var template = jQuery('#location-template').html();
    console.log(formattedTime);
    var html = Mustache.render(template,{
        from:message.from,
        date:formattedTime,
        url:message.url
    });
    jQuery('#messages').append(html);

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
            longitude:position.coords.longitude,
            from:'user'
        });
            geo.removeAttr('disabled').text('Send location');
    },function(){
        alert('Unable to get geolocation');
        geo.removeAttr('disabled').text('Send location');
    });
});