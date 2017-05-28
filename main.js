var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser');

var fs = require('fs');
var path = require('path');

var count =0;
var socketRoom = {};

app.set('port', 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.start = app.listen = app.aaa = function(){
  return server.listen.apply(server, arguments);
}

app.aaa(app.get('port'), function(){
  console.log("server start");
});

app.get("/", function(req, res){
  res.sendfile("public/main.html");
});

function include(file_){
  with (global){
    eval(fs.readFileSync(file_) + '');
  };
};

include(__dirname + "/config/include.js");

for(var i=0; i< servicefile.length; i++){
  include(__dirname + "/service/" + servicefile[i] );
}

app.all('*', function(req, res, next){
  next();
})

/*
app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname, 'public'))); //static폴더 세팅

 var data={count:0};
app.get('/', function (req,res) {
//    console.log(req);
    console.log(res);
    data.count++;
    res.render('Hye Young chat application', data);
});

app.get('/reset', function (req,res) {
    data.count=0;
    res.render('firstejs', data);
});
app.get('/set/count', function (req,res) {
    if(req.query.count) data.count = req.query.count;
    res.render('firstejs', data);
});

*/
/*
server.listen(3000, function(){
  console.log('Server On!');
});
*/
