
/*

MODULE NAME			: EMAIL.JS
FUNCTION			: IMPLEMENTS FUNCTIONALITY OF SENDING INVITATION TO A FRIEND
				  
CHANGE DETAILS
		NAME		: PUNIT SHARMA
		DATE		: 5/1/2014
		CHANGE-1	: DEVELOPED INITIAL VERSION
		
*/

// NODE MODULE TO SEND EMAIL

var nodemailer = require('nodemailer');

exports.inviteFriend = function(req, res){
  
  var userMail = req.body.email;    // FETCHING USER'S EMAIL TO SEND INVITATION
  console.log(userMail);
  var mytext = "You have been invited to join PinBoard. Please sign up at http://localhost:3000/";
  
  var nodemailer = require('nodemailer');

// DETAILS FO THE MAIL(INVITATION) TO BE SENT  
  
  var mailOptions = {
  
	from 	: 'PinBoard',
	to 		: userMail,
	subject : 'Invitation to join PinBoard',
	text 	: mytext,
	
  }

  var smtpTransport = nodemailer.createTransport('SMTP', {
  
		service : 'Gmail',
		auth : {
			
			// DETAILS OF THE ACCOUNT FROM WHICH THE INVITATION MAIL WILL BE SENT
			
			user : 'pinboard2014@gmail.com',
			pass : '2014pinboard'
		
		}
	});
  
  // SENDING MAIL USING DEFINED OPTIONS
  
  smtpTransport.sendMail(mailOptions);

  res.render("index.html");

};