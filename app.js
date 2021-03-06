const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const apiRoutes = require('./routes/api/index');

const session = require('express-session');
const passport = require('passport');

const app = express();

require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'client/build')));


app.use('/api', apiRoutes);


app.get('/failedlogin', (req,res,next) => {
  res.send({auth: false});
})

app.get('/successlogin', /* middleware about getting the user's legislators */ (req,res,next) => {
  /* let myUser = {...req.user};
  myUser.legislators = res.locals.userLegs;
  ditto for laws, scripts, & events when that happens
  so legislators is just going to be an array of IDs, as will laws, but
  scripts and events will be either arrays of arrays or arrays of objects 
  (probably the latter? seems neater.)
  like {id: id, belongsToUser: true} <== well i guess this will require
  another couple of middlewares to get all that info. okay. good way to
  handle this though, i feel
  */
  res.send({user: req.user, auth: true});
})

app.get('/test', (req, res, next) => {
  res.send({hello: 'world'});
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
