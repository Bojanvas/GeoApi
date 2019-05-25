var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
require("dotenv").config();

mongoose.connect("mongodb://" + process.env.DBUSER + ":" + process.env.DBPASS + process.env.DBHOST, function() {
  console.log('db-connected..');
});

var indexRouter = require('./routes/api/index');
var usersRouter = require('./routes/api/users');
var questionsRouter = require('./routes/api/questions');
var resultsRouter = require('./routes/api/results');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/dashboard', indexRouter);
app.use('/users', usersRouter);
app.use('/questions', questionsRouter);
app.use('/results', resultsRouter);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

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
