var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

var indexRouter = require('./routes/index.routes');
var curriculumRouter = require('./routes/curriculum.routes');
var aboutRouter = require('./routes/about.routes');
var linksRouter = require('./routes/links.routes');
var registerRouter = require('./routes/register.routes');
var userRouter = require('./routes/user.routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'old-favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'sec666ret',
  resave: true,
  saveUninitialized: true
}));

// Middlewares
app.use(function(req,res,next){
  res.locals.session = req.session;
  next();
});

// Bootstrap 4 dependencies
app.use('/stylesheets', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/javascripts', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/javascripts', express.static(__dirname + '/node_modules/popper.js/dist/umd'));
app.use('/javascripts', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

// Routes
app.use('/', indexRouter);
app.use('/curriculum', curriculumRouter);
app.use('/about', aboutRouter);
app.use('/links', linksRouter);
app.use('/register', registerRouter);
app.use('/user', userRouter);

// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_CLIENT_ID,
//     clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//     callbackURL: process.env.FACEBOOK_CALLBACK_URL
//   },
//   function(accessToken, refreshToken, profile, done) {
//     process.nextTick(function () {
//       //Check whether the User exists or not using profile.id
//
//       return done(null, profile);
//     });
//   }
// ));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Static files

module.exports = app;
