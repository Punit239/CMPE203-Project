
/*

MODULE NAME			: APP.JS
FUNCTION			: LOADS ALL REQUIRED NODE MODULES , STARTS SERVER AND DEFINES
					  PATHS TO HANDLE USER REQUESTS.
CHANGE DETAILS
		NAME		: PUNIT SHARMA
		DATE		: 5/1/2014
		CHANGE-1	: DEVELOPED INITIAL VERSION
		
		NAME		: VINAY BHORE
		DATE		: 5/4/2014
		CHANGE-2	: ADDED PATH TO DIRECT TO THE PAGE
					  WHERE USER DETAILS ARE SAVED
				  
*/

// REQUIRED NODE MODULES

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var email = require('./routes/email');
var http = require('http');
var path = require('path');

// CHANGES FOR GETTING GOOGLE OAUTH DEPENDENCY, MAIL, HTML : BEGINS

var passport = require('passport')
  , GoogleStrategy = require('passport-google').Strategy;    // FOR GOOGLE OAUTH
var hbs = require('hbs');    // FOR USING HTML PAGES IN NODE
var nodemailer = require('nodemailer');    // FOR IMPLEMENTING MAIL SERVICES

// CHANGES FOR GETTING GOOGLE OAUTH DEPENDENCY : ENDS

var app = express();

// ALL ENVIRONMENTS
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// CHANGES FOR DEFINING RETURN URL AFTER GOOGLE AUTHENTICATION : BEGINS

passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3000/home',
    
  },
  function(identifier, profile, done) {
    process.nextTick(function () {
    profile.identifier = identifier;
    return done(null, profile);
  });
  }
));

// CHANGES FOR DEFINING RETURN URL AFTER GOOGLE AUTHENTICATION : ENDS

// ENVIRONMENT DEVELOPMENT ONLY

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// DEFINING ALL PATHS FOR USER REQUESTS

app.get('/', routes.index);
app.get('/userHome', routes.userHome);
app.get('/aboutus', routes.aboutus);
app.get('/new', routes.newPin);
app.get('/home', routes.mailing);
app.post('/inviteFriend', email.inviteFriend);
app.post('/saveDetails', routes.saveDetails);
app.get('/auth/google', passport.authenticate('google'));

// CHANGES FOR IMPLEMENTING GOOGLE OAUTH : BEGINS

app.get('/home', 
  passport.authenticate('google', { successRedirect: '/',
                                    failureRedirect: '/login' }));
									
// CHANGES FOR IMPLEMENTING GOOGLE OAUTH : ENDS

// CREATE AND START SERVER

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
