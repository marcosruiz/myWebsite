var express = require('express');
var router = express.Router();
var userService = require('../services/userService');
var commentService = require('../services/commentService');

/* GET home page. */
router.get('/', function(req, res, next) {
  // Get comments and response
  commentService.getAllComments(result => {
    res.render('index', { title: 'Chirihop\'s website', comments: result});
  });
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
 * Save a comment
 */
router.post('/comment', function(req, res, next){
  var titleComment = req.body.titleComment;
  var comment = req.body.comment;
  var email = req.session.email;
  commentService.addComment('', email, titleComment, comment, result => {
    res.redirect('/');
  });
});

module.exports = router;
