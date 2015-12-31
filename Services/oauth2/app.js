/**
 * Module dependencies.
 */
var express = require('express')
  , passport = require('passport')
  , oauth2 = require('./src/manager/oauth2')
  , auth = require('./src/manager/auth')
  , util = require('./src/manager/utils')
  var mongodb = require('./src/mongodb');

var config = require('./config/config.js');

require('./src/manager/auth');
  
// Express configuration
  
var app = express.createServer();

mongodb.connect(function() {
});

app.set('view engine', 'ejs');
app.use(express.logger());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'keyboard cat' }));


app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

function optionsRoute(req, res, next) {
    res.send(200);
    return next();
}

function crossOrigin(req,res,next){ 
  var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Content-MD5', 'Content-Length',
   'Response-Time', 'Api-Version', 'Origin', 'X-Requested-With', 'Authorization'];
  if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", allowHeaders.join(', '));
  // res.header('Access-Control-Allow-Methods', res.methods.join(', '));
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  return next();
}
app.all('/\.*/', crossOrigin, optionsRoute);
//get code
//app.post('/oauth/code', oauth2.saveClient);
app.post('/oauth/code', oauth2.validateClient);
//get token
app.post('/oauth/token', oauth2.token);
//delete token
app.del('/oauth/token', oauth2.removeToken);
//verify token
app.get('/oauth/token/verify', 
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
    res.json(req.user);
  });

app.listen(config.authPort);
