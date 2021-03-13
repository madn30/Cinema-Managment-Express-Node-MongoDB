var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var LoginRouter = require('./routes/login');
var MainRouter = require('./routes/Main');
var MoviesRouter = require('./routes/movies');
var session = require('express-session')

var MembersRouter = require('./routes/Members');
var User_ManagmentRouter = require('./routes/user_managment');
var AddUser = require('./routes/adduser');
var app = express();

app.use(cors())
app.use(session({ secret: 'ssshhhhh' }));
require('./Configs/database')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', LoginRouter);
app.use('/Main', MainRouter);
app.use('/Movies', MoviesRouter);
app.use('/Members', MembersRouter);
app.use('/User_Managment', User_ManagmentRouter);
app.use('/AddUser', AddUser);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
