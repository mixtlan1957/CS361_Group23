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

module.exports = router;