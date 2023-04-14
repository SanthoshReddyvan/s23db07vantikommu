var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
const connectionString =
process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
{useNewUrlParser: true,
useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var roseRouter = require('./routes/rose');
var boardRouter = require('./routes/board');
var selectorRouter = require('./routes/selector');
var rose = require("./models/rose");
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/rose',roseRouter);
app.use('/board',boardRouter);

app.use('/selector',selectorRouter);
app.use('/resource',resourceRouter);

async function recreateDB() {
  await rose.deleteMany();
  let instance1 = new rose({Rose_color:"Red",Rose_size:"7inch",Rose_cost:"$100"});

  instance1.save().then(() => {
    console.log('Everything went well');
  }).catch((e) => {
    console.log('There was an error', e.message);
  });
  let instance2 = new rose({Rose_color:"Black",Rose_size:"12inch",Rose_cost:"$75" });
  instance2.save().then(() => {
    console.log('Everything went well');
  }).catch((e) => {
    console.log('There was an error', e.message);
  });
  let instance3 = new rose({Rose_color:"white",Rose_size:"09inch",Rose_cost:"$15" });
  instance3.save().then(() => {
    console.log('Everything went well');
  }).catch((e) => {
    console.log('There was an error', e.message);
  });
}

let reseed = true;
if (reseed) { recreateDB();}

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
