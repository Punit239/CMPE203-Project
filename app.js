
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var passport = require('passport')
  , GoogleStrategy = require('passport-google').Strategy;

var hbs = require('hbs');

var app = express();

// all environments
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

// Run these in your projects directory
// npm install passport-google
// npm install passport-google

passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3000/home',
    
  },
  function(identifier, profile, done) {
    //User.findOrCreate({ openId: identifier }, function(err, user) {
    //  done(err, user);
    //});
	process.nextTick(function () {
    profile.identifier = identifier;
    return done(null, profile);
  });
  }
));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/home', routes.mailing);
app.get('/users', user.list);
app.get('/login', routes.login);

app.get('/auth/google', passport.authenticate('google'));

app.get('/home', 
  passport.authenticate('google', { successRedirect: '/',
                                    failureRedirect: '/login' }));


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
