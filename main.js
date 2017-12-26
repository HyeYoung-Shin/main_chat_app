var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const v = require('voca');

mongoose.connect("mongodb://shinhy8101:quftkah775@ds115866.mlab.com:15866/word_dir");
var db = mongoose.connection;
db.once("open", function(){
  console.log("DB connected");
});
db.on("error", function (err){
  console.log("DB ERROR :", err);
});

//model setting
var wordSchema = mongoose.Schema({
  word: {type:String, required:true},
  frequency: {type:Number, required:true}
});

var Word = mongoose.model('Word', wordSchema);
var fs = require('fs');

app.set("view engine", 'ejs');

app.get("/", function(req, res){
  res.sendfile("public/main.html");
});
app.get("/randomchat", function(req, res){
  res.sendfile("public/randomchat.html");
});
app.get("/useCondChat", function(req, res){
  res.sendfile("public/useCondChat.html");
});

var roomnum =1;

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
});

http.listen('3000', function(){
  console.log("server on");
});
