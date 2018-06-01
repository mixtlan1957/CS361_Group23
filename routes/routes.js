var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var acctFncs = require('../queries/account.js');

router.get('/', function(req,res,next){
  var context = {};
  if(req.session.username)
  {
    context.username = req.session.username;  
  }
  res.render('home', context);
});

router.get('/search', function(req, res, next){
    var context = {};
    if(req.session.username){
        context.username = req.session.username;
    }
    context.title = "Search";
    res.render('search', context);
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
  var callbackCount = 0;
  var context = {};
  var mysql; // = req.app.get('mysql');
  var user = {};
  context.jsscripts = ["profile.js"];
  req.session.username = req.body.username;
  context.username = req.session.username;
  user.username = req.session.username;

  req.session.email = req.body.email;
  context.email = req.session.email;
  user.email = req.session.email;

  user.password = req.body.password;

  req.session.fname = req.body.fname;
  context.fname = req.session.fname;

  req.session.lname = req.body.lname;
  context.lname = req.session.lname;
  
  if(req.body['student_signup']){
    req.session.age = req.body.age;
    context.age = req.session.age;
    user.age = req.session.age;

    req.session.grade = req.body.grade;
    context.grade = req.session.grade;
    user.grade = req.session.grade;

    req.session.sname = req.body.sname;
    context.sname = req.session.sname;
    user.sname = req.session.sname;

    acctFncs.data.addStudent(user, res, mysql, context, complete);

  } else if(req.body['professional_signup']){
    req.session.cname = req.body.cname;
    context.cname = req.session.cname;
    user.cname = req.session.cname;

    acctFncs.data.addProfessional(user, res, mysql, context, complete);
  }

  if(!req.session.username){
    res.render('accounts/signup', context);
    return;
  }

  function complete(){
    callbackCount++;
    if(callbackCount >= 1){
      res.render('accounts/profile', context); 
      return;
    }
  } 
});

router.post('/signup/professionalSubmit', function(req, res) {
  var submitterEmail = "<" + req.body.email + ">";
  var submitterName = req.body.fname + " " + req.body.lname;
  var subIndustry = req.body.industry;
  var subJobTitle = req.body.jobTitle;
  var statement = req.body.statement;
// Generate SMTP service account from ethereal.email
nodemailer.createTestAccount((err, account) => {   //citation/source: https://nodemailer.com/about/
    if (err) {
        console.error('Failed to create a testing account');
        console.error(err);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    // NB! Store the account object values somewhere if you want
    // to re-use the same account for future mail deliveries

    // Create a SMTP transporter object
    // Create a SMTP transporter object
    /*
    let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: account.user,
                pass: account.pass
            },
            logger: false,
            debug: false // include SMTP traffic in the logs
        },
        {
            // default message fields

            // sender info
            //from: 'Pangalink <no-reply@pangalink.net>',
            from: submitterName + ' ' + submitterEmail,  
            headers: {
                'X-Laziness-level': 1000 // just an example header, no need to use this
        }
    });
    */
    // this chunk of code sets the transporter to an actual gmail address
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cs361.groupproj@gmail.com',
        pass: 'projectonly!'
      }
    });

    // Message object
    let message = {
        // Comma separated list of recipients
        to: 'Mario <mariofm.mx@gmail.com>',

        // Subject of the message
        subject: 'Professional Account Applicant: ' + submitterName,

        // plaintext body
        text: 'Submitter Name: ' + submitterName + '\nIndustry: ' + subIndustry + '\nJob Title/Role:' + subJobTitle + 
        '\nContact Email Listed' + submitterEmail + '\nStatement of Intent: ' + statement
    };

    transporter.sendMail(message, (error, info) => {

        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return process.exit(1);
        }

        console.log('Message sent successfully!');
        console.log(nodemailer.getTestMessageUrl(info));

        //upon successful submission redirect user
        res.render('home', context);

        // only needed when using pooled connections
        transporter.close();
    });
});
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
  context.jsscripts = ["profile.js"];
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