var services = require('../services/clientservice.js');
var authentication = require('../services/authentication.js');

module.exports = function(server) {
  server.post('/login', login);
  server.post('/logout', logout);
  server.get('/profile', getProfile);
  server.post('/profile/:id', editProfile);
};


function login(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var code = JSON.parse(body);
        console.log(code)
        if(code === null || code.code === undefined || code.code === null){
          return res.send({error: "login failed"});;
        }
        var inputData = {"code" : code.code, "grant_type" : "authorization_code"};
        authentication.getToken(inputData, function(err, data) {
          if (err) { 
            return res.send({
              error: err
            });
          }
          if(data === null || data.body === undefined || data.body === null){
          return res.send({error: "login failed"});;
        }
          res.send(JSON.parse(data.body));
        });
        return null;
      }else{
        res.send({error: "login failed"});
      }
  }
  authentication.getCode(req, callback);

  return next();
}

function logout(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var code = JSON.parse(body);
        if(code === null || code.code === null && code.code === undefined){
          return res.send({error: "invalid_token"});;
        }
        return res.send(code);
      }else{
        res.send({error: "invalid_token"});
      }
  }
  authentication.removeToken(req, callback);

  return next();
}

function getProfile(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var clent = JSON.parse(body);
        if(clent === null){
          return res.send(body);
        }
        services.user.getProfile(req.params, function(err, data) {
          if (err) { 
            return res.send({
              error: err
            });
          }
          res.send(data);
        });
        return null;
      }else{
        res.send({error: "invalid_token"});
      }
  }
  authentication.checkOauth(req, callback);

  return next();
}

function editProfile(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var clent = JSON.parse(body);
        if(clent === null){
          return res.send(body);
        }
        services.user.editProfile(req.params.id, req.body, function(err, data) {
          if (err) { 
            return res.send({
              error: err
            });
          }
          res.send(data);
        });
        return null;
      }else{
        res.send({error: "invalid_token"});
      }
  }
  authentication.checkOauth(req, callback);

  return next();
}




