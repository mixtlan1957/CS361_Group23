/*
 * SkillVenture application
 * Run using command: node [filename] [port number]
 */

//express!
var express = require('express');
var session = require('express-session');
var app = express();
//express-handlebars!
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

//bodyParser!
var bodyParser = require('body-parser');

var routes = require('./routes/routes.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({secret: 'skillventuresphinx'}));


//events!
var events = require('events');
var eventEmitter = new events.EventEmitter();


//mySQL!
var mysql = require('./dbcon.js');
app.set('mysql', mysql);



//set dependencies
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || process.argv[2] || 3000);


//filepath!
express.static('http://localhost:3000/');
app.use(express.static('public'));

//routes to homepage and login etc...
app.use('/', routes);

//404
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

//505
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});



app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') 
  + '; press Ctrl-C to terminate.');
});






