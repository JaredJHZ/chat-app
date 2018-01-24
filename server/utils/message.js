var moment = require('moment');
    var generateMessage = (from,text)=>{
        var date = moment().valueOf();
        return {from,text,createdAt : date};
    }

    var generateLocationMessage = (from,lat,long) =>{
        var date = moment().valueOf();
        return {
            from,
            url: "https://www.google.com/maps?q="+lat+','+long ,
            createdAt:date
         };
        }
module.exports = {generateMessage,generateLocationMessage};