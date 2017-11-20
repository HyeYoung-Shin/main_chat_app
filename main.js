var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var async = require('async');
/*
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;
db.once("open", function(){
  console.log("DB connected");
});
db.on("error", function (err){
  console.log("DB ERROR :", err);
});
var dataSchema = mongoose.Schema({
  name:String,
  count:Number
});
var Data = mongoose.model('data', dataSchema);
Data.findOne({name:"myData"}, function(err, data){
  if(err) return console.log("Data ERROR:" , err);
  if(!err){
    Data.create({name:"myData", count:0}, function(err, data){
      if(err) return console.log("Data ERROR:", err);
      console.log("Counter initialized :", data);
    });
  }
});

//model setting
var userSchema = mongoose.Schema({
  email: {type:String, required:true, unique:true},
  id: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  age: {type:Number, required:true},
//  gender: {type:Char, require:true},
  createdAt: {type:Date, default:Date.now}
});
var User = mongoose.model('user', userSchema);
*/

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
// set middleware
app.use(flash());

/*
app.use(session({secret:'MySecret'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
  done(null, user.id);
});
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

var LocalStrategy = require('passport-local').Strategy;
passport.use('local-login',
  new LocalStrategy({
    usernameField : 'id',
    passwordField : 'password',
    passReqToCallback : true
    },
    function(req, id, password, done){
      User.findOne({'id' : id}, function(err, user){
        if(err) return done(err);
        if(!user){
          req.flash("id", req.body.id);
          return done(null, false, req.flash('loginError', 'No user found.'));
        }
        if(user.password != password){
          req.flash("id", req.body.id);
          return done(null, false, req.flash('loginError', 'Password does not match.'));
        }
        return done(null, user);
      });
    }
  )
);

app.get('/login', function(req,res){
  res.render('login/login', {id:req.flash("id")[0], loginError:req.flash('loginError')});
});
app.post('/login',
  function(req,res,next){
    req.flash("id");
    if(req.body.id.length === 0 || req.body.password.length === 0){
      req.flash("id", req.body.id);
      req.flash("loginError", "Please enter both id and password.");
      res.redirect('/login');
    } else{
      next();
    }
  }, passport.authenticate('local-login', {
    successRedirect : '/condChat',
    failureRedirect : '/login',
    failureFlash : true
  })
);
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/users/new', function(req,res){
  res.render('users/new', {
    formData: req.flash('formData')[0],
    emailError: req.flash('emailError')[0],
    idError: req.flash('idError')[0],
    passwordError: req.flash('passwordError')[0]
    }
  );
});
app.post('/users', checkUserRegValidation, function(req, res, next){
  User.create(req.body.user, function(err, user) {
    if(err) return res.json({success:false, message:err});
    res.redirect('/login');
  });
});
app.get('/users/:id', function(req,res){
  User.findById(req.params.id, function(err, user){
    if(err) return res.json({success:false, message:err});
    res.render("users/show", {user: user});
  });
});
//user edit
app.get('/users/:id/edit', function(req,res){
  User.findById(req.params.id, function(err, user){
    if(err) return res.json({success:false, message:err});
    res.render("users/edit", {
      user: user,
      formData: req.flash('formData')[0],
      emailError: req.flash('emailError')[0],
      idError: req.flash('idError')[0],
      passwordError: req.flash('passwordError')[0]
      }
    );
  });
});
*/


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
})


http.listen('3000', function(){
  console.log("server on");
});
