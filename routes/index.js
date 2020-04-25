var express = require('express');
var router = express.Router();
var commentService = require('../services/commentService');

/* GET home page. */
router.get('/', function(req, res, next) {
  // Get comments and response
  commentService.getAllComments(result => {
    res.render('index', { title: 'Chirihop\'s website', comments: result});
  });
});

module.exports = router;
