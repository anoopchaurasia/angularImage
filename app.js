var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

require("dotenv").config();

const upload_controller = require("./controllers/upload_controller.js");

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use("/images",express.static(path.join(__dirname, 'dist')));
app.post("/uploads", upload_controller.uploadFile, upload_controller.afterFileUPload);
app.get("/getFile", upload_controller.getFile);

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
  console.error(err)
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: "File Not Found"});
});


module.exports = app;