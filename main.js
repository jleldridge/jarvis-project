var IntrospectionEngine = require("IntrospectionEngine");
var fs = require('fs');

var express = require('express');
var app = express();

var self = this;

app.use(express.static('js'));

app.get('/', function (req, res){
    res.setHeader('Content-Type', 'text/html');
    res.send(fs.readFileSync('./html/index.html'));
});

var server = app.listen(8080, function (){
    var host = server.address().address;
    var port = server.address().port;

    console.log('Express server started at http://%s:%s', host, port);
});
