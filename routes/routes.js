var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next){
  res.render('home');
});


router.get('/about', function(req,res,next){
  var context = {};
  context.title = "About Us";
  res.render('about', context);
});

router.get('/signup', function(req,res,next){
  var context = {};
  context.title = "Signup";
  res.render('accounts/signup', context);
});

router.get('/login', function(req,res,next){
  var context = {};
  context.title = "Login";
  res.render('accounts/login', context);
});

module.exports = router;