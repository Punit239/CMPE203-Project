
/*

MODULE NAME			: PINS.JS
FUNCTION			: CREATING COLLECTION TO SAVE PINS DETAILS IN DATABASE
				  
CHANGE DETAILS
		NAME		: PUNIT SHARMA
		DATE		: 5/1/2014
		CHANGE-1	: DEVELOPED INITIAL VERSION
		
*/

// USING MONGOOSE TO CONNECT TO DATABASE

var mongoose = require('mongoose');
var Schema = mongoose.Schema;    // DEFINING SCHEMA FOR SAVING DETAILS IN DATABASE

// CREATING SCHEMA OBJECT TO HOLD PIN DETAILS : BEGINS

var linkSchema = new Schema({
   userEmail:String,
   boardName:String,
   link:String,
   
});

// CREATING SCHEMA OBJECT TO HOLD PIN DETAILS : ENDS

module.exports = mongoose.model('links', linkSchema);    // EXPORTING THE SCHEMA OBJECT