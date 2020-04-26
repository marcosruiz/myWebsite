var express = require('express');
var router = express.Router();
var passport = require('passport');
var userService = require('../services/userService');
var commentService = require('../services/commentService');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user', { title: 'User info' });
});

/**
 * Get users comments
 */
router.get('/comments/:user_id', function(req, res, next){
  commentService.getUserComments(req.params.user_id, result => {
    res.send(result);
  });
});

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/fail"
  })
);

router.get("/fail", (req, res) => {
  res.send("Failed attempt");
});

router.get("/", (req, res) => {
  res.send("Success");
});

module.exports = router;