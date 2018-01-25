var socket = io();

//listening to a connect emit
socket.on('connect',()=>{
    
    var params = jQuery.deparam(window.location.search);

    socket.emit('join',params,function(err){

        if(err){
            alert(err);
            window.location.href = '/';
        }

    });
    
});

//listening to new Messages
socket.on('newMessage',(message)=>{
        var template = jQuery('#message-template').html();
        var formattedTime = moment(message.createdAt).format('HH:mm A');
        var html = Mustache.render(template,{
            text:message.text,
            from:message.from,
            time:formattedTime
        });
        $('#messages').append(html);
       scrollToBottom();
   
    });

    //listening to new location
socket.on('newLocationMessage',function(message){
    var formattedTime = moment(message.createdAt).format('HH:mm A');
    var template = jQuery('#location-template').html();
    console.log(formattedTime);
    var html = Mustache.render(template,{
        from:message.from,
        date:formattedTime,
        url:message.url
    });
    scrollToBottom();
    jQuery('#messages').append(html);

});

//emit a new message
var message = jQuery('[name=message]');
jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',
    {text:message.val()}, 
    function(){
        message.val('');
    });  
});
//emit a new location
var geo = jQuery('#geo-button');
geo.on('click',function(){
    if(!navigator.geolocation){
     return  alert('Unable to get location');
    }
    geo.attr('disabled','disabled').text('Sending info');

    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage',{
            latitud:position.coords.latitude, 
            longitude:position.coords.longitude
        });
            geo.removeAttr('disabled').text('Send location');
    },function(){
        alert('Unable to get geolocation');
        setTimeout(()=>{
            geo.removeAttr('disabled').text('Send location');
        },3000);
    });
});

//list of users

socket.on('updateUserList', function (users) {
  var ol = jQuery('<ol></ol>');

  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
});




//functions
function scrollToBottom(){
// Selectors
 var messages = jQuery('#messages');
 var newMessage = messages.children('li:last-child')
 // Heights
 var clientHeight = messages.prop('clientHeight');
 var scrollTop = messages.prop('scrollTop');
 var scrollHeight = messages.prop('scrollHeight');
 var newMessageHeight = newMessage.innerHeight();
 var lastMessageHeight = newMessage.prev().innerHeight();

 if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
   messages.scrollTop(scrollHeight);
 }
}
