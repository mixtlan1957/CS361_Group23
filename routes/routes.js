var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next){
  var context = {};
  if(req.session.username)
  {
    context.username = req.session.username;  
  }
  res.render('home', context);
});


router.get('/about', function(req,res,next){
  var context = {};
  if(req.session.username)
  {
    context.username = req.session.username;  
  }
  context.title = "About Us";
  res.render('about', context);
});

router.get('/signup', function(req,res,next){
  var context = {};
  if(req.session.username)
  {
    context.username = req.session.username;  
  }
  context.title = "Signup";
  context.jsscripts = ["signup.js"];
  res.render('accounts/signup', context);
});

router.post('/signup', function(req, res){
  var context = {};
  req.session.username = req.body.username;
  context.username = req.session.username;
  req.session.fname = req.body.fname;
  context.fname = req.session.fname;
  req.session.lname = req.body.lname;
  context.lname = req.session.lname;
  req.session.email = req.body.email;
  context.email = req.session.email;
  if(req.body['student_signup']){
    req.session.age = req.body.age;
    context.age = req.session.age;
    req.session.grade = req.body.grade;
    context.grade = req.session.grade;
    req.session.sname = req.body.sname;
    context.sname = req.session.sname;
  } else if(req.body['professional_signup']){
    req.session.cname = req.body.cname;
    context.cname = req.session.cname;
  }

  if(!req.session.username){
    res.render('accounts/signup', context);
    return;
  }
  res.render('accounts/profile', context);
});


router.get('/login', function(req,res,next){
  var context = {};
  if(req.session.username)
  {
    context.username = req.session.username;  
  }
  context.title = "Login";
  res.render('accounts/login', context);
});

router.post('/login', function(req, res){
  var context = {};
  if(req.body['new_login']){
    req.session.username = req.body.username;
  }

  if(!req.session.username){
    res.render('accounts/login', context);
    return;
  }
  context.username = req.session.username;
  res.render('home', context);
});

router.get('/logout', function(req, res, next){
  var context = {};
  if(req.session.username){
    context.username = req.session.username;
    req.session.username = null;
  }
  res.render('accounts/logout', context);
});

router.get('/profile', function(req, res, rnext){
  var context = {};
  if(req.session.username){
    context.username = req.session.username;
    context.fname = req.session.fname;
    context.lname = req.session.lname;
    context.email = req.session.email;
    if(req.session.sname){
      context.sname = req.session.sname;
      context.age = req.session.age;
      context.grade = req.session.grade;
    } else if(req.session.cname){
      context.cname = req.session.cname;
    }
  res.render('accounts/profile', context);
  }
  else{
    res.render('home');
  }
});

module.exports = router;