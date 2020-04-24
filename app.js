var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var session = require('express-session');

var indexRouter = require('./routes/index');
var curriculumRouter = require('./routes/curriculum');
var aboutRouter = require('./routes/about');
var linksRouter = require('./routes/links');
var registerRouter = require('./routes/register');
var apiRouter = require('./routes/api');

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
  secret: 'sec666ret',
  resave: true,
  saveUninitialized: true
}));
app.use(function(req,res,next){
  res.locals.session = req.session;
  next();
});

// Bootstrap 4 dependencies
app.use('/stylesheets', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/javascripts', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/javascripts', express.static(__dirname + '/node_modules/popper.js/dist/umd'));
app.use('/javascripts', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
// app.use('/javascripts/animate.css', express.static(__dirname + '/node_modules/animate.css/animate.css'));


app.use('/', indexRouter);
app.use('/curriculum', curriculumRouter);
app.use('/about', aboutRouter);
app.use('/links', linksRouter);
app.use('/register', registerRouter);
app.use('/api', apiRouter);

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

module.exports = app;
