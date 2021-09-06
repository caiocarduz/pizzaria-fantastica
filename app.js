var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
var PizzasRouter = require('./routes/PizzasRouter');
var AdminRouter = require('./routes/AdminRouter')
const logipHoraMiddleware = require('./middlewares/LogipHoraMiddleware');
const { Session } = require('inspector');
const auth = require('./middlewares/auth');
const findOrCreate = require('mongoose-findorcreate');
// const User = require('./database/User')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

// middleware que desabilita todos get requests - exemplo site em manutencao--
// app.use((req, res, next) =>{
//   if (req.method === 'GET'){
//     res.status(503).send('GET requests disabled')
//   } else{
//     next()
//   }
// })
app.use(session({
  secret: "projetoexpress",
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}));
passport.use(User.createStrategy());
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userPizzariaDB", {useNewUrlParser: true});
// mongoose.set("useCreateIndex", true);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logipHoraMiddleware)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', PizzasRouter);
app.use('/', AdminRouter);



// app.use(auth);

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
