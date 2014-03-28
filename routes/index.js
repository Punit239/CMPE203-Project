
/*
 * GET home page.
 */
var url = require('url');
 
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.login = function(req, res){
  res.render('login.html', { title: 'Express' });
};

exports.mailing = function(req, res){
  
  var q = req.url;
  var qstr = JSON.stringify(q);
  console.log(qstr);
  var a = qstr.split('&');
  
  console.log(a[13]);
  var atmp1 = a[13].split('=');
  var firstName = atmp1[1];
  
  console.log(a[15]);
  var atmp2 = a[15].split('=');
  var lastName = atmp2[1];
  
  console.log(a[17]);
  var atmp3 = a[17].split('=');
  var emailTmp = atmp3[1];
  console.log(emailTmp);
  userEmailID = emailTmp.replace("%40","@");
  console.log(userEmailID);
  
  var name = firstName + ' ' + lastName;
  
  res.render('mailingpage', { title : name });
  
};
