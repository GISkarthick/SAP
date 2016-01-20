/**
 * Module dependencies.
 */
var oauth2orize = require('oauth2orize');
var passport = require('passport');
//var login = require('connect-ensure-login');
var client = require('./../model/client');
var accessTokens = require('./../model/accessTokens');
var authorizationCodes = require('./../model/authorizationCodes');
var utils = require('./utils');

// create OAuth 2.0 server
var server = oauth2orize.createServer();

// Register serialialization and deserialization functions.
//
// When a client redirects a user to user authorization endpoint, an
// authorization transaction is initiated.  To complete the transaction, the
// user must authenticate and approve the authorization request.  Because this
// may involve multiple HTTP request/response exchanges, the transaction is
// stored in the session.
//
// An application must supply serialization functions, which determine how the
// client object is serialized into the session.  Typically this will be a
// simple matter of serializing the client's ID, and deserializing by finding
// the client by ID from the database.

server.serializeClient(function(client, done) {
  return done(null, client.id);
});

server.deserializeClient(function(id, done) {
  client.find(id, function(err, client) {
    if (err) { return done(err); }
    return done(null, client);
  });
});

// Register supported grant types.
//
// OAuth 2.0 specifies a framework that allows users to grant client
// applications limited access to their protected resources.  It does this
// through a process of the user granting access, and the client exchanging
// the grant for an access token.

// Grant authorization codes.  The callback takes the `client` requesting
// authorization, the `redirectURI` (which is used as a verifier in the
// subsequent exchange), the authenticated `user` granting access, and
// their response, which contains approved scope, duration, etc. as parsed by
// the application.  The application issues a code, which is bound to these
// values, and will be exchanged for an access token.

server.grant(oauth2orize.grant.code(function(client, redirectURI, user, ares, done) {
  var code = utils.uid(16)
  var codeobj = new authorizationCodes({ code: code, userId: user, userId: client });
  codeobj.save(function(err) {
    if (err) { return done(err); }
    done(null, code);
  });
}));

// Exchange authorization codes for access tokens.  The callback accepts the
// `client`, which is exchanging `code` and any `redirectURI` from the
// authorization request for verification.  If these values are validated, the
// application issues an access token on behalf of the user who authorized the
// code.

server.exchange(oauth2orize.exchange.code(function(client, code, redirectURI, done) {
  authorizationCodes.findOne({code: code}, function(err, authCode) {
    if (err) { return done(err); }
    if (authCode === null || authCode === undefined) { return done(null, false); }
    //if (client.id !== authCode.userId) { return done(null, false); }
      authCode.remove({code: code}, function(err) {
        if(err) { return done(err); }
        var token = utils.uid(256);
        var tokenobj = new accessTokens({ token: token, userId: authCode.userId });
        tokenobj.save(function(err, token) {
          if (err) { return done(err); }
            done(null, token);
        });
      });
  });
}));


//save a client with the password. 
/*exports.saveClient = function(request, response, done){
  var clientobj = new client({ userId: request.body.userId, password: request.body.password});
  clientobj.save(function(err, user) {
    if (err) { return done(err); }
    var code = utils.uid(16)
    var codeobj = new authorizationCodes({ code: code, userId: user.id });
    codeobj.save(function(err, codeResult) {
      if (err) { return done(err); }
      response.json(codeResult);
    });
  });
}*/

exports.validateClient = function(request, response, done){
  
  client.findOne({ '$or' : [{ EmpEmail : new RegExp(["^", request.body.email, "$"].join(""), "i") }, 
    { EmpUserName : new RegExp(["^", request.body.email, "$"].join(""), "i") }], 
    password: request.body.password}, function(err, user) {
  //client.findOne({ EmpEmail: request.body.email, password: request.body.password}, function(err, user) {
    if (err) { return done(err); }
    if(!user){ return response.json("login failed"); }
    var code = utils.uid(16)
    var codeobj = new authorizationCodes({ code: code, userId: user.id });
    codeobj.save(function(err, codeResult) {
      if (err) { return done(err); }
      response.json(codeResult);
    });
  });
}

//remove the client with the password combination.
//remove the auccess token for this client
exports.removeToken = function(request, response, done){
  var val = request.headers["authorization"];
  val = val.substring(6).trim();
  accessTokens.findOne({token: val}, function(err, token) {
    if (err) { return err; }
    if (!token) { return done(null, false); }
    //client.remove({_id: token.userId}, function(err) {
    //  if(err) { return done(err); }
      accessTokens.remove({_id: token.id}, function(err, result) {
        if(err) { return done(err); }
        response.json(result);
      });
    //});
  });
}

exports.token = [
  //passport.authenticate(['basic'], { session: false }),
  server.token(),
  server.errorHandler()
]

