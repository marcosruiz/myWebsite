var express = require('express');
var router = express.Router();

var commentService = require('../services/commentService');

router.post('/register', function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  var secondPassword = req.body.secondPassword;
  if(email.length>=3 && password.length >= 3 && secondPassword == password){
    const query = 'INSERT INTO users (id, email, email_confirmed, password) VALUES (uuid(), ?, ?, ?);';
    client.execute(query, [ email, false, password ])
      .then(result => {
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

    const query = 'SELECT password FROM users WHERE email = ? ALLOW FILTERING;';

    client.execute(query, [ email ])
      .then(result => {
        if(result.rows[0].password == password){
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

/**
 * Get all comments
 */
router.get('/comments', function(req, res, next){
  commentService.getAllComments(result => {
    res.send(result);
  });
});

/**
 * Get users comments
 */
router.get('/comments/:user_id', function(req, res, next){
  commentService.getUserComments(req.params.user_id, result => {
    res.send(result);
  });
});

/**
 * Save a comment
 */
router.post('/comment', function(req, res, next){
  var titleComment = req.body.titleComment;
  var comment = req.body.comment;
  var email = req.session.email;
  const query = 'INSERT INTO comments (id, user_id, user_email, title_comment, comment) VALUES (uuid(), ?, ?, ?, ?);';

  client.execute(query, ['', email, titleComment, comment])
    .then(result => {
      res.redirect('/');
    });
});

module.exports = router;

