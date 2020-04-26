var express = require('express');
var router = express.Router();
var userService = require('../services/userService');
var commentService = require('../services/commentService');

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/register', function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  var secondPassword = req.body.secondPassword;
  if(email.length>=3 && password.length >= 3 && secondPassword == password){
    userService.addUser(email, password, result => {
      res.send("Cuenta creada con éxito");
    });
  } else {
    res.send("Cuenta no creada");
  }
});

router.post('/login', function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;

  if(email.length >= 3 && password.length >= 3){
    userService.getUserByEmail(email, result => {
      if(result[0].password == password){
        req.session.loggedin = true;
        req.session.email = email;
        res.redirect('/');
      } else {
        res.render('register', { title: 'Register' });
      }
    });
  } else {
    res.send("Something went wrong");
  }
});

module.exports = router;
