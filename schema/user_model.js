
/*

MODULE NAME			: USER_MODEL.JS
FUNCTION			: CREATING COLLECTION TO SAVE USER DETAILS IN DATABASE
				  
CHANGE DETAILS
		NAME		: PUNIT SHARMA
		DATE		: 5/1/2014
		CHANGE-1	: DEVELOPED INITIAL VERSION
		
*/

// USING MONGOOSE TO CONNECT TO DATABASE

var mongoose = require('mongoose');

var Schema = mongoose.Schema;    // DEFINING SCHEMA FOR SAVING DETAILS IN DATABASE

// CREATING SCHEMA OBJECT TO HOLD USER DETAILS : BEGINS

var userSchema = new Schema({
   firstName:String,
   lastName:String,
   userid:String,
   email:String,
   sex:String,
   alternateEmail:String,
   phoneNumber:String,
   
});

// CREATING SCHEMA OBJECT TO HOLD USER DETAILS : ENDS

module.exports = mongoose.model('users', userSchema);    // EXPORTING THE SCHEMA OBJECT