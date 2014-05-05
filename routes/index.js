
/*

MODULE NAME			: INDEX.JS
FUNCTION			: DEFINES FUNCTIONS TO FETCH VALUES FROM 
					  GOOGLE ACCOUNT AND SAVE THEM TO DATABASE
				  
CHANGE DETAILS
		NAME		: PUNIT SHARMA
		DATE		: 5/1/2014
		CHANGE-1	: DEVELOPED INITIAL VERSION
		
		NAME		: PUNIT SHARMA
		DATE		: 5/4/2014
		CHANGE-2	: ADDED PATH TO DIRECT TO THE PAGE
					  WHERE USER DETAILS ARE SAVED
				  
*/

// CHANGES FOR ADDING MONGOOSE TO CONNECT TO MONGODB : BEGINS

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var User203 = require('C:/Program Files/nodejs/nodeOAuth/schema/user_model.js');    // DEFINING SCHEMA FOR USER DETAILS
var pins = require('C:/Program Files/nodejs/nodeOAuth/schema/pins.js');    // DEFINING SCHEMA FOR PIN DETAILS

// CHANGES FOR ADDING MONGOOSE TO CONNECT TO MONGODB : ENDS

// VARIABLES TO SAVE ATTRIBUTES FROM GOOGLE PROFILE OF USER : BEGINS

var userEmailID;
var firstName;
var lastName;

// VARIABLES TO SAVE ATTRIBUTES FROM GOOGLE PROFILE OF USER : ENDS

// TO KNOW IF THE CONNECTION HAS BEEN ESTABLISHED : BEGINS

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
});

// TO KNOW IF THE CONNECTION HAS BEEN ESTABLISHED : ENDS
 
// REDIRECTING TO HOME PAGE

exports.index = function(req, res){
  res.render('login.html');
};

// REDIRECTING TO ABOUT US PAGE

exports.aboutus = function(req, res){
  res.render('aboutus.html');
};

// REDIRECTING TO PIN BOARD PAGE

exports.newPin = function(req, res){
  res.render('mypins_new.html');
};

// REDIRECTING TO INDEX PAGE

exports.userHome = function(req, res){
  res.render('index.html');
};

// SAVE USER DETAILS TO DATABASE : BEGINS

exports.saveDetails = function(req, res){
  var firstNameG = firstName;
  var lastNameG = lastName;
  var userid = req.body.userid;
  var sex = req.body.sex;
  var emailG = userEmailID;
  var phoneNumber = req.body.phoneNumber;
  
  var newUser = new User203({ firstName: firstNameG, lastName: lastNameG, userid: userid, sex: sex, email: emailG, phoneNumber: phoneNumber});
	
  newUser.save(function (err, newUser) {
  if (err) return console.error(err);
  });
  
  res.render('index.html');
};

// SAVE USER DETAILS TO DATABASE : ENDS

// CHANGES TO FETCH DETAILS FROM USER'S GOOGLE ACCOUNT : BEGINS

exports.mailing = function(req, res){
  
  var q = req.url;
  var qstr = JSON.stringify(q);
  console.log(qstr);
  var a = qstr.split('&');
  
  console.log(a[13]);
  var atmp1 = a[13].split('=');
  firstName = atmp1[1];
  
  console.log(a[15]);
  var atmp2 = a[15].split('=');
  lastName = atmp2[1];
  
  console.log(a[17]);
  var atmp3 = a[17].split('=');
  var emailTmp = atmp3[1];
  console.log(emailTmp);
  userEmailIDTmp = emailTmp.replace("%40","@");
  userEmailID = userEmailIDTmp.replace("\"","");
  console.log(userEmailID, firstName, lastName);
  
  var name = firstName + ' ' + lastName;
  res.render('register.html');
  
};

// CHANGES TO FETCH DETAILS FROM USER'S GOOGLE ACCOUNT : ENDS