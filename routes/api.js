var express = require('express');
var router = express.Router();

router.post('/register', function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  var secondPassword = req.body.secondPassword;
  res.send(email);
});

router.post('/login', function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;

  if(email.length >= 3 && password.length >= 3){
    req.session.loggedin = true;
    req.session.email = email;
    res.redirect('/');
  } else {
    res.send("Something went wrong");
  }

});

module.exports = router;

