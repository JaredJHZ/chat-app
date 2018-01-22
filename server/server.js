var express = require('express');
const path = require('path');
var app = express();
const PORT = process.env.PORT || 5550;

var publicPath = path.join(__dirname,'../','/public');

app.use(express.static(publicPath));

app.get('/',(req,res)=>{
    res.sendFile(publicPath+'index.html',{
        title:'chat'
    });
});

app.listen(5555,()=>{
    console.log('App running on port 5550');
});