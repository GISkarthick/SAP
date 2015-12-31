var services = require('../services/clientservice.js');
var authentication = require('../services/authentication.js');

module.exports = function(server) {
  server.get('/strategyaction', getStrategyAction);
  server.put('/strategyaction', createStrategyAction);
  server.post('/strategyaction/:id', editStrategyAction);
  server.del('/strategyaction/:id', deleteStrategyAction);
};


function getStrategyAction(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var clent = JSON.parse(body);
        if(clent === null  ){
          return res.send(body);
        }
        services.strategyAction.getStrategyAction(req.params, function(err, data) {
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

function createStrategyAction(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var clent = JSON.parse(body);
        if(clent === null  ){return res.send(body);}
            services.strategyAction.createStrategyAction(req.body, clent._id, function(err, data) {
              if (err) { return res.send({error: err});}
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

function editStrategyAction(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var clent = JSON.parse(body);
        if(clent === null  ){return res.send(body);}
            services.strategyAction.editStrategyAction(req.params.id, req.body, clent._id, function(err, data) {
              if (err) { return res.send({error: err});}
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

function deleteStrategyAction(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var clent = JSON.parse(body);
        if(clent === null  ){return res.send(body);}
            services.strategyAction.deleteStrategyAction(req.params.id, clent._id, function(err, data) {
              if (err) { return res.send({error: err});}
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