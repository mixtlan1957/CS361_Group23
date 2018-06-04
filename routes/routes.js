var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var acctFncs = require('../queries/account.js');
var sv_db = require('../sv_database.js'); // for using SV procedures

// private module variables

var mysql; // mysql module to use

/*
 * imports MYSQL module to use
 */
function setMySQL(input)
{
  mysql = input;
  sv_db.setMySQL(mysql); // connect mysql to the sv_database 
}

/******************************************************************************
 * GET /home ; renders home view
******************************************************************************/
router.get('/', function(req,res,next){
  var context = {};
  if(req.session.username)
  {
    context.username = req.session.username;  
  }
  res.render('home', context);
});

/******************************************************************************
 * GET /search ; renders search view
******************************************************************************/
router.get('/search', function(req, res, next){
    var context = {};
    if(req.session.username){
        context.username = req.session.username;
    }
    context.title = "Search";
    res.render('search', context);
});


/******************************************************************************
 * GET /about ; renders about view
******************************************************************************/
router.get('/about', function(req,res,next){
  var context = {};
  if(req.session.username)
  {
    context.username = req.session.username;  
  }
  context.title = "About Us";
  res.render('about', context);
});

/******************************************************************************
 * GET /signup ; renders signup view
******************************************************************************/
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

router.post('/search/search_results', function(req, res){
    var context = {};
    var mysql = req.app.get('mysql');
    var sql = "SELECT title FROM opportunities";
    var title = req.body['title'];
    var loc = req.body['location'];

    if(title !== "" && loc !== ""){
        sql = sql + " WHERE title =  "  + title + " AND WHERE location  =  "  + loc;
    }
    else if(title !== ""){
        sql = sql + " WHERE title =  " + title;
    }
    else if (loc !== ""){
        sql = sql + " WHERE location =  " + loc;
    }

    context.jsscripts = ["search.js"];
    res.render('search_results', context);
});


/******************************************************************************
 * >> NOT WORKING << POST /signup/student ; rebuilds user object from the form
                 getUserId is returning undefinied for some reason... otherwise this should work.                          
******************************************************************************/
router.post('/signup/student', function(req, res){
  var context = {};
  context.jsscripts = ["profile.js"];

  req.session.username = req.body.username;
  context.username = req.session.username;


  req.session.email = req.body.email;
  context.email = req.session.email;

  req.body.password = parseInt(req.body.password);
  if(isNaN(req.body.password)){
    req.body.password = 0;
  }
  req.session.fname = req.body.fname;
  context.fname = req.session.fname;

  req.session.lname = req.body.lname;
  context.lname = req.session.lname;
  
  req.session.age = req.body.age;
  context.age = req.session.age;

  req.session.grade = req.body.grade;
  context.grade = req.session.grade;

  req.session.sname = req.body.sname;
  context.sname = req.session.sname;



  if(!req.session.username){
    res.render('accounts/signup', context);
    return;
  }

  var input = [req.body.username, req.body.password, req.body.email,
               req.body.fname, req.body.lname, req.body.sname, req.body.age, req.body.grade];
  sv_db.callProcedure("newStudent", input, complete);

  function complete(rows, err){
   if(err){
      console.log(err);
      rows = [];
   }
    console.log(rows);
    res.render('accounts/student/studentprofile', context); 
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
        to: 'Mario <mariofm.mx@gmail.com>, Jennifer <aldoverj@oregonstate.edu>,' + 
        'Sean <fostesea@oregonstate.edu>, Anmolbir <mannanm@oregonstate.edu>, Andrew <schappea@oregonstate.edu>',

        // Subject of the message
        subject: 'Professional Account Applicant: ' + submitterName,

        // plaintext body
        text: 'Submitter Name: ' + submitterName + '\nIndustry: ' + subIndustry + '\nJob Title/Role:' + subJobTitle + 
        '\nContact Email Listed: ' + submitterEmail + '\n\nStatement of Intent: ' + statement
    };

    transporter.sendMail(message, (error, info) => {

        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return process.exit(1);
        }

        console.log('Message sent successfully!');
        console.log(nodemailer.getTestMessageUrl(info));

        //upon successful submission redirect user (this should probably be updated to a "success" page)
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

router.post('/login', function(req, res, next){
  var context = {};
  var input = [req.body.username, req.body.password];
  sv_db.callProcedure("getUser", input, complete);
  function complete(rows, err) // callback after checking username and password
  {
    if (err) // error handling
    {
      //next(err);
      // return;
      rows = []; // temporary error handling
    }
    if (rows.length > 0) // if correct username and password
    {
      req.session.username = req.body.username;
      context.username = req.session.username;
      res.render('home', context);
      return;
    }
    context.login_error = true; // if login error occured
    res.render('accounts/login', context);
  }
});

router.get('/logout', function(req, res, next){
  var context = {};
  if(req.session.username){
    req.session.username = null;
    context.username = req.session.username;
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
      res.render('accounts/student/studentprofile', context);
      return;
    } else if(req.session.cname){
      context.cname = req.session.cname;
      res.render('accounts/profile', context);
      return;
    }
  }
  else{
    res.render('home');
  }
});

module.exports = router;

// module functions
module.exports.setMySQL = setMySQL;